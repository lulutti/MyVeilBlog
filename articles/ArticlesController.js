const express = require('express');
const router = express.Router();
const Tag = require('../tags/tag');
const Article = require('./Article');
const slugify = require('slugify');

router.get('/admin/articles', (req, res) => {
        Article.findAll({
                include: [{model: Tag}]
        }).then(articles => {
                res.render('admin/articles/index', {articles: articles})
        })

})

router.get('/admin/articles/new', (req, res) => {
        Tag.findAll().then(tags => {
                res.render('admin/articles/new',{tags: tags})
        })
})

router.post('/admin/articles/save', (req, res) => {
        const title = req.body.title;
        const body = req.body.body;
        const tag = req.body.tags;

        Article.create({ 
                title: title,
                slug: slugify(title.toLowerCase()),
                body: body,
                tagId: tag
        }).then(() => res.redirect('/admin/articles'))
               
})

router.post('/admin/articles/delete', (req, res) => {
        let idArticle = req.body.id;
        Article.destroy({
                where: {
                        id: idArticle
                }
        }).then(() => {
                res.redirect('/admin/articles')
                }
        )
})

router.get('/admin/articles/edit/:id', (req, res) => {
        let idArticle = req.params.id;
        Article.findByPk(idArticle).then(article => {
                if(article != undefined){
                        res.render('admin/articles/edit', {article: article})
                } else {
                        res.redirect('/admin/articles')
                }
        })
})

router.post('/admin/articles/update', (req, res) => {
        let id = req.body.id;
        let newTitle = req.body.title;
        let body = req.body.body;
        Article.update({
                title: newTitle, 
                slug: slugify(newTitle),
                body: body
        },
                {where: {
                        id: id
                }
        }).then(() => {
                res.redirect('/admin/articles')
        })
})

router.get('/articles', (req, res) => {
        Article.findAll({
                order: [['id', 'DESC']],
                limit: 2
        }).then(articles => res.render('articles', {articles: articles}))
})

router.get('/articles/:slug', (req, res) => {
        let slug = req.params.slug;
        Article.findOne({ 
                where: {
                        slug: slug
                }
        }).then(article => {
                if(article) {
                        res.render('article', {article: article})
                } else {
                        res.send('Página não encontrada')
                }
        })
})

router.get('/articles/page/:num', (req, res) => {
        let page = req.params.num;
        let offset = 0
        if(isNaN(page) || page == 1){
                offset = 0
        } else {
                offset = (page -1) * 4;
        }

        Article.findAndCountAll({
                limit: 4,
                offset: offset,
                order: [
                        ['id', 'DESC']
                ]
        }).then((articles) => {
                let next = true;
                if(offset + 4 >= articles.count){
                        next = false;
                }

                let result = {
                        page: page,
                        next: next,
                        articles: articles
                }

                Tag.findAll().then(tags => {
                        res.render('admin/articles/page', {result: result, tags: tags})
                })
        })


})


module.exports = router;