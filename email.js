// email.js

// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'us-west-2'});

function sendEmail(toEmail, sourceEmail, subject, message) {
  var toEmails = [toEmail];
  if (toEmail != sourceEmail) {
    toEmails.push(sourceEmail);
  }

  var params = {
    Destination: { /* required */
      CcAddresses: [],
      ToAddresses: toEmails
    }
  };
  params.Message = { /* required */
    Body: { /* required */
      Html: {
       Charset: "UTF-8",
       Data: message,
      },
      Text: {
       Charset: "UTF-8",
       Data: "TEXT_FORMAT_BODY"
      }
     },
     Subject: {
      Charset: 'UTF-8',
      Data: subject
     }
    };
  params.Source = sourceEmail;
  params.ReplyToAddresses = [
     sourceEmail,
    /* more items */
  ];
  // Create the promise and SES service object
  var sendPromise = new AWS.SES({apiVersion: '2010-12-01'})
  .sendEmail(params).promise();

  // Handle promise's fulfilled/rejected states
  sendPromise.then(
    function(data) {
      console.log("Email Sent: " + JSON.stringify(params.Message));
      console.log(data.MessageId);
    }).catch(
      function(err) {
      console.error(err, err.stack);
    });
}

exports.sendEmail = sendEmail;

