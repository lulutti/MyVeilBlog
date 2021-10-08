const { Sequelize } = require('sequelize');

const connection = new Sequelize('myveil','root','DevLuiza',{
        host: 'localhost',
        dialect: 'mysql',
        timezone: '-03:00'
});

module.exports = connection;
