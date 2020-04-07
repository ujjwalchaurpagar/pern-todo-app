const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
//middleware
app.use(cors());
app.use(express.json());

//Routs 

//default 

//create a todo
app.post("/todos", async(req,res) => {
    try{
        console.log(req.body);
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *",[description]);

        res.json(newTodo.rows[0]);
    } catch (err){
        console.log(err.message);
    }
})

//get all todos

app.get("/todos", async(req,res) => {
    try{
        const allTodo = await pool.query("SELECT * FROM todo")
        res.json(allTodo.rows);
    } catch(err){
        console.log(err.message);
    }
})

//get specific todo

app.get("/todos/:id", async(req,res)=>{
    try{
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id =$1", [id]);

        res.json(todo.rows[0]);
    } catch(err){
        console.log(err.message);
    }

})


// update todo
app.put("/todos/:id", async(req,res) => {
    try{
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);
        
        res.json("update successfully.");
    } catch (err) {
        console.log(err.message);
    }
});

//delete
app.delete("/todos/:id", async(req,res) => {
    try{
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id=$1",[id]);

        res.json("Record deleted successfully!!!");
    } catch (err) {
        console.log(err.message);
    }
});


app.listen(5000, ()=>{
    console.log("listening on 5000");
});