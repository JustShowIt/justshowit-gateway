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
        
        console.log('')
        console.log('Header "justshowme-service-request-uri" found. Sub-Request (GET) called to', req.get('justshowme-service-request-uri'));

        if (req.get('justshowme-service-request-uri')) {
            request({
                uri: req.get('justshowme-service-request-uri'),
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
        
        console.log('')
        console.log('Header "justshowme-service-request-uri" found. Sub-Request (POST) called to', req.get('justshowme-service-request-uri'));
        console.log('Request Data:', req.body);

        if (req.get('justshowme-service-request-uri')) {
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

    async muh (req, res) {
        res.set('Content-Type', 'application/json');
        res.send({ muh: 'Muh sagt die Kuh' });
        res.end();
    }
}