const uuidv1 = require('uuid/v1');
const brain = require('brain.js');
const analyzeUtils = require('./analyze-utils.js');
// const jsi = require('../justShowIt/utils.js');

const trainingData = require('./components-training-data.js');
const propertiesTrainingData = require('./properties-training-data.js');

const availableComponentTypes = ["list", "text", "video", "link", "image", "article" ];
const availableParams = ["text", "title", "description", "url", "resolution", "runtime", "size", "author"];

const net = new brain.NeuralNetwork({ hiddenLayers: [3] });
net.train(trainingData, { iterations: 20000 });

const valueAnalyzeNet = new brain.NeuralNetwork({ hiddenLayers: [3] });
valueAnalyzeNet.train(propertiesTrainingData, { iterations: 20000 });

console.info("Neural Network trained.");

const analyseByNeuronalNetwork = (unit) => {

    for(let index in unit) {
        console.log(unit[index]);
    }

    // if (unit.units && Array.isArray(unit.units) && unit.units.length) {
    //     unit.units.map(unit => {
    //         unit = analyseByNeuronalNetwork(unit);
    //     });
    // }

}

// const analyseByNeuronalNetwork = (unit) => {
//
//     // if (jsi.isJsiUnit(unit)) {
//
//         // Id
//         if (!unit.id) {
//             unit.id = uuidv1();
//         }
//
//         // Creation Date
//         if (!unit.createdDate) {
//             unit.createdDate = new Date();
//         }
//
//         // Delete unknown type
//         if (!availableComponentTypes.includes(unit.type)) {
//             delete unit.type;
//         }
//
//         // Delete unknown unit params
//         if (unit.params && typeof unit.params === 'object') {
//             Object.keys(unit.params).forEach(param => {
//                 if (!availableParams.includes(param)) {
//
//                     console.log("... analyze unknown param '" + param + "' values to set it by neuronal network ...");
//                     // 1. Neuronales Netz für Value-Analyse, welcher Parameter am besten passen würde
//                     // 2. Neuen Parameter in unit.params schreiben, sofern dieser noch nicht existiert!
//                     // 3. Alten Parameter entfernen "delete unit.params[param];"
//
//                     delete unit.params[param];
//                 }
//             });
//         }
//
//         // Analyze and set the best type for this unit
//         if (unit.type === 'undefined' || !unit.type) {
//             let output = net.run(analyzeUtils.convertParamsToRunData(unit.params));
//
//             let matchedComponent = null;
//             let matchedComponentValue = 0;
//
//             Object.keys(output).forEach((key) => {
//                 if (output[key] > matchedComponentValue) {
//                     matchedComponentValue = output[key];
//                     matchedComponent = key;
//                 }
//             });
//
//             unit.type = matchedComponent;
//         }
//
//         if (unit.units && Array.isArray(unit.units) && unit.units.length) {
//             unit.units.map(unit => {
//                 unit = analyseByNeuronalNetwork(unit);
//             });
//         }
//
//     // }
//
//     return unit;
// }

module.exports = {
    async analyzeComponents (json) {
        const analyzedData = await analyseByNeuronalNetwork(json);
        return analyzedData;
    }
}
