var api_key = 'key-5a2ac4931536001efb27752c2847b00e';
var domain = 'sandbox129d5c480f75431688d7744e18360d54.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
 
var data = {
  from: 'Excited User <me@samples.mailgun.org>',
  to: 'thakursaurabh1998@gmail.com',
  subject: 'Hello',
  text: 'Testing some Mailgun awesomeness!'
};
 
mailgun.messages().send(data, function (error, body) {
  console.log(body);
});
