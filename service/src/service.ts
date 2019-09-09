import ServiceConfig from "./service-config";
import express from "express";
import router from "./router";

import db from "./main/ts/gelight/justshowit/infrastructure/db/sequalize.js";
db.connect();
db.createTables();

import analyze from "./main/ts/gelight/justshowit/domain/analyze/analyze";
analyze.init();

const app = express();
app.use(express.static(ServiceConfig.justshowitUiBaseApplicationPath));

router(app);

app.listen(ServiceConfig.port, function () {
  console.log('Microservice "' + ServiceConfig.name + '" is listening to http://localhost:' + ServiceConfig.port);
});
