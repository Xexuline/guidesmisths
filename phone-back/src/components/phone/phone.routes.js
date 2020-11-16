const express = require('express');
const STATUS = require('http-status');
const phone = require('./phone.controller');

const DataRouting = express.Router();
DataRouting.post('/', (req, res) => {
  const phoneInfo = req.body;
  phone.savePhone(phoneInfo)
    .then((result) => {
      res.statusCode = STATUS.CREATED;
      res.send({ id: result._id });
    })
    .catch((error) => {
      res.statusCode = STATUS.INTERNAL_SERVER_ERROR;
      res.send({ error: error.message });
    });
});

DataRouting.get('/', async (req, res) => {
  try {
    const phoneList = await phone.getPhones();

    res.statusCode = STATUS.OK;
    res.send(phoneList);
  } catch (error) {
    res.statusCode = STATUS.INTERNAL_SERVER_ERROR;
    res.send({ error: error.message });
  }
});

DataRouting.get('/:id', async (req, res) => {
  try {
    const phoneId = req.params.id;
    const phoneInfo = await phone.getPhones(phoneId);

    res.statusCode = STATUS.OK;
    res.send(phoneInfo);
  } catch (error) {
    res.statusCode = STATUS.INTERNAL_SERVER_ERROR;
    res.send({ error: error.message });
  }
});

module.exports = DataRouting;
