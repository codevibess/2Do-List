

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const port = process.env.port || 8080;



app.use(express.static(__dirname + '/public'));


app.set('view engine', 'ejs');
app.use(expressLayouts);
//set the routes
app.use(require('./app/routes'));


app.listen(port, ()=>{
    console.log(`Server started at port ${port}`);
})