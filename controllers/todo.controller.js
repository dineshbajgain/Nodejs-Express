const TodoModel = require("../model/todo.model")

exports.createTodo = async (req, res, next)=>{
    try {
        const createdTodoModel = await TodoModel.create(req.body)
        res.status(201).json(createdTodoModel);
    } catch (err) {
       next(err)
    }
}