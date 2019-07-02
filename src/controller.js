// const model = require('./model');
const analyse = require('./analyze');
const ServiceConfig = require('./service-config.js');
const request = require('request-promise');
const fs = require('fs');
const path = require('path');

module.exports = {
    
    async getUiBaseApplication (req, res) {

        let justshowitUiBaseApplicationPath = path.join(__dirname, '..', ServiceConfig.justshowitUiBaseApplicationPath);
        fs.readFileSync(justshowitUiBaseApplicationPath + 'index.html').then(content => {
            res.set('Content-Type', 'text/html');
            res.send(new Buffer.alloc(content.length, content));
            res.end();
        }).catch(e => {
            console.error(e);
        });

    },

    async getServiceRequest (req, res) {
        
        console.clear();

        const justshowmeServiceRequestUri = req.get('justshowme-service-request-uri');
        res.header('Content-Type', 'application/json');
        
        if (justshowmeServiceRequestUri && justshowmeServiceRequestUri.length > 7) {
<<<<<<< HEAD
            console.log('Header "justshowme-service-request-uri" found. GET - ' + req.get('justshowme-service-request-uri'));
=======
            console.log('Header -justshowme-service-request-uri- found. GET - ' + justshowmeServiceRequestUri);
>>>>>>> a825b617a84a3afe809ab53eeeaf3b8bc06e381b
            request({
                uri: justshowmeServiceRequestUri,
                headers: {
                    "content-type": 'application/json'
                },
                json: true
            }).then((json) => {
                console.log("RESPONSE >>>", json);

                try {
                    analyse.analyzeMatchingComponentTypes(json).then(analyzedJsonData => {
<<<<<<< HEAD
                        console.log('');
                        console.log('----- Response ---------------------------------------');
                        console.log('');
                        console.log(analyzedJsonData);
=======
                        console.log('ANALYZED JSON DATA >>>', analyzedJsonData);
>>>>>>> a825b617a84a3afe809ab53eeeaf3b8bc06e381b
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
            console.log('Header -justshowme-service-request-uri- found. POST - ' + justshowmeServiceRequestUri);
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

    }

}