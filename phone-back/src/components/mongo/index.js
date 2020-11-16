const mongoose = require('mongoose');
const config = require('../../../config');

/**
 * Create database pool connections.
 */
exports.connect = () => {
  const dbhosturi = `mongodb://${config.mongodbServer.user}:${config.mongodbServer.password}@${config.mongodbServer.host}:${config.mongodbServer.port}/${config.mongodbServer.databaseName}`;
  console.log(dbhosturi);
  mongoose.connect(dbhosturi, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: false,
  });

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('connected to MongDB');
  });
};
