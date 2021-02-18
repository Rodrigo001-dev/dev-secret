const sendMail = require('../resources/ses/sendMail');

module.exports = (drawResult, ownerEmail) => {
  const emails = drawResult.map(
    (result) => sendMail(ownerEmail, result.giver, result.receiver)
  );

  return Promise.all(emails);
};