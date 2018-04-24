const ToDo = require('../models/todos');

module.exports = {
    showTodos: showTodos,
    showSingle: showSingle,
    seedTodo: seedTodo
}
/**
 * Show all todos
 */
function showTodos(req, res) {
   ToDo.find({}, (err, todos)=>{
       if(err){
           res.send(404);
           res.send('Events not found');
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
            res.send('Events not found');
        }
    res.render('pages/single', { todo: todo });
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

    res.send("Database succesfully seeded")
}
