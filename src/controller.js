const model = require('./model');
const ServiceConfig = require('./service-config.js');
const request = require('request-promise');

module.exports = {
    async getTest (req, res) {
        try {
            
            const descriptionJson = await model.getTest();

            if (req.get('user-interface-id')) {

                res.json(descriptionJson);

            } else {
                console.log(ServiceConfig.userInterfaceServiceUrl);
                
                request({
                    url: ServiceConfig.userInterfaceServiceUrl,
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
    }
}