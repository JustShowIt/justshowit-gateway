const Sequelize = require('sequelize');
const db = new Sequelize('justshowit', 'postgres', 'postgres', {
  host: 'postgres',
  dialect: 'postgres'
});

export default {
  connect () {
    return db
      .authenticate()
      .then(() => {
        console.log('Connection has been established successfully.');
      })
      .catch(err => {
        console.error('Unable to connect to the database:', err);
      });
  }
}