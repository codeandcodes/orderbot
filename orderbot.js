const bb = require('./bestbuy');
const walmart = require('./walmart');
const n = require('./notification');
const email = require('./email')

var AWS = require("aws-sdk");

var toEmail = "[ENTER YOUR EMAIL HERE]";

AWS.config.getCredentials(function(err) {
  if (err) {
    console.log(err.stack);
    console.log("You need aws credentials before you can use orderbot. See the readme.");
  } else {
    console.log("Access key:", AWS.config.credentials.accessKeyId);
  }
});

if (toEmail == "[ENTER YOUR EMAIL HERE]") {
  console.error("ERROR: You need to set your email before using orderbot.js");
  process.exit(1);
}

// Best buy
var bbCounter = 0;
bbNotify = function() {
  bbCounter++;
  bb.CheckSite(n.NotifyAvailable, n.NotifyUnavailable, bbCounter, toEmail);
}

// walmart
// var walmartCounter = 0;
// walmartNotify = function() {
//   walmartCounter++;
//   walmart.CheckSite(n.NotifyAvailable, n.NotifyUnavailable, walmartCounter);
// }

//email.sendEmail("rocketegg@gmail.com", "www.google.com", "test email");

setInterval(bbNotify, 1000);
//setInterval(walmartNotify, 5000);
