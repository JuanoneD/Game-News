const sequelize = require('sequelize');
const database = new sequelize('Game_news', 'admin', 'admin',
{
    dialect: 'mssql', host:'localhost', port: 1433
});

database.sync();
module.exports = database;