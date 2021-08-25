import React, { useState, useEffect } from 'react';

const initialFormValues = {
    name: '',
    email: '',
    dateBirth: '',
    age: '',
    country: '',
    group: '',
}

const TodoForm = ({listGroup, optionsCountry, optionsGroup, todoAdd, todoUpdate, todoEdit, setTodoEdit}) => {

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
            setSuccess('The student was edited.');
        }else{
           todoAdd(formValues); 
           setSuccess('The student was saved.');
           setFormValues(initialFormValues);
        }  
       
       setError(null)

       setTimeout(() => {
           setSuccess(null);
       }, 3000);
      
    }
    
    return (
        <div>
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
                    name="name"
                    onChange={handleInputChange}
                />

                <div class="row mt-2">
                    <div class="col">
                    <input 
                        type="email" 
                        class="form-control" 
                        id="exampleFormControlInput1" 
                        placeholder="Email student"
                        value={email}
                        name="email"
                        onChange={handleInputChange}
                    />
                    </div>
                    <div class="col">
                        <input 
                            type="number" 
                            class="form-control" 
                            placeholder="Age student"
                            value={age}
                            name="age"
                            onChange={handleInputChange}
                        />                       
                    </div>
                </div>

                <div class="row mt-2">
                    <div class="col-12">
                        <label className="ml-1" style = {{color:'green'}} for="birthday">Date:</label>                  
                        <input 
                            style = {{marginLeft:'3px'}} 
                            type="date" 
                            id="dateBirth" 
                            name="dateBirth"
                            value={dateBirth}
                            onChange={handleInputChange}
                        />                        
                    </div>
                </div>

                <div class="row mt-2">
                    <div class="col">                    
                        <select
                            class="form-select" 
                            aria-label="Default select example"
                            id="group"    
                            name="group"
                            value={group}
                            onChange={handleInputChange}  
                        >
                            options = 
                            {
                                optionsGroup.map( option =>(
                                    <option value={option.value}>{option.label}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div class="col">
                        <select                            
                            class="form-select" 
                            aria-label="Default select example"
                            id="country"    
                            name="country"
                            value={country}
                            onChange={handleInputChange}
                        >
                            options = 
                            {
                                optionsCountry.map( option =>(
                                    <option value={option.value}>{option.label}</option>
                                ))
                            }    
                            
                        </select>                        
                    </div>
                </div>

                <button 
                    className="btn btn-primary btn-block mt-4 form-control" style = {{backgroundColor:'green'}}>
                    { todoEdit ? 'Edit Student' : 'Add Student'}
                </button>
            </form>

            {
                error && (<div className="alert alert-danger danger mt-2"> { error } </div> )             
            }

            
            {  
                success && (<div className="alert alert-info info mt-2"> { success } </div> )             
            }            
        </div>
           
        </div> 
        
     );
}
 
export default TodoForm;