const { Sequelize } = require('sequelize');

const connection = new Sequelize('myveil','root','DevLuiza',{
        host: 'localhost',
        dialect: 'mysql'
});

module.exports = connection;
