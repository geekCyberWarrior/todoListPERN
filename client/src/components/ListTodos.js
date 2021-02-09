import React, { useEffect, useState } from "react";
import EditTodo from "./EditTodo";

function ListTodos() {
    const [todos, setTodos] = useState([]);

    const getTodos = async () => {
        try {
            const response = await fetch("http://localhost:5000/todos");
            const jsonData = await response.json();

            setTodos(jsonData);
        } catch (error) {
            console.error(error.message);
        }
    };

    const deleteTodo = async todo_id => {
        try {
            await fetch(`http://localhost:5000/todos/${todo_id}`, {
                method: "DELETE"
            });
            setTodos(todos.filter(todo => todo.todo_id !== todo_id));
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        getTodos();
    }, []);

    return (
        <>
            <table className="table mt-5 text-center">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((item) => (
                        <tr key={item.todo_id}>
                            <td>{item.description}</td>
                            <td>
                                    <EditTodo item={item} setTodos={setTodos} />
                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={() => deleteTodo(item.todo_id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default ListTodos;
