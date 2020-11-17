const bodyParser = require('body-parser');
const app = require('express')();
const helmet = require('helmet');
const cors = require('cors')
const config = require('./config');
const routes = require('./src/router');
const mongo = require('./src/components/mongo');

const port = process.env.PORT || 80;
const host = `${config.defaultServer.host || ' localhost'}:${config.defaultServer.port}`;

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/v1', cors(), routes);

app.listen(port, () => { console.log(`running on ${host}`); });

mongo.connect();
