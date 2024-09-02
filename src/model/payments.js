const Sequelize = require('sequelize');
const db = require('../config/db');
const Users = require('./user');
const Methods = require('./methods');

const Payments = db.define('Payments',{
    IDPayment:
    {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    StarDate:{
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

Payments.belongTo(Users,{
    constraint: true,
    foreignKey: 'IDUser'
});

Payments.belongTo(Methods,{
    constraint: true,
    foreignKey: 'IDMethod'
});

Payments.belongTo(Subscriptions,{
    constraint: true,
    foreignKey: 'IDSubscription'
});


module.exports = Payments;