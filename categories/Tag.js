const Sequelize = require('sequelize');
const connection = require('../db/database');

const Tag = connection.define('tags',{
        title:{
                type: Sequelize.STRING,
                allowNull: false,
                notEmpty: true,
        },
        slug:{
                type: Sequelize.STRING,
                allowNull: false,
                notEmpty: true,
        }
})

module.exports = Tag;