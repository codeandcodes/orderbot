// notification.js

const email = require('./email')

function notifyAvailable(res, url, messageText) {
  var msg = "Available at " + url + " " + messageText;
  console.log(msg);
  email.sendEmail("rocketegg@gmail.com", url, msg);
  console.log(res);
}

function notifyUnavailable(res, url, messageText) {
  var msg = "Unavailable @ " + url + " " + messageText + " " + Date.now();
  console.log(msg);
  //email.sendEmail("rocketegg@gmail.com", url, msg);
}

exports.NotifyAvailable = notifyAvailable;
exports.NotifyUnavailable = notifyUnavailable;