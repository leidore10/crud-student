import React from 'react'

const Todo = ({ todo, todoDelete, todoToogleComplete, setTodoEdit }) => {
    
    return ( 
        <div className="card mt-2">
                <div className="card-body">
                    <h3 className="card-title float-right" style={{textAlign: 'right'}}>
                        <p style={{marginRight: '2px'}}>{todo.name}</p>
                        <button 
                            onClick={() => todoToogleComplete(todo.id)} 
                            className={`btn btn-sm ${todo.completed ? 'btn-success' : 'btn-danger'}`}>
                            { todo.completed ? "Male" : "Female" }
                        </button>
                    </h3>
                    <p className="card-text text-right" style={{textAlign: 'right'}}>
                        {todo.description}
                    </p>
                    <hr />

                    <div style={{textAlign: 'right'}}>
                        <button 
                            onClick={() => setTodoEdit(todo)}
                            className="btn btn-sm btn-outline-primary mr-2">
                            Edit
                        </button>
                        <button
                            onClick={() => todoDelete(todo.id)} 
                            className="btn btn-sm btn-outline-danger"  style={{marginLeft: '5px'}}>
                            Delete
                        </button>  
                    </div>
                                      
                </div>
            </div>
     );
}
 
export default Todo;