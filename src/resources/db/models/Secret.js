const mongoose = require('mongoose');

// quais as propriedades qua vai ter na colection, a colection no MongoDB é a 
// mesma coisa que uma tabela em BancosSQL
const Schema = {
  owner: String,
  ownerEmail: String,
  adminKey: String,
  // por boas práticas não vai ser exposto o ID original da base, vai ser
  // exposto um ID vai ser gerado por mim
  externalId: String,
  participansts: [{
    // por padrão quando é definido um array de objetos no MongoDB ele cria uma
    // propriedade chamada _id que vai gerar objectID para o SubDocumento, como
    // eu não quero que isso aconteça eu defino _id: false
    _id: false,
    externalId: String,
    email: String,
    name: String
  }],
  drawResult: [{
    _id: false,
    giver: String,
    receiver: String
  }],
};

module.exports = mongoose.model('Secret', Schema);