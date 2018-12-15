// const model = require('./model');
const ServiceConfig = require('./service-config.js');
// const request = require('request-promise');
const fs = require('fs');
const path = require('path');

module.exports = {
    
    /*
    async getTest (req, res) {
        try {
            
            const descriptionJson = await model.getTest();
            res.json(descriptionJson);
            
        } catch  (e) {
            res.status(500).end(e);
        }
    },
    */

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

    async serviceRequest (req, res) {
        console.log('justshowme-service-request-uri', req.get('justshowme-service-request-uri'));
        res.end();
    }
}