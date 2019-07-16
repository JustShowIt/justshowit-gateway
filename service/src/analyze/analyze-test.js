const brain = require('brain.js');
const trainData = require('./components-training-data.js');

const availableComponentTypes = ["text","video","textfield","link","image","article"];

const testOption = {
    "titel": "Lustiges Video",
    "description": "Ein cooles lustiges Video mit einem Hasen.",
    "path": "https://www.w3schools.com/html/mov_bbb.mp4",
    "resolution": "320x240",
    "runtime": "10.26s",
    "size": "131.509.108",
    "author": "Mario Linz"
};

const convertOptionToRunData = (options) => {
    let option = {};
    Object.keys(testOption).map(key => option[key] = 1);
    return option;
}

const net = new brain.NeuralNetwork({ hiddenLayers: [3] });
net.train(trainData, { iterations: 20000 });

const output = net.run(convertOptionToRunData(testOption));
console.log(output);
