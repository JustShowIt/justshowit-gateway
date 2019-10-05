import analyse from "./main/ts/gelight/justshowit/domain/analyze/analyze";
import ServiceConfig from "./service-config";
import request from "request-promise";
import * as fs from 'fs';
import * as path from 'path';
// import db from "./main/ts/gelight/justshowit/infrastructure/db/sequelize.js";

export default {
    
    async getUiBaseApplication (req, res) {

        let justshowitUiBaseApplicationPath = path.join(__dirname, '..', ServiceConfig.justshowitUiBaseApplicationPath);

        fs.readFile(justshowitUiBaseApplicationPath + 'index.html', 'utf8', (error, data) => {
            res.set('Content-Type', 'text/html');

            var buffer = Buffer.from(data);
            res.send(buffer);

            res.end();
        });

    },

    async getServiceRequest (req, res) {
        
        const justshowmeServiceRequestUri = req.get('justshowme-service-request-uri');
        res.header('Content-Type', 'application/json');
        
        if (justshowmeServiceRequestUri && justshowmeServiceRequestUri.length > 7) {
            request({
                uri: justshowmeServiceRequestUri,
                headers: {
                    "content-type": 'application/json'
                },
                json: true
            }).then((json) => {

                try {
                    analyse.analyzeComponents(json).then(analyzedJsonData => {
                        res.json(analyzedJsonData);
                        res.end();
                    });
                } catch (e) {
                    console.error(e);
                    res.end();
                }

            })
            .catch((e) => {
                console.error('ERROR >>>', e);
                res.end();
            });
        }

    },

    async postServiceRequest (req, res) {
        
        const justshowmeServiceRequestUri = req.get('justshowme-service-request-uri');
        
        if (justshowmeServiceRequestUri && justshowmeServiceRequestUri.length > 7) {
            request({
                uri: req.get('justshowme-service-request-uri'),
                body: req.body,
                headers: {
                    "content-type": 'application/json'
                },
                json: true
            }).then(function (json) {
                console.log(json);
                res.json(json);
                res.end();
            })
            .catch(function (e) {
                console.error(e);
                res.end();
            });
        }

    },

    async addInputTypeTrainingData (req, res) {
        
        // let sequelize = db.connect();
        let value = req.body.value;
        console.log(value);

        res.json({});
        res.end();
        
    }

}