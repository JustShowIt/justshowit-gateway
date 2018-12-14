var packageJson = require('./../package.json');

const config = {
    name: packageJson.name,
    version: packageJson.version,
    port: packageJson.internalServer.port
}

module.exports = config;