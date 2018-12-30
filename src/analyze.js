const brain = require('brain.js');

const availableComponentTypes = ["text","video","textfield","link","image","article"];

// const neuronalNetwork = new brain.recurrent.LSTM();
const neuronalNetwork = new brain.NeuralNetwork();

neuronalNetwork.train([
    { input: {
        'text': 'abc'
    }, output: { text: 1 } },
    { input: {
        "path": 'http://'
    }, output: { link: 1 } },
    { input: {
        "path": 'https://'
    }, output: { link: 1 } },
    { input: {
        "path": 'mp4'
    }, output: { video: 1 } }
], {
    iterations: 100,
});

const analyseByNeuronalNetwork = (unit) => {
    
    if (!unit.type && !availableComponentTypes.includes(unit.type)) {        
        
        console.log('');
        console.log('');
        console.log('');
        console.log('');
        console.log('>', unit.id, unit.type);
        
        const output = neuronalNetwork.run(unit.options, neuronalNetwork);
        // unit.type = "MUH";
        
        console.log(output);

    }

    if (unit.units && unit.units.length) {
        unit.units.map(unit => {
            unit = analyseByNeuronalNetwork(unit);
        });
    }

    return unit;
}

module.exports = {
    async analyzeMatchingComponentTypes (json) {
        const analyzedJson = await analyseByNeuronalNetwork(json);
        return analyzedJson;
    }
}