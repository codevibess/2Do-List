const express = require('express');
const router = express.Router();
const mainController = require('./controllers/main.controllers');
const todosController = require('./controllers/todos.controller');

module.exports = router;

//main route
router.get('/', mainController.showHome);

router.get('/todo', todosController.showTodos);