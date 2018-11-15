const Todo = require('../models/todo');


/**
 * Show all todos
 */
function showTodos(req, res) {
  Todo.find({}, (err, todos) => {
    if (err) {
      res.status(404);
      res.json('Todos not found!');
    }

    // return a view with data
    res.render('pages/todos', {
      todos: todos,
      success: req.flash('success')
    });
  });
}

/**
 * Show a single todo
 */
function showSingle(req, res) {
  Todo.findOne({ slug: req.params.slug }, (err, todo) => {
    if (err) {
      res.status(404);
      res.json('Todo not found!');
    }

    res.render('pages/single', {
      todo: todo,
      success: req.flash('success')
    });
  });
}

/**
 * Seed the database
 */


/**
 * Show the create form
 */
function showCreate(req, res) {
  res.render('pages/create', {
    errors: req.flash('errors')
  });
}

/**
 * Process the creation form
 */
function processCreate(req, res) {
  req.checkBody('name', 'Name is required.').notEmpty();
  req.checkBody('description', 'Description is required.').notEmpty();

  // if there are errors, redirect and save errors to flash
  const errors = req.validationErrors();
  if (errors) {
    req.flash('errors', errors.map(err => err.msg));
    return res.redirect('/todos/create');
  }


  const todo = new Todo({
    name: req.body.name,
    description: req.body.description
  });

  // save todo
  todo.save((err) => {
    if (err)
      throw err;

    // set a successful flash message
    req.flash('success', 'Successfuly created todo!');

    // redirect to the newly created todo
    res.redirect(`/todos/${todo.slug}`);
  });
}

/**
 * Show the edit form
 */
function showEdit(req, res) {
  Todo.findOne({ slug: req.params.slug }, (err, todo) => {
    res.render('pages/edit', {
      todo: todo,
      errors: req.flash('errors')
    });
  });
}

/**
 * Process the edit form
 */
function processEdit(req, res) {
  // validate information
  req.checkBody('name', 'Name is required.').notEmpty();
  req.checkBody('description', 'Description is required.').notEmpty();

  // if there are errors, redirect and save errors to flash
  const errors = req.validationErrors();
  if (errors) {
    req.flash('errors', errors.map(err => err.msg));
    return res.redirect(`/todos/${req.params.slug}/edit`);
  }


  Todo.findOne({ slug: req.params.slug }, (err, todo) => {
    todo.name = req.body.name;
    todo.description = req.body.description;

    todo.save((err) => {
      if (err)
        throw err;


      req.flash('success', 'Successfully updated todo.');
      res.redirect('/todos');
    });
  });

}

/**
 * Delete an todo
 */
function deleteTodo(req, res) {
  Todo.remove({ slug: req.params.slug }, (err) => {
    req.flash('success', 'Todo deleted!');
    res.redirect('/todos');
  });
}




module.exports = {
  showTodos: showTodos,
  showSingle: showSingle,
  showCreate: showCreate,
  processCreate: processCreate,
  showEdit: showEdit,
  processEdit: processEdit,
  deleteTodo: deleteTodo
}
