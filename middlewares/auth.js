function auth(req, res, next){
       req.session.user ? next() : res.redirect('/admin/users/login')
}

module.exports = auth;