const Sequelize = require('sequelize');
const User = require('./user');
const db = require('../config/db');
const Benefits = require('./benefits');
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
        Description:
        {
            type: Sequelize.STRING(254),
            allowNull: false,
        }
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
Article.belongsTo
(
    Benefits,
    {
        constraint: true,
        foreignKey: 'IDBenefit'
    }
)
module.exports = Article;