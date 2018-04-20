const express = require('express');
const router = express.Router();
const mainController = require('./controllers/main.controllers');


module.exports = router;


router.get('/', mainController.showHome);