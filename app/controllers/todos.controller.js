const ToDo = require('../models/todos');

module.exports = {
    showTodos: showTodos,
    showSingle: showSingle,
    seedTodo: seedTodo,
    showCreate: showCreate,
    processCreate: processCreate
}
/**
 * Show all todos
 */
function showTodos(req, res) {
   ToDo.find({}, (err, todos)=>{
       if(err){
           res.send(404);
           res.send('Task not found');
       }
       res.render('pages/todos', { todos: todos });
   })
   };

/**
 * Show single Page
 */
function showSingle(req, res) {
    ToDo.findOne({slug: req.params.slug},(err, todo)=>{
        if(err){
            res.send(404);
            res.send('Task not found');
        }
    res.render('pages/single', { 
        todo: todo,
        success: req.flash('success')
     });
});
}

/**
 * Seed  DB
 */
function seedTodo(req, res) {
    const todos = [
        { name: "Homework", description: 'Finish Math' },
        { name: "Home", description: 'Finish Math' },
        { name: "Homesss", description: 'Finish Math' },
    ];

    ToDo.remove({}, () => {
        for (key of todos) {
            const newTodo = new ToDo(key);
            newTodo.save();
        }
    })

    res.send('Database successfully seeded')
}

/**
 Show the create form
 */
function showCreate(req, res) {
    res.render('pages/create');
}
/**
 * Process the creation form
 */
function processCreate(req, res) {
    const todo = new ToDo({
        name: req.body.name,
        description: req.body.description
    });
    todo.save((err)=>{
        if(err){
            throw err;
        }

        req.flash('success', 'Task successfully created');
        res.redirect(`/todos`);
    });
}