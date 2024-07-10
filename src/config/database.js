const { Sequelize } = require('sequelize');
//TODO:github secretben traolni
const sequelize = new Sequelize('secret_server', 'root', 'zolizoli', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err));

module.exports = sequelize;
