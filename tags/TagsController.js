const express = require('express');
const Tag = require('./Tag');
const router = express.Router();
const slugify = require('slugify');
const Article = require('../articles/Article');
const auth = require('../middlewares/auth');

router.get('/tag', (req, res) => {
        res.send('testando')
})

router.get('/admin/tags/new', auth,(req, res) => {
        res.render("admin/tags/new")
})

router.post('/admin/tags/save', auth,(req, res) => {
        let tagTitle = req.body.title;

        Tag.create({
                title: tagTitle,
                slug: slugify(tagTitle.toLowerCase())
        })
                .then(() => res.redirect('/admin/tags'))
                .catch((err) => {
                        console.log(err); 
                        res.redirect('/')
                })
});

router.get('/admin/tags', auth,(req, res) => {
        Tag.findAll().then(tags => {
                res.render('admin/tags/index', {tags: tags})
        })
})

router.post('/admin/tags/delete', auth, (req, res) => {
        let idTag = req.body.id;
        Tag.destroy({
                where: {
                        id: idTag
                }
        }).then(() => {
                console.log('tag excluida'); 
                res.redirect('/admin/tags')
                }
        )
})

router.get('/admin/tags/edit/:id', auth,(req, res) => {
        let idTag = req.params.id;
        Tag.findByPk(idTag).then(tag => {
                if(tag != undefined){
                        res.render('admin/tags/edit', {tag: tag})
                } else {
                        res.redirect('/admin/tags')
                }
        })
})

router.post('/admin/tags/update', auth,(req, res) => {
        let id = req.body.id;
        let newTitle = req.body.title;
        console.log(id);
        console.log(newTitle)
        Tag.update({
                title: newTitle, 
                slug: slugify(newTitle)}, 
                {where: {
                        id: id
                }
        }).then(() => {
                res.redirect('/admin/tags')
        })
})

router.get('/tags/:slug', (req,res) => {
        let slug = req.params.slug;
        Tag.findOne({
                where: {
                        slug: slug
                }
        }).then((tag) => {
                if(tag){
                        Article.findAll({
                                include: [{model: Tag}],
                                where: {
                                        tagId: tag.id
                                }
                        }).then((articles) => {
                                if(articles.length != 0){
                                        res.render(`tagsFilter`, {articles: articles, tag: tag})
                                } else {
                                        res.send('não tem artigos aqui')
                                }
                                })

                } else {res.send('não existe essa tag')}
        })
})

module.exports = router;
