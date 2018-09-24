const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const nodemailer = require("nodemailer");

const { Donations, Requests } = require("./models/models");
const { Block, Blockchain } = require("./blockchain");

const writeJSON = chain => {
  fs.writeFileSync("chain.json", JSON.stringify(chain));
};

const parseJSON = () => {
  try {
    return JSON.parse(fs.readFileSync("chain.json"));
  } catch (error) {
    return [];
  }
};

let blockchain = new Blockchain();

if (blockchain.chain.length === 1) {
  const localFileSystem = parseJSON();
  localFileSystem.chain.splice(0, 1);
  localFileSystem.chain.forEach(e => {
    blockchain.addBlock(new Block(e.index, e.timestamp, e.data));
  });
}

let app = express();

app.use((req, res, next) => {
  const now = new Date().toString();

  console.log(`${now} ${req.method} ${req.url}`);
  next();
});

app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

function mailit(data) {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "lunfjrthnbxnl2he@ethereal.email",
      pass: "RbHEgeKjUzYXjG6G5Z"
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: "lunfjrthnbxnl2he@ethereal.email", // sender address
    ...data // to: "msvbs98@gmail.com", // list of receivers
    // subject: "Recieved the item", // Subject line
    // text: data, // plain text body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  });
}

app.get("/chain", (req, res) => {
  // uncomment to check validity
  // blockchain.chain[2].data = { data: "hello" };
  res.status(200).send({
    chain: blockchain.chain.slice(1),
    length: blockchain.chain.length - 1
  });
});

app.get("/validity", (req, res) => {
  if (blockchain.isChainValid()) res.status(200).send("Blockchain is valid.");
  else res.status(400).send("Blockchain invalid!");
});

app.get("/mine", (req, res) => {
  blockchain.makeChainValid();
  writeJSON(blockchain);
  res.status(200).send("Chain is validated");
});

app.get("/listitems", (req, res) => {
  Donations.find({ is_distributed: false, check: true })
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).send(err));
});

app.get("/request", async (req, res) => {
  let returndata = [];
  let requestdata = await Requests.find({ completed: false });
  let donationsdata = await Donations.find();

  requestdata.forEach(i => {
    let temp = i.toJSON();
    for (let j = 0; j < donationsdata.length; j++) {
      if (i.index === donationsdata[j].index) {
        returndata.push({
          ...temp,
          imgURL: donationsdata[j].imgURL,
          item: donationsdata[j].item
        });
        break;
      }
    }
  });

  res.status(200).send(returndata);
});

app.get("/fetch/:contact", (req, res) => {
  const { contact } = req.params;
  Donations.findOne({ contact: parseInt(contact) })
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).send(err));
});

app.post("/newblock", (req, res) => {
  const index = blockchain.chain[blockchain.chain.length - 1].index + 1;
  const data = req.body.data;
  const newBlock = new Block(index, new Date().getTime(), data);

  blockchain.addBlock(newBlock);

  writeJSON(blockchain);

  if (blockchain.isChainValid()) res.status(201).send(newBlock);
  else res.status(400).send("Blockchain invalid");
});

app.post("/distribute", (req, res) => {
  let { distributed_to, contact, email, distributed_index } = req.body;
  const task = "distribute";

  let newBlock = blockchain.transaction({
    task,
    distributed_to,
    email,
    contact,
    distributed_index
  });
  Requests.findOneAndUpdate(
    { index: distributed_index },
    {
      $set: {
        completed: true
      }
    },
    {
      new: true
    }
  ).then(e => console.log(e));

  Donations.findOneAndUpdate(
    { index: distributed_index },
    {
      $set: {
        is_distributed: true,
        distributed_to
      }
    },
    {
      new: true
    }
  )
    .then(data => {
      if (!data) res.status(404).send();
      else res.status(200).send(data);
      // console.log(data);
    })
    .catch(err => res.status(404).send(err));

  let mailOptions = {
    to: email, // list of receivers
    subject: "Recieved the item", // Subject line
    text: `Your item is transferred to ${distributed_to}\nContact number: ${contact}\nEmail id: ${email}` // plain text body
  };

  mailit(mailOptions);

  writeJSON(blockchain);
});

app.post("/request", (req, res) => {
  const { index, contact, initiated_by, email } = req.body;

  Donations.findOneAndUpdate(
    { index },
    {
      $set: {
        is_distributed: true
        // distributed_to
      }
    },
    {
      new: true
    }
  ).then(d => console.log(d));
  const request = new Requests({
    initiated_by,
    index,
    email,
    contact
  });
  request
    .save()
    .then(data => res.status(200).send(data))
    .catch(err => console.log(err));
});

app.get("/validate", (req, res) => {
  Donations.find({ check: false })
    .then(data => res.status(200).send(data))
    .catch(err => res.status(404).send(err));
});

app.post("/validate", (req, res) => {
  const id = req.body.id;
  let lastBlock = blockchain.getLatestBlock();
  Donations.findByIdAndUpdate(
    id,
    {
      $set: {
        index: lastBlock.index + 1,
        check: true
      }
    },
    {
      new: true
    }
  )
    .then(data => {
      const task = "donate";
      const { initiated_by, email, contact, item } = data;
      const newBlock = blockchain.transaction({
        task,
        initiated_by,
        email,
        contact,
        item
      });

      res.status(200).send(newBlock);
    })
    .catch(err => res.status(400).send(err));

  writeJSON(blockchain);
});

app.post("/donate", (req, res) => {
  const { item, initiated_by, imgURL, contact, email, address } = req.body;

  const donation = new Donations({
    initiated_by,
    item,
    imgURL,
    email,
    contact,
    address
  });

  donation
    .save()
    .then(doc => res.status(200).send(doc))
    .catch(err => console.log(err));
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
