// o uuid é responsável por gerar Hashs aleatórias
const { v4: uuidv4 } = require('uuid');

require('../resources/db/connection')();

const SecretModel = require('../resources/db/models/Secret');

module.exports.create = async (event, context) => {
  // trabalhando com MongoDB especialmente com labdas, tem um modo para avisar
  // a lambda reutilizar a conexão e não fechar a conexão toda hora, isso é
  // feito através do segundo parâmetro da lambda chamada context
  context.callbackWaitsForEmptyEventLoop = false

  // dentro do event vai ter várias informações como por exemplo: 
  // o body, headers entre outras informações

  // o event.body vem como String e como vai ser enviado um json para a API
  // precisamos dar um JSON.parse
  const { name, email } = JSON.parse(event.body);
  const externalId = uuidv4();
  const adminKey = uuidv4();

  try {
    SecretModel.create({
      owner: name,
      ownerEmail: email,
      externalId,
      adminKey,
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