const express = require('express')
const router = express.Router()

//create routes
router.get('/',(req,res) => {
    res.render('login.ejs') //name of view to be loaded
})

router.post('/', (req,res) => {
    
})

module.exports = router