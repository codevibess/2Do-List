// create a new express router
const express      = require('express'),
  router           = express.Router(),
  mainController   = require('./controllers/main.controller'),
  todosController = require('./controllers/todos.controller');




// main routes
router.get('/', mainController.showHome);

// todo routes
router.get('/todos',       todosController.showTodos);



// create todos
router.get('/todos/create',  todosController.showCreate);
router.post('/todos/create', todosController.processCreate);

// edit todos
router.get('/todos/:slug/edit', todosController.showEdit);
router.post('/todos/:slug',     todosController.processEdit);

// delete todos
router.get('/todos/:slug/delete', todosController.deleteTodo);

// show a single todo
router.get('/todos/:slug', todosController.showSingle);


module.exports = router;