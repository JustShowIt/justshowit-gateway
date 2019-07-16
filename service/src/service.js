const ServiceConfig = require('./service-config.js');
const express = require('express');
// const orm = require('orm');
const router = require('./router');
require('./analyze/analyze.js');

const app = express();
// app.use(orm.express(dbPath, dbConfig));
app.use(express.static(ServiceConfig.justshowitUiBaseApplicationPath));

router(app);

app.listen(ServiceConfig.port, function () {
  console.log('Microservice "' + ServiceConfig.name + '" is listening to http://localhost:' + ServiceConfig.port);
});

