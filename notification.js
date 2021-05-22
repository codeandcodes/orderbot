// notification.js

const email = require('./email')

function notifier(toEmail, sourceEmail) {
	console.log("Instantiating notifier with email: " + toEmail);
	this._email = toEmail;
	this._sourceEmail = sourceEmail;

	this.notifyAvailable = function(res, url, subject, messageText) {
	  var msg = "Available at " + url + " " + messageText + 
	  "<br/>" + Date.now();
	  console.log(msg);
	  email.sendEmail(this._email, this._sourceEmail, subject, msg);
	  console.log(res);
	}

	this.notifyUnavailable = function(res, url, subject, messageText) {
	  var msg = "Unavailable @ " + url + " " + messageText + " " + Date.now();
	  console.log(msg);
	  //email.sendEmail(this._email, this._sourceEmail, subject, msg);
	}

	this.notifyStatus = function(url, subject, messageText) {
	  console.log(messageText);
	  email.sendEmail(this._email, this._sourceEmail, subject, messageText);
	}

	return this;
}

exports.Notifier = notifier;