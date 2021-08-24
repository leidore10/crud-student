import React, { useState, useEffect } from 'react';

const initialFormValues = {
    name: '',
    age: 18,
    email: '',
    dateBirth: '',
    country: '',
    group: '',
}

const TodoForm = ({todoAdd, todoUpdate, todoEdit, setTodoEdit}) => {

    const [formValues, setFormValues] = useState(initialFormValues)
    const {name, age, email, dateBirth, country, group} = formValues
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {

        if (todoEdit) {
          setFormValues(todoEdit)  
        } else {
            setFormValues(initialFormValues);
        }    

    }, [todoEdit])


    const handleInputChange = (e) => {

        const changendFormValues = {
            ...formValues,
            [e.target.name]: e.target.value
        }
        
        setFormValues(changendFormValues)
    }

    const handleRollback = () => {
        setTodoEdit(null);
        setFormValues(initialFormValues);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(name.trim() === '' || email.trim() == '') {
            setError('Tienes campos vacios.')
            setSuccess(null)
            return;
        }

        if(todoEdit){
            todoUpdate(formValues);
            setSuccess('The task was edited.');
        }else{
           todoAdd(formValues); 
           setSuccess('The task was saved.');
           setFormValues(initialFormValues);
        }  
       
       setError(null)

       setTimeout(() => {
           setSuccess(null);
       }, 3000);
      
    }
    
    return ( 
        <div>
            <h1>{ todoEdit ? 'Edit Student' : 'New Student'}</h1>
            {
                todoEdit && (
                <btn 
                    onClick={handleRollback}
                    className="btn btn-warning btn-sm mb-3"> Rollback 
                </btn>)
            }
            
            <form onSubmit={ handleSubmit }>
                <input 
                    type="text" 
                    placeholder="Name" 
                    className="form-control"
                    value={name}
                    name="Name"
                    onChange={handleInputChange}
                />

                <div class="row mt-2">
                    <div class="col">
                    <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Email student" />
                    </div>
                    <div class="col">
                    <input type="text" class="form-control" placeholder="Age student" />
                    </div>
                </div>

                <div class="row mt-2">
                    <div class="col-5">
                    
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate" />
                        <label class="form-check-label" for="flexCheckIndeterminate">
                            Male
                        </label>
                    </div>

                    </div>
                    <div class="col-7">
                        <label className="ml-1" style = {{color:'green'}} for="birthday">Date:</label>                  
                        <input style = {{marginLeft:'3px'}} type="date" id="birthday" name="birthday" />                        
                    </div>
                </div>

                <div class="row mt-2">
                    <div class="col">                    
                        <select class="form-select" aria-label="Default select example">
                            <option selected>Select Age</option>
                            <option value="10">10</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                        </select>
                    </div>

                    <div class="col">
                        <select class="form-select" aria-label="Default select example">
                            <option selected>Select Country</option>
                            <option value="havana">Havana</option>
                            <option value="pinar del rio">Pinar del Rio</option>
                            <option value="matanzas">Matanzas</option>
                            <option value="villa clara">Villa Clara</option>
                            <option value="sancti-spiritus">Sancti-Spiritus</option>
                            <option value="Camaguey">Camaguey</option>
                            <option value="Holguin">Holguin</option>
                            <option value="santiago de cuba">Santiago de Cuba</option>
                        </select>                        
                    </div>
                </div>

                <button 
                    className="btn btn-primary btn-block mt-4 form-control" style = {{backgroundColor:'green'}}>
                    { todoEdit ? 'Edit Task' : 'Add Task'}
                </button>
            </form>

            {
                error && (<div className="alert alert-danger danger mt-2"> { error } </div> )             
            }

            
            {  
                success && (<div className="alert alert-info info mt-2"> { success } </div> )             
            }            
        </div>
        
     );
}
 
export default TodoForm;