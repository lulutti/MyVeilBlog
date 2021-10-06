const Sequelize = require('sequelize');
const connection = require('../db/database');

const Tag = connection.define('tags',{
        title:{
                type: Sequelize.STRING,
                allowNull: false,
                validate:       {
                        notEmpty: true,
                        len: [2,30],
                }
        },
        slug:{
                type: Sequelize.STRING,
                allowNull: false,
                notEmpty: true,
        }
})

Tag.sync({force: false});

module.exports = Tag;