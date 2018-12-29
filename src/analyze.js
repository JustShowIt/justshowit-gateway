const brain = require('brain.js');

module.exports = {
    analyzeMatchingComponentTypes (json) {

        /*
        const net = new brain.recurrent.LSTM();

        net.trainAsync([
            {
                input: 'I feel great about the world!', 
                output: 'happy'
            },
            {
                input: 'The world is a terrible place!',
                output: 'sad'
            }
        ]).then(net => {
            const output = net.run('I feel great');
            console.log(output);
        }).catch(e => {
            console.errot(e);
        });
        return json;
        */

        
        return new Promise((resolve/*, rejected*/) => {
            resolve(json);
        });
        
    }
}