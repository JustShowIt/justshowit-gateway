const controller = require('./controller');

module.exports = (app) => {
    app.get('/', controller.getUiBaseApplication);
    app.get('/justshowme', controller.getServiceRequest);
    app.post('/justshowme', controller.postServiceRequest);
    
    app.get('/muh', controller.muh);
}