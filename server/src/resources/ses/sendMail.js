const aws = require('aws-sdk');
const ses = new aws.SES({ region: 'us-east-1' });

module.exports = (ownerEmail, giver, receiver) => {
  const params = {
    Destination: {
      ToAddresses: [giver.email],
    },
    Message: {
      Body: {
        Text: {
          Data: `Seu amigo oculto é o(a) ${receiver.name}`
        }
      },
      Subject: {
        Data: '[Seja.Dev] Amigo Oculto'
      },
    },
    Source: ownerEmail,
  };

  return ses.sendEmail(params).promise();
};