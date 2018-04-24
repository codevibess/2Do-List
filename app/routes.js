const express = require('express');
const router = express.Router();
const mainController = require('./controllers/main.controller');
const todosController = require('./controllers/todos.controller');

module.exports = router;


router.get('/', mainController.showHome);
router.get('/todos', todosController.showTodos);

router.get('/todos/seed', todosController.seedTodo);

router.get('/todos/:slug', todosController.showSingle);