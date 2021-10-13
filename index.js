const express = require('express');
const app = express();
const session = require('express-session');
const connection = require('./db/database');
const TagsController = require('./tags/TagsController');
const ArticlesController = require('./articles/ArticlesController');
const UserController = require('./users/UsersController');

const Article = require('./articles/Article');
const Tag = require('./tags/Tag')

//View engine
app.set('view engine', 'ejs');

//Sessions
app.use(session({
        secret: 'veilblog',
        cookie: {maxAge: 14400000} 
}))

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
app.use('/', UserController);

app.get('/session', (req, res) => {
        req.session.ano = '2021';
        req.session.nome = 'luiza';
        req.session.user = {
                username: 'lulutti',
                email: 'malludra@email.com',
                id: 10
        }
        res.send('sessão gerada')
})

app.get('/read', (req, res) => {
        res.json({
                ano: req.session.ano,
                email: req.session.email,
                user: req.session.user,
        })
})


app.listen(8080, () => console.log("O servidor está rodando"))