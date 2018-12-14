var packageJson = require('./../package.json');

const config = {
    name: packageJson.name,
    version: packageJson.version,
    host: '/',
    port: 9001,
    userInterfaceServiceUrl: 'http://localhost:3000/ui'
}

module.exports = config;