const express = require('express');
const router = express.Router();
const User = require('./User');
const bcrypt = require('bcryptjs');
const auth = require('../middlewares/auth');

router.get('/admin/users', auth, (req, res) => {
       
       res.send('usuarios')
})

router.get('/admin/users/create', auth,(req, res) => {
       res.render('admin/users/create')
})

router.post('/admin/users/create', auth, async (req, res) => {
       const email = req.body.email;
       const password = req.body.password;

       User.findOne({
              where: {email: email}
       }).then(async user => {
              if(!user){
                     const salt =  await bcrypt.genSalt(10);
                     const hash = bcrypt.hashSync(password, salt);

                     User.create({
                     email: email,
                     password: hash
                     }).then(() => res.redirect('/'))
                     
              } else {
                     res.send("email duplicado")
              }
       })       
})

router.get('/admin/users/login', (req, res) => {
       res.render('admin/users/login')
})

router.post('/admin/users/authenticate', (req, res) => {
       const email = req.body.email;
       const password = req.body.password;

       User.findOne({where: {email: email}}).then(user => {
              if(user){
                     const validate = bcrypt.compareSync(password, user.password);

                     if(validate){
                            req.session.user = {
                                   id: user.id,
                                   email: user.email
                            }
                            res.json(req.session.user);
                     } else {
                            res.send('senha incorreta')
                     }

              }else{
                     res.send('email não encontrado')
              }
       })

})

module.exports = router;
