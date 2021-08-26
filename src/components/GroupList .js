import React from 'react';
import Todo from './Todo';




const GroupList = ({listGroup, groupEdit, todos, todoDelete, todoToogleComplete, setTodoEdit, groupDelete}) => {   

    return ( 
    <div>
        <h1>List Group</h1>  
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Group</th>
                    <th scope="col">Teacher</th>
                    <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listGroup.map((group, index) => (
                            <tr> 
                                <td style={{color:'#dc3545'}}>{index+1}</td>      
                                <td>{group.nameGroup}</td>
                                <td>{group.teacher}</td>
                                <td className="top-0">
                                    <div className="row">
                                        <div className="col">
                                            <button 
                                                type="button"
                                                onClick={() => groupDelete(group.nameGroup)}
                                                class="btn btn-danger">
                                                    Delete
                                            </button>
                                        </div>                                   
                                    </div>  
                                </td>
                            </tr>    
                        ))
                    }
                </tbody>
            </table>     
        </div>       
     );
}
 
export default GroupList;