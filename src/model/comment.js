const Sequelize = require('sequelize');
const articles = require('./article');
const User = require('./user');
const db = require('../config/db');

const Comments = db.define("Comments",{
    IDComment:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    Description:{
        type:Sequelize.STRING(254),
        allowNull: false
    }
})

Comments.belongsTo
(
    User,
    {
        constraint: true,
        foreignKey: 'IDUser'
    }
);
Comments.belongsTo(
    articles,
    {
        constraint: true,
        foreignKey: 'IDArticle'
    }
);
module.exports = Comments;
