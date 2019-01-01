const brain = require('brain.js');
const trainingData = require('./training-data.js');

const availableComponentTypes = ["text","video","textfield","link","image","article"];

// const neuronalNetwork = new brain.NeuralNetwork();
const neuronalNetwork = new brain.recurrent.LSTM();

/*
NORMAL STRUCTURE
const trainData = trainingData.map(data => {
    let input = data.options;
    let output = {};
        output[data.type] = 1;
    let trainData = { input: input, output: output };
    return trainData;
});
console.log(trainData);
*/ 

/*
LSTM STRUCTURE
*/
const trainData = trainingData.map(data => {
    let input = Object.keys(data.options).map(function(key, index) {
        return key + " " + data.options[key];
    });
    let output = data.type;
    let trainData = { input: input, output: output };
    return trainData;
});
console.log(trainData);

neuronalNetwork.train(trainData, {
    iterations: 1000,
});

const analyseByNeuronalNetwork = (unit) => {
    
    if (!unit.createdDate) {        
        unit.createdDate = new Date();
    }

    if (!unit.type && !availableComponentTypes.includes(unit.type)) {        
        console.log(unit.options);
        let result = neuronalNetwork.run(unit.options.path);
    
        console.log(result);
        unit.type = result;
        
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