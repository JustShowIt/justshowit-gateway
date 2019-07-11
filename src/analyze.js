const brain = require('brain.js');
const trainingData = require('./training-data.js');

const availableComponentTypes = ["text","video","textfield","link","image","article"];
const convertedNetworkTrainData = [];

/*
const convertOptionsToTrainData = (options) => {
    let data =  JSON.stringify(options)
                    .replace(/["':]/g, "")
                    .split('')
                    .map(x => (x.charCodeAt(0) / 255));
    return data;
}

trainingData.map(data => {
    let input = convertOptionsToTrainData(data.options);
    let trainData = { input: input, output: [data.type] };
    convertedNetworkTrainData.push(trainData);
});
console.log("TRAINING DATA >>>", convertedNetworkTrainData);


const net = new brain.NeuralNetwork();
net.train(convertedNetworkTrainData, { iterations: 100 });
let trainedNet = net.toFunction();

const analyseByNeuronalNetwork = (unit) => {
    if (!unit.createdDate) {
        unit.createdDate = new Date();
    }

    if (typeof unit.type === 'undefined' || !unit.type && !availableComponentTypes.includes(unit.type)) {
        console.log(unit);
        let result = trainedNet(convertOptionsToTrainData(unit.options));
        console.log(result);
    }

    if (unit.units && unit.units.length) {
        unit.units.map(unit => {
            unit = analyseByNeuronalNetwork(unit);
        });
    }

    return unit;
}
*/

module.exports = {
    async analyzeMatchingComponentTypes (json) {
        //const analyzedJson = await analyseByNeuronalNetwork(json);
        return json;
    }
}
