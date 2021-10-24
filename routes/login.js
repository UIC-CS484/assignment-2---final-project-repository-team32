const express = require('express')
const passport = require('passport')
const router = express.Router()

//create routes
router.get('/',(req,res) => {
    res.render('login.ejs') //name of view to be loaded
})

router.post('/', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

module.exports = router