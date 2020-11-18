const bodyParser = require('body-parser');
const express = require('express')
const helmet = require('helmet');
const cors = require('cors')
const config = require('./config');
const routes = require('./src/router');
const mongo = require('./src/components/mongo');

const app = express();
const port = process.env.PORT || 80;
const host = `${config.defaultServer.host || ' localhost'}:${config.defaultServer.port}`;

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/v1', cors(), routes);
app.use('/', express.static(`${__dirname}/public`));


app.listen(port, () => { console.log(`running on ${host}`); });

mongo.connect();
