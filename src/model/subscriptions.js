const Sequelize = require('sequelize');
const db = require('../config/db');


const Subscriptions = db.define("Subscription",{
    IDSubscription:
    {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    Price:
    {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    Description:{
        type: Sequelize.STRING(254),
        allowNull: false
    }
});


module.exports = Subscriptions;