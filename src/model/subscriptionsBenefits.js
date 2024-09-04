const Sequelize = require('sequelize');
const db = require('../config/db');
const Subscriptions = require('./subscriptions');
const Benefits = require('./benefits');

const SubscriptionsBenefits = db.define('SubscriptionsBenefits',{
    IDSubscriptionsBenefits:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    }
});

Subscriptions.belongsToMany(Benefits,{through:SubscriptionsBenefits});
Benefits.belongsToMany(Subscriptions,{through:SubscriptionsBenefits});


module.exports = SubscriptionsBenefits;