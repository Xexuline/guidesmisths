require('dotenv').config();

module.exports = {
  defaultServer: {
    port: process.env.PORT || 3100,
  },
  mongodbServer: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    databaseName: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
  },
  imgUrl: {
    clientId: process.env.DB_HOST
  }
};
