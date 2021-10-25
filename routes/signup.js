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

let blacklistedPasswords = ["Password123","Passw0rd"];

function passwordValidator(pswd) {
  
    let msg = "valid";
    let isValid = false;
    
    if(/\s/.test(pswd)) {
        msg = "password may not contain spaces"
    } else if (!(/\d/.test(pswd) && /[a-zA-Z]/.test(pswd))) {
        msg = "password must contain letter and a digit";
    } else if (pswd.length < 8) {
      msg = "password must have length greater than 8";
    } else if (pswd.toLowerCase() === pswd) {
        msg = "password needs uppercase letters";
    } else if (pswd.toUpperCase() === pswd) {
        msg = "password needs uppercase letters";
    } else if(blacklistedPasswords.indexOf(pswd) > -1) {
        msg = `password \"${pswd}\" blacklisted`
    } else {
        isValid=true;
    }
  
    return {
      "message": msg,
      "isValid": isValid
    }
  }

module.exports = router