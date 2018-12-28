const brain = require('brain.js');

const network = brain.recurrent.LSTM();

module.exports = {
    analyzeMatchingComponentTypes (json) {
        return new Promise((resolve/*, rejected*/) => {
            resolve({});
        });
    }
}