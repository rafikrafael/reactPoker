const constants = require('../resources/serverConstants');
const cors = require('../middlewares/cors');

const jogoApi = require('../api/jogoApi');
const indexRoute = require('./indexRoute');

function configRoutes() {
  constants.server.use(cors.all);
  jogoApi(constants.server);
  indexRoute(constants.server);
}

exports.configRoutes = configRoutes;