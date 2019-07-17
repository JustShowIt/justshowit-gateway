import ServiceConfig from "./service-config";
import express from "express";
import router from "./router";
import analyze from "./analyze/analyze";

const app = express();
app.use(express.static(ServiceConfig.justshowitUiBaseApplicationPath));

router(app);

app.listen(ServiceConfig.port, function () {
  console.log('Microservice "' + ServiceConfig.name + '" is listening to http://localhost:' + ServiceConfig.port);
});
