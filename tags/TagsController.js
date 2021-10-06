const express = require('express');
const Tag = require('./Tag');
const router = express.Router();
const slugify = require('slugify')

router.get('/tag', (req, res) => {
        res.send('testando')
})

router.get('/admin/tags/new', (req, res) => {
        res.render("admin/tags/new")
})

router.post('/admin/tags/save', (req, res) => {
        let tagTitle = req.body.title;

        Tag.create({
                title: tagTitle,
                slug: slugify(tagTitle)
        })
                .then(() => res.redirect('/admin/tags'))
                .catch((err) => {
                        console.log(err); 
                        res.redirect('/')
                })
});

router.get('/admin/tags', (req, res) => {
        Tag.findAll().then(tags => {
                res.render('admin/tags/index', {tags: tags})
        })
})

router.post('/admin/tags/delete', (req, res) => {
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

router.get('/admin/tags/edit/:id', (req, res) => {
        let idTag = req.params.id;
        Tag.findByPk(idTag).then(tag => {
                if(tag != undefined){
                        res.render('admin/tags/edit', {tag: tag})
                } else {
                        res.redirect('/admin/tags')
                }
        })
})

router.post('/admin/tags/update', (req, res) => {
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
module.exports = router;