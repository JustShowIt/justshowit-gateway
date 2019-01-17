const brain = require('brain.js');
const trainingData = require('./training-data.js');

const availableComponentTypes = ["text","video","textfield","link","image","article"];

// const neuronalNetwork = new brain.NeuralNetwork();
const neuronalNetwork = new brain.recurrent.LSTM();

const networkTrainData = [];

/* >>> Idee ...
    https://www.youtube.com/watch?v=RVMHhtTqUxc >>> bei 16:45 min
    ENCODE TEXT INPUT >>> "Dies ist ein test".split('').map(x => (x.charCodeAt(0) / 255));
    ENCODED TEXT INPUT >>> [0.26666666666666666, 0.4117647058823529, 0.396078431372549, 0.45098039215686275, 0.12549019607843137, 0.4117647058823529, 0.45098039215686275, 0.4549019607843137, 0.12549019607843137, 0.396078431372549, 0.4117647058823529, 0.43137254901960786, 0.12549019607843137, 0.4549019607843137, 0.396078431372549, 0.45098039215686275, 0.4549019607843137]

const trainData = [
    {
        input: "Dies ist ein test",
        output: { test: 1 }
    },
    {
        input: "Dies ist ein video",
        output: { video: 1 }
    }
]
*/

trainingData.map(data => {
    let input = Object.keys(data.options).map(function(key, index) {
        networkTrainData.push({ input: key + " " + data.options[key], output: data.type });
    });
});

console.log("TRAINING DATA >>>", networkTrainData);

neuronalNetwork.train(networkTrainData, {
    iterations: 100,
});

const analyseByNeuronalNetwork = (unit) => {
    
    if (!unit.createdDate) {        
        unit.createdDate = new Date();
    }

    if (!unit.type && !availableComponentTypes.includes(unit.type)) {        

        let result = Object.keys(unit.options).map(function(key) {
            let input = key + " " + unit.options[key];
            return neuronalNetwork.run(input);
        });

        console.log(result);
        //unit.type = result;
        
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