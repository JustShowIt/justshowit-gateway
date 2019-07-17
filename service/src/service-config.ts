import packageJson from "./../package.json";

const config = {
    name: packageJson.name,
    version: packageJson.version,
    port: packageJson.server.port,
    justshowitUiBaseApplicationPath: 'frontend/'
}

export default config;