const express = require('express')
const app = express()
expressLayouts = require('express-ejs-layouts')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views') //where the views will come from
app.set('layout', 'layouts/layout') //the layout for all files (so we don't duplicate beginning/end HTML)
app.use(expressLayouts)
app.use(express.static('public')) //telling node where the files will come from

const dotenv = require('dotenv')
dotenv.config()

const indexRouter = require('./routes/index')
const loginRouter = require('./routes/login')
const signupRouter = require('./routes/signup')
const favoritesRouter = require('./routes/favorites')

// "/" page
app.use('/',indexRouter)
app.use('/index',indexRouter)

app.use('/login',loginRouter)
app.use('/signup',signupRouter)
app.use('/favorites',favoritesRouter)

app.listen(process.env.PORT, () => console.log('app is running'))
