import React, { useState } from "react";

function EditTodo({ item, setTodos }) {
    const [description, setDescription] = useState(item.description);

    const updateDiscription = async (e) => {
        e.preventDefault();
        try {
            const body = { description };
            await fetch(
                `http://localhost:5000/todos/${item.todo_id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                }
            );

            window.location = "/";
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <>
            <button
                type="button"
                className="btn btn-warning"
                data-toggle="modal"
                data-target={`#id${item.todo_id}`}
            >
                Edit
            </button>

            <div
                className="modal fade"
                id={`id${item.todo_id}`}
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
                data-backdrop="static"
            >
                <div
                    className="modal-dialog modal-dialog-centered"
                    role="document"
                >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5
                                className="modal-title"
                                id="exampleModalLongTitle"
                            >
                                Edit Todo
                            </h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={() => setDescription(item.description)}
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <input
                                type="text"
                                className="form-control"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                                onClick={() => setDescription(item.description)}
                            >
                                Close
                            </button>
                            <button type="button" className="btn btn-primary" onClick={(e) => updateDiscription(e)}>
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditTodo;
