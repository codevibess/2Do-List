const ToDo = require('../models/todos');
module.exports = {
    //show all todos
    showTodos: (req, res) => {
        //dummy todos to test

        res.render('pages/todos', { todos: todos });
    },
    showSingle: (req, res) => {
        const todo = { name: "Homework", slug: "homework", description: 'Finish Math' };
        res.render('pages/single', { todo: todo });
    },
    //seed db
    seedTodo: (req, res) => {
        const todos = [
            { name: "Homework", description: 'Finish Math' },
            { name: "Home", description: 'Finish Math' },
            { name: "Homesss", description: 'Finish Math' },
        ];

        ToDo.remove({}, ()=>{
            for (key of todos) {
                const newTodo = new ToDo(key);
                newTodo.save();
            }
        })
        
        res.send("Database succesfully seeded")
    }
};