const Sequelize = require('sequelize');
const db = require('../config/db');
const Users = require('./user');
const Methods = require('./methods');
const Subscriptions = require('./subscriptions')

const Payments = db.define('Payments',{
    IDPayment:
    {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    StartDate:{
        type: Sequelize.DATE,
        allowNull: false
    },
    EndDate:{
        type: Sequelize.DATE,
        allowNull: false
    },
    Value:{
        type:Sequelize.FLOAT,
        allowNull:false
    },
});

Payments.belongsTo(Users,{
    constraint: true,
    foreignKey: 'IDUser'
});

Payments.belongsTo(Methods,{
    constraint: true,
    foreignKey: 'IDMethod'
});

Payments.belongsTo(Subscriptions,{
    constraint: true,
    foreignKey: 'IDSubscription'
});


module.exports = Payments;