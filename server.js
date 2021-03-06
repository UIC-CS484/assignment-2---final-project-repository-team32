const express = require("express");
const app = express();
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
expressLayouts = require("express-ejs-layouts");

const methodOverride = require("method-override");

if (process.env.NODE_ENV !== 'production') {
  require("dotenv").config();
}

const initializePassport = require("./passport-config");
initializePassport(passport);

app.set("view engine", "ejs");
app.set("views", __dirname + "/views"); //where the views will come from
app.set("layout", "layouts/layout"); //the layout for all files (so we don't duplicate beginning/end HTML)

app.use(methodOverride("_method"));
app.use(expressLayouts);
app.use(express.static("public")); //telling node where the files will come from
app.use(express.urlencoded({ extended: false })); // access form elements inside req var
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

const indexRouter = require("./routes/index");
const loginRouter = require("./routes/login");
const signupRouter = require("./routes/signup");
const favoritesRouter = require("./routes/favorites");
const logoutRouter = require("./routes/logout");
const profileRouter = require("./routes/profile");

// "/" page
app.use("/", indexRouter);
app.use("/index", indexRouter);

app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/favorites", favoritesRouter);
app.use("/logout", logoutRouter);
app.use("/profile", profileRouter);

app.listen(process.env.PORT || 3000, () => console.log("app is running"));
