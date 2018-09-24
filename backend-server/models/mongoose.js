const mongoose = require("mongoose");

const url =
  "mongodb://thakursaurabh1998:helloworld123@ds213053.mlab.com:13053/keralaflood";

mongoose.Promise = global.Promise;
mongoose
  .connect(
    url,
    { useNewUrlParser: true }
  )
  .catch(err => console.log(err));

module.exports = { mongoose };
