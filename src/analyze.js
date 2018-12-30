const brain = require('brain.js');

const neuronalNetwork = new brain.recurrent.LSTM();

const analyse = (unit) => {
    
    console.log('>>>', unit.id, unit.type);
    
    //unit.type = "MUH";
    
    // Wenn kein Type gesetzt ist, dann eine Analyse mit dem NeuralenNetzwerk starten und entsprechend pasenden Typ setzten
    
    if (unit.units && unit.units.length) {
        unit.units.map(unit => {
            unit = analyse(unit);
        });
    }

    return unit;

}

module.exports = {
    async analyzeMatchingComponentTypes (json) {
            
        const analyzedJson = await analyse(json);
        return analyzedJson;

        /*neuronalNetwork.train([
            { input: [0,0,0], output: 'NO' },
            { input: [0,0,1], output: 'NO' },
            { input: [0,1,1], output: 'NO' },
            { input: [1,0,1], output: 'YES' },
            { input: [1,1,1], output: 'YES' }
        ], {
            iterations: 100
        });

        const output = net.run([1,0,0]);
        console.log(`Output: ${output}`);
        */

    }
}