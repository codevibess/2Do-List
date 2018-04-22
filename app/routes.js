const express = require('express');
const router = express.Router();
const mainController = require('./controllers/main.controller');
const todosController = require('./controllers/todos.controller');

module.exports = router;


router.get('/', mainController.showHome);
router.get('/todo', todosController.showTodos);