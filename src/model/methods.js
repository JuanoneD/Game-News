const Sequelize = require('sequelize');
const db = require('../config/db');

const Methods = db.define('Methods',{
    IDMethod:
    {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    Description:
    {
        type: Sequelize.STRING(254),
        allowNull: false,
    }
})

module.exports = Methods;