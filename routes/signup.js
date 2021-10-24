var fs = require('fs');
const express = require('express')
const router = express.Router()

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

    if (password.length < 8){
        // app.locals.error = "Password not long enough";
        // console.log(signup_error);

        res.render('signup.ejs')
    }

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
})

module.exports = router