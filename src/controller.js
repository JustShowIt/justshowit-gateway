// const model = require('./model');
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
        
        const justshowmeServiceRequestUri = req.get('justshowme-service-request-uri');
        
        if (justshowmeServiceRequestUri && justshowmeServiceRequestUri.length > 7) {
            console.log('Header -justshowme-service-request-uri- found. GET - ' + req.get('justshowme-service-request-uri'));
            request({
                uri: justshowmeServiceRequestUri,
                headers: {
                    "content-type": 'application/json'
                },
                json: true
            }).then(function (json) {
                console.log(json);
            })
            .catch(function (e) {
                console.error(e);
            });
        }

        res.end();
    },

    async postServiceRequest (req, res) {
        
        const justshowmeServiceRequestUri = req.get('justshowme-service-request-uri');
        
        if (justshowmeServiceRequestUri && justshowmeServiceRequestUri.length > 7) {
            console.log('Header -justshowme-service-request-uri- found. POST - ' + req.get('justshowme-service-request-uri'));
            request({
                uri: req.get('justshowme-service-request-uri'),
                body: req.body,
                headers: {
                    "content-type": 'application/json'
                },
                json: true
            }).then(function (json) {
                console.log(json);
            })
            .catch(function (e) {
                console.error(e);
            });
        }

        res.end();
    },

    async getTestJson (req, res) {

        const testJson = {
            "id": "ds76s-ds78sd7-gf8f7",
            "type": "Unit",
            "units": [
                {
                    "id": "ds76f-ds76fsd-ds7f6sd8f",
                    "type": "TextField"
                },
                {
                    "id": "sd8ds8-75ds7ds8sd-5sd78ds",
                    "type": "Unit",
                    "units": [
                        {
                            "id": "df78df-76df78d-f687df",
                            "type": "TextField"
                        }
                    ]
                },
                {
                    "id": "ds76sd-sd76sd-7df87f",
                    "type": "Text"
                },
                {
                    "id": "7sd5-78sd678-78s6d",
                    "options": {
                    "titel": "Lustiges Video",
                    "description": "Ein cooles lustiges Video mit einem Hasen.",
                    "path": "https://www.w3schools.com/html/mov_bbb.mp4",
                    "resolution": "320x240",
                    "runtime": "10.26s",
                    "size": "131.509.108",
                    "author": "Mario Linz",
                    "intelligentSearchDepth": 5
                    }
                }
            ]
        };
        
        res.set('Content-Type', 'application/json');
        res.send(testJson);
        res.end();
    }
}