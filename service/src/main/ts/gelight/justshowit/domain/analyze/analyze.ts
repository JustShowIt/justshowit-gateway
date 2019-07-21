import JustShowItUnit from './../JustShowItUnit';
import analyzeUtils from './analyze-utils';

import brain from 'brain.js';
import trainingData from './components-training-data';
import propertiesTrainingData from './properties-training-data';

const AnalyzeInputNet = new brain.NeuralNetwork({ hiddenLayers: [3] });
const AnalyzeValueNet = new brain.recurrent.LSTM();

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
        
        console.log("");
        console.log("========== GENERATED UNIT JSON ==============================");
        console.dir(unitJson, { depth: null, colors: true })
        console.log("");
        
        return unitJson;
    }
}
