const Sequelize = require('sequelize');
import propertiesTrainingData from "./models/properties-training-data";
console.log(propertiesTrainingData);

const db = new Sequelize('justshowit', 'postgres', 'postgres', {
  host: 'db',
  dialect: 'postgres'
});

export default {
  
  connect () {
    return db.authenticate()
      .then(() => {
        console.log('Connection has been established successfully.');
      })
      .catch(err => {
        console.error('Unable to connect to the database:', err);
      })
      .finally(() => {
        db.close();
      });
  },
  
  createTables (): void {
    //propertiesTrainingData(Sequelize);
  }

}