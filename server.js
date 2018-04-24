//load enviroment variables
require('dotenv').config();

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = process.env.port || 8080;



app.use(express.static(__dirname + '/public'));


app.set('view engine', 'ejs');
app.use(expressLayouts);

mongoose.connect(process.env.DB_URI);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

  console.log("Succesfull conection to database");
});

app.use(bodyParser.urlencoded({extended: true}));
//set the routes
app.use(require('./app/routes'));


app.listen(port, () => {
    console.log(`Server started at port ${port}`);
})