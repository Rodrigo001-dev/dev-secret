const { v4: uuidv4 } = require('uuid');

require('../resources/db/connection');

const SecretModel = require('../resources/db/models/Secret');

module.exports.create = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const { id: secretId } = event.pathParameters;
  const { name, email } = JSON.parse(event.body);
  const externalId = uuidv4();

  try {
    // nessa linha abaixo vai ser inserido um novo objeto dentro de um
    // documento que já existe na colection
    const result = await SecretModel.updateOne(
      // no primeiro parâmetro a query que vai fazer um math no documento
      {
        externalId: secretId,
        // isso é para que não adicione  o mesmo email mais de uma vez
        'participants.email': { $ne: email }
      },
      // no segundo parâmetro é a opecação que vai fazer com esse update
      {
        // esse push vai inserir o item dentro do array
        $push: {
          participants: {
            externalId,
            name,
            email
          }
        }
      },
    );

    // result.nModified => quantidade de registros que foram modificados
    // se nenhum registro for modificado
    if (!result.nModified) {
      //retorna um erro
      throw new Error('Erro!!');
    };

    return {
      statusCode: 201,
      body: JSON.stringify({
        success: true,
        id: externalId
      }),
    }

  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
      }),
    };
  }
};

module.exports.delete = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const { id: secretId, participantId } = event.pathParameters;
  const adminKey = event.headers['admin-key'];

  try {
    const result = await SecretModel.updateOne(
      {
        externalId: secretId,
        adminKey
      },
      {
        // o pull vai remover o item dentro de um array
        $pull: {
          participants: {
            externalId: participantId
          }
        }
      }
    );

    if (!result.nModified) {
      throw new Error('Erro!!');
    };

    return {
      statusCode: 204,
      success: true
    };

  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
      }),
    };
  }
};