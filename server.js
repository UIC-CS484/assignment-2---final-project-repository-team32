if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config
}

const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const initializepassport = require('./passport_config')
const flash = require('express-flash')
const session = require('express-session')
const initialize = require('./passport_config')
const LocalStrategy = require("passport-local")
const methodOverride =require('method-override')


initializepassport(
    passport,
    email => users.find(users => users.email === email),
    id => users.find(users => users.id === id)

)

const users = []
app.use(express.urlencoded({extended : false}))
// app.use(express.static(path.join(__dirname, '/views')));
app.use(flash())
// app.use(session({
//     secret : process.env.SESSION_SECRET ,
//     resave : false ,
//     saveUninitialized : false
// }))

app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))
app.set('view-engine', 'html') ///////////
app.engine('html', require('ejs').renderFile);

app.get('/', checkAuthenticated, (req,res) =>{
    res.render('index.html' , {name: req.user.name})
})

app.get('/login',checknotAuthenticated, (req,res) =>{
    res.render('login.html')
})

app.delete('/logOut', (req,res)=>{
    req.logOut()
    res.redirect('/login')
})

app.post('/login',checknotAuthenticated, passport.authenticate('local', {
    successRedirect : '/' ,
    failureRedirect : '/login' ,
    failureFlash : true 
})
)

app.get('/register',checknotAuthenticated , (req,res) =>{
    res.render('register.html')
})

app.post('/register',checknotAuthenticated , async(req,res) => {
    
    try{
        const hashedpassword = await bcrypt.hash(req.body.password,10)
        users.push({
            id : Date.now.toString(),
            name : req.body.name,
            email : req.body.email,
            password : hashedpassword,
        })
    res.redirect('/login')
    }

catch{
    res.redirect('/register')
}
 console.log(users)
})
function checkAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/login')
}

function checknotAuthenticated(req,res,next){
    if(req.isAuthenticated()){
       return  res.redirect('/')
    }
    next()
}
app.listen(3000)