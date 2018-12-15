const controller = require('./controller');

module.exports = (app) => {
    app.get('/', controller.getUiBaseApplication);
    app.get('/api', controller.serviceRequest);
}