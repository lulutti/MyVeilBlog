const Sequelize = require('sequelize');
const connection = require('../db/database');

const Article = connection.define('articles',{
        title:{
                type: Sequelize.STRING,
                allowNull: false,
                notEmpty: true,
        },
        slug:{
                type: Sequelize.STRING,
                
        },
        body:{
                type: Sequelize.TEXT,
                allowNull: false,
                notEmpty: true,
        }
})

module.exports = Article;