export default {
    
    propertiesTrainingData (sequelize) {
        return sequelize.define('properties-training-data', {
            input: {
                type: sequelize.STRING,
                allowNull: false
            },
            output: {
                type: sequelize.STRING,
                allowNull: true
            }
        }, {});
    }

}