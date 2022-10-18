const mongoose = require("mongoose")

async function connect(){
    try{
        await mongoose.connect(
            "mongodb://127.0.0.1:27017/todo-tdd",
            {useNewUrlParser: true})
    } catch (err){
        console.log("Error Connecting to mongodb")
        console.log(err)
    }
}

module.exports = {connect};