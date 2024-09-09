const db = require('../config/db');
const Users = require('./user');
const Articles = require('./article');
const Sequelize = require('sequelize');

const Likes = db.define('Likes',
    {
        IDLike:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
    }
);

Likes.belongsTo(Users,{
    constraint: true,
    foreignKey: 'IDUser'
});

Likes.belongsTo(Articles,{
    constraint: true,
    foreignKey: 'IDArticle'
});

module.exports = Likes;