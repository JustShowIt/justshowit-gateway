const brain = require('brain.js');
const trainingData = require('./training-data.js');

const availableComponentTypes = ["text","video","textfield","link","image","article"];
const networkTrainData = [];

const encodeOptionsToTrainData = (options) => {
    let data = JSON.stringify(options).replace(/["':]/g, "").split('').map(x => (x.charCodeAt(0) / 255));
    return data;
}

trainingData.map(data => {
    let input = encodeOptionsToTrainData(data.options);
    let output = {};
        output[data.type] = 1;
    let trainData = { input: input, output: output };
    //console.log(trainData);
    networkTrainData.push(trainData);
});

//console.log("TRAINING DATA >>>", networkTrainData);

const net = new brain.NeuralNetwork();
net.train(networkTrainData, { iterations: 100 });
let trainedNet = net.toFunction();

const analyseByNeuronalNetwork = (unit) => {
    
    if (!unit.createdDate) {        
        unit.createdDate = new Date();
    }

    if (!unit.type && !availableComponentTypes.includes(unit.type)) {
        let result = trainedNet(encodeOptionsToTrainData(unit.options));
        console.log(result);
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

        /*const net = new brain.recurrent.LSTM();
        net2.train([
            { input: "Dies ist ein test".split('').map(x => (x.charCodeAt(0) / 255)), output: { test: 1 } },
            { input: "Dies ist ein video".split('').map(x => (x.charCodeAt(0) / 255)), output: { video: 1 } }
        ]);
        let result = net2.run('test'.split('').map(x => (x.charCodeAt(0) / 255)));
        console.log("Result:", result);*/

        const analyzedJson = await analyseByNeuronalNetwork(json);
        return analyzedJson;
    }
}




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
