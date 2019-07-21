import JustShowItUnit from './../JustShowItUnit';
import analyzeUtils from './analyze-utils';

import brain from 'brain.js';
import trainingData from './components-training-data';
import propertiesTrainingData from './properties-training-data';

const AnalyzeInputNet = new brain.NeuralNetwork({ hiddenLayers: [3] });
const AnalyzeValueNet = new brain.recurrent.LSTM();

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
//             let output = AnalyzeInputNet.run(analyzeUtils.convertParamsToRunData(unit.params));
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

export default {
    init () {
        AnalyzeInputNet.train(trainingData, { iterations: 20000 });
        AnalyzeValueNet.train(propertiesTrainingData, { iterations: 100 });

        console.info("Neuronal Networks has been trained.");
    },
    getBestComponentTypeByParams (params: Object): string {
        let output: Array<Float32Array> = AnalyzeInputNet.run(
            analyzeUtils.convertParamsToRunData(params)
        );

        let matchedComponent: string = '';
        let matchedComponentValue = 0;
        
        Object.keys(output).forEach(key => {
            if (output[key] > matchedComponentValue) {
                matchedComponentValue = output[key];
                matchedComponent = key;
            }
        });

        return matchedComponent;
    },
    getBestInputTypeByValue (value: string): string {
        let bestInputType = AnalyzeValueNet.run(value);
        return bestInputType;
    },
    async analyzeComponents (json) {
        let justShowItUnit: JustShowItUnit = new JustShowItUnit(json);
        let unitJson = await justShowItUnit.getUnitAsJSON();
        
        console.log("========== GENERATED UNIT JSON ==============================");
        console.dir(unitJson, { depth: null, colors: true })
        console.log("");
        
        return unitJson;
    }
}
