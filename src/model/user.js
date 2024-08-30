const Sequelize = require('sequelize');
const db = require('../config/db');

module.exports = db.define('Users',{
    IDUser:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        allowNull: false,
        primaryKey: true,
    },
    Name:{
        type : Sequelize.STRING(254),
        allowNull: false,
    },
    Password:{
        type: Sequelize.STRING(256),
        allowNull:false
    },
    Email:{
        type: Sequelize.STRING(254),
        allowNull: false,
        unique: true
    },
    Admin:{
        type : Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }
})