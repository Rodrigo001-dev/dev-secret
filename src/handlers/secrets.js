require('../resources/db/connection')();

const SecretModel = require('../resources/db/models/Secret');

module.exports.create = async (event) => {
  // dentro do event vai ter várias informações como por exemplo: 
  // o body, headers entre outras informações

  // o event.body vem como String e como vai ser enviado um json para a API
  // precisamos dar um JSON.parse
  const { name, email } = JSON.parse(event.body)

  try {
    SecretModel.create({
      owner: name,
      ownerEmail: email,
      externalId: '',
      adminKey: '',
    });
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false
      }),
    }
  }
};

module.exports.get = async (event) => {

};

module.exports.draw = async (event) => {

};