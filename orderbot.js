const bb = require('./bestbuy');
const walmart = require('./walmart');
const n = require('./notification');
const email = require('./email')

var AWS = require("aws-sdk");

AWS.config.getCredentials(function(err) {
  if (err) console.log(err.stack);
  // credentials not loaded
  else {
    console.log("Access key:", AWS.config.credentials.accessKeyId);
  }
});

// Best buy
var bbCounter = 0;
bbNotify = function() {
  bbCounter++;
  bb.CheckSite(n.NotifyAvailable, n.NotifyUnavailable, bbCounter);
}

// walmart
var walmartCounter = 0;
walmartNotify = function() {
  walmartCounter++;
  walmart.CheckSite(n.NotifyAvailable, n.NotifyUnavailable, walmartCounter);
}

//email.sendEmail("rocketegg@gmail.com", "www.google.com", "test email");

setInterval(bbNotify, 1000);
//setInterval(walmartNotify, 5000);
