const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Secret = sequelize.define('Secret', {
    secretText: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ttl: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    maxReads: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    reads: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    tableName: 'secrets'
});

sequelize.sync();

module.exports = Secret;
