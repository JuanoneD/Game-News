const Sequelize = require('sequelize');
const db = require('../config/db');
const User = require('./user');
const Article = db.define("Articles",
    {
        IDArticle:
        {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        Title:
        {
            type: Sequelize.STRING(254),
            allowNull: false,
        },
        Highlight:
        {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        Image:
        {
            type: Sequelize.STRING(254),
            allowNull: false,
        },
        Content:
        {
            type: Sequelize.STRING(254),
            allowNull: false,
        },
    }
);
Article.belongsTo
(
    User,
    {
        constraint: true,
        foreignKey: 'IDUser'
    }
);
module.exports = Article;