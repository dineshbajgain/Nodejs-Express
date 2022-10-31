const TodoModel = require("../model/todo.model")

exports.createTodo = async (req, res, next)=>{
    try {
        const createdTodoModel = await TodoModel.create(req.body)
        res.status(201).json(createdTodoModel);
    } catch (err) {
       next(err)
    }
}

exports.getTodos = async (req,res,next)=>{
    try {
        const allTodos = await TodoModel.find({});
        res.status(200).json(allTodos);
    } catch (error) {
        next(error)
    }
}

exports.getTodoById = async(req,res,next)=>{
    const todo =  await TodoModel.findById(req.params.todoId);            
    try {
        if(todo){
         res.status(200).json(todo);    
        }else{
            res.status(404).send();
        }
    } catch (error) {
        next(error)
    }
   
}

exports.updateTodo = async(req, res, next)=>{
    try {
        const updateTodo = await TodoModel.findByIdAndUpdate(req.params.todoId,req.body,{
            new: true,
            useFindAndModify: false
          })
        if(updateTodo){
            res.status(200).json(updateTodo);
        }
        else{
            res.status(404).send();
        }
    } catch (error) {
        next(error)
    }
   
}

exports.deleteTodo = async(req, res, next)=>{
   
    try {
        const deletedTodo = await TodoModel.findByIdAndDelete(req.params.todoId);
        if(deletedTodo){
            res.status(200).json(deletedTodo);
        }else{
            res.status(404).send();
        }
    } catch (error) {
        next(error)
    }    
} 