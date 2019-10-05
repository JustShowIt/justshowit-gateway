const Sequelize = require('sequelize');

const sequelize = new Sequelize('justshowit', 'postgres', 'postgres', {
  host: 'db',
  dialect: 'postgres'
});

export default {
  
  connect () {
    return sequelize
      .authenticate()
      .then(() => {
        console.log('Connection has been established successfully.');
      })
      .catch(err => {
        console.error('Unable to connect to the database:', err);
      });
  },
  
  createTables () {
    
    let propertiesTrainingData = sequelize.define('properties-training-data', {
      input: { type: Sequelize.STRING, allowNull: false },
      output: { type: Sequelize.STRING, allowNull: true }
    }, {});

    propertiesTrainingData.sync({ force: true }).then(() => {
      return propertiesTrainingData.create({
        input: 'http://www.',
        output: 'url'
      });
    });

  }
}