import React from 'react'

const Todo = ({ todo, todoDelete, todoToogleComplete, setTodoEdit }) => {
    
    return ( 
        <div className="card mt-2">
            <div className="card-body">
                <h5 className="float-right" style={{textAlign: 'right'}}>
                    <p style={{marginRight: '2px'}}>{todo.name}</p>
                    <button 
                        onClick={() => todoToogleComplete(todo.id)} 
                        className={`btn btn-sm ${todo.completed ? 'btn-success' : 'btn-danger'}`}>
                        { todo.completed ? "Male" : "Female" }
                    </button>
                </h5>
                <h5 className="text-left">
                    <b style={{marginLeft: '40px'}}>Gropup:</b> {todo.group} 
                </h5>
                
                 <h5 className="text-left">
                    <b style={{marginLeft: '57px'}}>Email:</b> {todo.email} 
                </h5>

                <h5 className="text-left">
                    <b style={{marginLeft: '75px'}}>Age:</b>  {todo.age}
                </h5>

                <h5 className="text-left">
                    <b>Date Birtday:</b> {todo.dateBirth}
                </h5>
                
                <h5 className="text-left">
                    <b style={{marginLeft: '40px'}}>Country:</b> {todo.country}
                </h5>


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