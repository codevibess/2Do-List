const express = require('express');
const router = express.Router();
const mainController = require('./controllers/main.controller');
const todosController = require('./controllers/todos.controller');

module.exports = router;


router.get('/', mainController.showHome);
/**
 * Show all tasks
 */
router.get('/todos', todosController.showTodos);

router.get('/todos/seed', todosController.seedTodo);


/**
 * Observe a creating an task
 */
router.get('/todos/create', todosController.showCreate)
router.post('/todos/create', todosController.processCreate);

router.get('/todos/:slug', todosController.showSingle);