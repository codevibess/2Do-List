// const ToDo = require('../models/todos');
module.exports = {
    //show all todos
    showTodos: (req, res) => {
        //dummy todos to test
        const todos = [
            { name: "Homework", slug: "homework", description: 'Finish Math' },
                      ];
        res.render('pages/todos', { todos: todos });
    }
};