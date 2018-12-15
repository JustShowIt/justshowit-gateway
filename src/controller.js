const model = require('./model');
const ServiceConfig = require('./service-config.js');
const request = require('request-promise');
const fs = require('fs');

module.exports = {
    async getTest (req, res) {
        try {
            
            const descriptionJson = await model.getTest();

            if (req.get('user-interface-id')) {

                res.json(descriptionJson);

            } else {
                console.log(ServiceConfig.userInterfaceServiceUrl);
                
                request({
                    uri: ServiceConfig.userInterfaceServiceUrl,
                    method: 'POST',
                    headers: {
                        'content-type': 'text/html'
                    }, 
                    body: {
                        host: req.hostname,
                        description: descriptionJson
                    },
                    json: true
                }).then(html => {
                    
                    res.set('Content-Type', 'text/html');
                    res.send(new Buffer.alloc(html.length, html));

                }).catch(e => res.send(e));
                
            }
            
        } catch  (e) {
            res.status(500).end(e);
        }
    },

    async getUiBaseApplication (req, res) {

        let html = fs.readFileSync(ServiceConfig.justshowitUiBaseApplicationPath + 'index.html', (err, html) => {
            console.log(err, html);
        });

        res.set('Content-Type', 'text/html');
        res.send(new Buffer.alloc(html.length, html));
    }
}