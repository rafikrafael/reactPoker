const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const constants = require('../resources/serverConstants');
const routesConfigure = require('../routes/routesConfigure');

constants.server = express();

constants.server.use(express.static(path.join(global.appDir, 'client','build')));
constants.server.use('/static', express.static(path.join(global.appDir, 'client', 'build', 'static')));

constants.server.disable('x-powered-by');
constants.server.use(bodyParser.urlencoded({
  extended: true,
  limit: '50mb',
}));

constants.server.use(bodyParser.json({
  limit: '50mb',
}));

exports.startServer = () => {
  routesConfigure.configRoutes();
  constants.server.listen(constants.serverConfigs.serverPort);
}
