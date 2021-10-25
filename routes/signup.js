var fs = require('fs');
const express = require('express')
const router = express.Router()

const passwordValidator = require('./validator.js')

//create routes
router.get('/',(req,res) => {
    res.render('signup.ejs') //name of the view index.ejs
})

router.post('/', (req,res) => {

    let users = [];

    var id = Math.abs(Date.now().toString());
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    let resultOfValidator = passwordValidator(password);

    if (!resultOfValidator.isValid){
        res.render('signup.ejs', {error: resultOfValidator.message})
    } else {

        users.push({
            id: id,
            name: name,
            email: email,
            password: password
        })

        console.log(users);

        let data = JSON.stringify(users);
        fs.writeFileSync('users.json', data);

        res.redirect('/login');
    }
})

module.exports = router