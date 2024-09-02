const Sequelize = require('sequelize');
const db = require('../config/db');
const Subscription = require('./subscriptions');

const Benefits = db.define("Benefits",{
    IDBenefit:
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
});


module.exports = Benefits;