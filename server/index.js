const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// MIDDLEWARES
app.use(cors());

// ENABLE TO GET REQUEST BODY FROM CLIENT
app.use(express.json());

// ROUTES
// CREATE
app.post('/todos', async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description]);
        res.json(newTodo.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
});

// READ ALL
app.get('/todos', async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch (error) {
        console.error(error.message);
    }
});

// READ 1
app.get("/todos/:id", async (req,res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);

        res.json(todo.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
});

// UPDATE
app.put('/todos/:id', async (req,res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updatedTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);

        res.json("Todo was Updated!");
    } catch (error) {
        console.error(error.message);
    }
});

// DELETE
app.delete('/todos/:id', async (req,res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        
        res.json("Todo was Deleted...");
    } catch (error) {
        console.error(error.message);
    }
});

app.listen(5000, () => {
    console.log("server running on port 5000")
});