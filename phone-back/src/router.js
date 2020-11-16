const express = require('express');
const phoneApi = require('./components/phone');

const api = express.Router();
api.get('/', (req, res) => {
  res.statusCode = 200;
  res.send('up and running!!');
});

api.use('/phone', phoneApi);

module.exports = api;
