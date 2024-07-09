const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('secret_server', 'root', 'zolizoli', {
    host: 'localhost',
    dialect: 'mysql'
});
//a
sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err));

module.exports = sequelize;
