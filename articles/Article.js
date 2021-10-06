const Sequelize = require('sequelize');
const connection = require('../db/database');
const Tag = require('../tags/Tag')

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
});

Article.belongsTo(Tag);
Tag.hasMany(Article);

Article.sync({force: false});

module.exports = Article;