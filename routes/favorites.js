const express = require('express')
const router = express.Router()

//create routes
router.get('/',(req,res) => {
    res.render('favorites.ejs') //name of the view index.ejs
})

module.exports = router