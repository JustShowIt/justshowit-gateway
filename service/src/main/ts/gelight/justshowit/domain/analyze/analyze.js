"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const JustShowItUnit_1 = __importDefault(require("./../JustShowItUnit"));
const analyze_utils_1 = __importDefault(require("./analyze-utils"));
const brain_js_1 = __importDefault(require("brain.js"));
const components_training_data_1 = __importDefault(require("./components-training-data"));
const properties_training_data_1 = __importDefault(require("./properties-training-data"));
const AnalyzeInputNet = new brain_js_1.default.NeuralNetwork({ hiddenLayers: [3] });
const AnalyzeValueNet = new brain_js_1.default.recurrent.LSTM();
exports.default = {
    init() {
        AnalyzeInputNet.train(components_training_data_1.default, { iterations: 20000 });
        AnalyzeValueNet.train(properties_training_data_1.default, { iterations: 100 });
        const TrainedAnalyzeInputNetUrl = path.join(__dirname, 'TrainedAnalyzeInputNet.json');
        fs.writeFileSync(TrainedAnalyzeInputNetUrl, AnalyzeInputNet.toJSON());
        console.log(TrainedAnalyzeInputNetUrl);
        console.info("Neuronal Networks has been trained.");
    },
    getBestComponentTypeByParams(params) {
        let output = AnalyzeInputNet.run(analyze_utils_1.default.convertParamsToRunData(params));
        let matchedComponent = '';
        let matchedComponentValue = 0;
        Object.keys(output).forEach(key => {
            if (output[key] > matchedComponentValue) {
                matchedComponentValue = output[key];
                matchedComponent = key;
            }
        });
        return matchedComponent;
    },
    getBestInputTypeByValue(value) {
        return AnalyzeValueNet.run(value);
    },
    analyzeComponents(json) {
        return __awaiter(this, void 0, void 0, function* () {
            let justShowItUnit = new JustShowItUnit_1.default(json);
            let unitJson = yield justShowItUnit.getUnitAsJSON();
            console.log("");
            console.log("========== GENERATED UNIT JSON ==============================");
            console.dir(unitJson, { depth: null, colors: true });
            console.log("");
            return unitJson;
        });
    }
};
//# sourceMappingURL=analyze.js.map