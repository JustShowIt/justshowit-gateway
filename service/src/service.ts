import ServiceConfig from "./service-config";
import express from "express";
import bodyParser from 'body-parser';
import router from "./router";

import db from "./main/ts/gelight/justshowit/infrastructure/db/sequelize";
db.connect();

import analyze from "./main/ts/gelight/justshowit/domain/analyze/analyze";
analyze.init();

const app = express();
app.use(express.static(ServiceConfig.justshowitUiBaseApplicationPath));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

router(app);

app.listen(ServiceConfig.port, function () {
  console.log('Microservice "' + ServiceConfig.name + '" is listening to http://localhost:' + ServiceConfig.port);
});
