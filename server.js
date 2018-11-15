require('dotenv').config();


const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')
const expressValidator = require('express-validator')
const open = require('open')
const colors = require('colors')

const port = process.env.PORT || 8080

const app = express()


app.use(session({
  secret: process.env.SECRET,
  cookie: { maxAge: 60000 },
  resave: false,    
  saveUninitialized: false  
}));
app.use(flash());



app.use(express.static(__dirname + '/public'));


app.set('view engine', 'ejs');
app.use(expressLayouts);


mongoose.connect(process.env.DB_URI);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

app.use((req, res, next)=>{
  console.log("It was new request".green)
  next()
})



app.use(require('./app/routes'));


app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
  open(`http://localhost:${port}`);
});