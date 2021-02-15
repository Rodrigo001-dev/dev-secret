const mongoose = require('mongoose');

let connection = null;

const URI = process.env.MONGO_URI;

module.exports = async () => {
  if (!connection) {
    connection = mongoose.connect(URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });

    await connection;
  }
};