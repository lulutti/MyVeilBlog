const express = require('express');
const router = express.Router();

router.get('/tag', (req, res) => {
        res.send('testando')
})

router.get('/admin/tag/new', (req, res) => {
        res.send('rota para criar uma nova categoria')
})

module.exports = router;