// o uuid é responsável por gerar Hashs aleatórias
const { v4: uuidv4 } = require('uuid');

require('../resources/db/connection')();

const SecretModel = require('../resources/db/models/Secret');
const draw = require('../utils/draw');
const notifyParticipants = require('../utils/notifyParticipants');

module.exports.create = async (event, context) => {
  // trabalhando com MongoDB especialmente com labdas, tem um modo para avisar
  // a lambda reutilizar a conexão e não fechar a conexão toda hora, isso é
  // feito através do segundo parâmetro da lambda chamada context
  context.callbackWaitsForEmptyEventLoop = false;

  // dentro do event vai ter várias informações como por exemplo: 
  // o body, headers entre outras informações

  // o event.body vem como String e como vai ser enviado um json para a API
  // precisamos dar um JSON.parse
  const { name, email } = JSON.parse(event.body);
  const externalId = uuidv4();
  const adminKey = uuidv4();

  try {
    await SecretModel.create({
      owner: name,
      ownerEmail: email,
      externalId,
      adminKey,
    });

    return {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Crendentials': true,
      },
      body: JSON.stringify({
        success: true,
        id: externalId,
        adminKey
      })
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Crendentials': true,
      },
      body: JSON.stringify({
        success: false
      }),
    }
  }
};

module.exports.get = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  // esse id esta vindo da rota, ele é um dos parâmetros da rota e para acessar
  // esses parâmetros utilizamos event.pathParameters
  const { id: externalId } = event.pathParameters;
  const incomingAdminKey = event.headers['admin-key'];

  try {
    // nessa opção select do Mongo quando é passado o - antes de campo(-_id) 
    // ele não vai retornar
    const { participants, adminKey, drawResult } = await SecretModel.findOne({
      externalId
    }).select('-_id participants adminKey drawResult').lean();

    // se estiver vindo o adminKey do header e se esse adminKey for igual o
    // esta salvo no banco
    const isAdmin = !!(incomingAdminKey && incomingAdminKey === adminKey);

    const result = {
      participants,
      // esses !! quer dizer que eu estou forçando a conversão para boolean,
      // ou seja nesse caso se for 0 vai ratornar false e for maior que 0 vai
      // retornar true
      hasDrew: !!drawResult.length,
      isAdmin
    };

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Crendentials': true,
      },
      body: JSON.stringify(result),
    };

  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Crendentials': true,
      },
      body: JSON.stringify({
        success: false
      }),
    };
  }
};

module.exports.draw = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const { id: externalId } = event.pathParameters;
  const adminKey = event.headers['admin-key'];

  try {
    const secret = await SecretModel.findOne({
      externalId,
      adminKey,
    }).select('participants ownerEmail').lean();

    if (!secret) {
      throw new Error('Erro!!');
    };

    const drawResult = draw(secret.participants);
    const drawMap = drawResult.map((result) => {
      return {
        giver: result.giver.externalId,
        receiver: result.receiver.externalId
      };
    });

    await SecretModel.updateOne(
      {
        _id: secret._id,
      },
      {
        drawResult: drawMap,
      }
    );

    await notifyParticipants(drawResult, secret.ownerEmail);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Crendentials': true,
      },
      body: JSON.stringify({
        success: true,
        drawResult
      }),
    };

  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Crendentials': true,
      },
      body: JSON.stringify({
        success: false,
      })
    };
  }
};