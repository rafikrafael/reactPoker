global.appDir = __dirname;

const factoryServer = require('./src/factory/serverFactory');
factoryServer.startServer();