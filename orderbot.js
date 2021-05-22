const bb = require('./bestbuy');
const walmart = require('./walmart');
const n = require('./notification');
const email = require('./email')

var AWS = require("aws-sdk");

var toEmail = "[ENTER YOUR EMAIL HERE]";
var awsVerifiedEmail = "[FILL IN VERIFIED EMAIL AS SOURCE]";

AWS.config.getCredentials(function(err) {
  if (err) {
    console.log(err.stack);
    console.log("You need aws credentials before you can use orderbot. See the readme.");
  } else {
    console.log("Access key:", AWS.config.credentials.accessKeyId);
  }
});

if (toEmail == "[ENTER YOUR EMAIL HERE]") {
  console.error("ERROR: You need to set your email to send notifications to before using orderbot.js");
  process.exit(1);
}

if (awsVerifiedEmail == "[FILL IN VERIFIED EMAIL AS SOURCE]") {
  console.error("ERROR: You need to set your verified aws email before using orderbot.js");
  process.exit(1);
}

var notifier = new n.Notifier(toEmail, awsVerifiedEmail);

// Best buy
var bbCounter = 0;
bbNotify = function() {
  bbCounter++;
  bb.CheckSite(notifier, bbCounter);
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
