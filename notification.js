// notification.js

const email = require('./email')

function notifier(toEmail) {
	console.log("Instantiating notifier with email: " + toEmail);
	this._email = toEmail;

	this.notifyAvailable = function(res, url, subject, messageText) {
	  var msg = "Available at " + url + " " + messageText + 
	  "<br/>" + Date.now();
	  console.log(msg);
	  email.sendEmail(this._email, subject, msg);
	  console.log(res);
	}

	this.notifyUnavailable = function(res, url, subject, messageText) {
	  var msg = "Unavailable @ " + url + " " + messageText + " " + Date.now();
	  console.log(msg);
	  //email.sendEmail(this._email, subject, msg);
	}

	this.notifyStatus = function(url, subject, messageText) {
	  console.log(messageText);
	  email.sendEmail(this._email, subject, messageText);
	}

	return this;
}

exports.Notifier = notifier;