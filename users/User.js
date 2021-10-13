const Sequelize = require('sequelize');
const connection = require('../db/database');

const User = connection.define('users',{
        email:{
                type: Sequelize.STRING,
                allowNull: false,
                validate:       {
                        notEmpty: true,
                        len: [2,30],
                }
        },
        password:{
                type: Sequelize.STRING,
                allowNull: false,
                validate:       {
                     notEmpty: true,
             }
        }
})

User.sync({force: false});

module.exports = User;