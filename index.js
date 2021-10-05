const express = require('express');
const app = express();
const connection = require('./db/database');
const TagsController = require('./categories/TagsController');
const ArticlesController = require('./articles/ArticlesController')

//View engine
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

/* Database */
connection
        .authenticate()
        .then(() => console.log("Conexão ok"))
        .catch((err) => console.log(err))
/**********/

app.get('/', (req, res) => {
        res.render("index")
})

app.use('/', TagsController);
app.use('/', ArticlesController);

app.listen(8080, () => console.log("O servidor está rodando"))