const express = require('express')
const router = express.Router()

//create routes
router.get('/',(req,res) => {
    res.render('signup.ejs') //name of the view index.ejs
})

module.exports = router