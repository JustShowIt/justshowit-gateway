const brain = require('brain.js');
const trainingData = require('./components-training-data.js');

const availableComponentTypes = [
    "list",
    "text",
    "video",
    "link",
    "image",
    "article"
];

const netConfig = { 
    hiddenLayers: [3]
};

const trainConfig = { 
    iterations: 20000
};

const net = new brain.NeuralNetwork(netConfig);
net.train(trainingData, trainConfig);

console.info("Neural Network trained.");

const convertOptionsToRunData = (options) => {
    let optionsList = {};

    if (typeof options === 'object') {
        Object.keys(options).forEach(key => {
            optionsList[key] = 1;
        });
    }

    return optionsList;
}

const analyseByNeuronalNetwork = (unit) => {
    if (!unit.createdDate) {
        unit.createdDate = new Date();
    }

    if (!availableComponentTypes.includes(unit.type)) {
        delete unit.type;
    }
    
    if (unit.type === 'undefined' || !unit.type) {
        let output = net.run(convertOptionsToRunData(unit.options));
        
        let matchedComponent = null;
        let matchedComponentValue = 0;
        
        Object.keys(output).forEach((key) => {
            if (output[key] > matchedComponentValue) {
                matchedComponentValue = output[key];
                matchedComponent = key;
            }
        });

        unit.type = matchedComponent;
    }

    if (unit.units && unit.units.length) {
        unit.units.map(unit => {
            unit = analyseByNeuronalNetwork(unit);
        });
    }

    return unit;
}

module.exports = {
    async analyzeComponents (json) {
        const analyzedData = await analyseByNeuronalNetwork(json);
        return analyzedData;
    }
}
