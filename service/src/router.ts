import controller from "./controller";

export default (app) => {
    app.get('/', controller.getUiBaseApplication);
    app.get('/justshowme', controller.getServiceRequest);
    app.post('/justshowme', controller.postServiceRequest);
    app.post('/add-input-type-training-data', controller.addInputTypeTrainingData);
}
