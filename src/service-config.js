var packageJson = require('./../package.json');

const config = {
    name: packageJson.name,
    version: packageJson.version,
    port: packageJson.server.port,
    justshowitUiBaseApplicationPath: 'node_modules/justshowit-ui-base-application/dist/'
}

module.exports = config;