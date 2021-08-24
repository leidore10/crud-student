import React, {useState, useEffect} from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import Quote from './components/quote';

const initialTodos = [
    {
        id: 1,
        name: 'Todo #1',
        age: 18,
        male: true,
        email: 'test@gmail.com',
        dateBirth: '10/10/1990',
        country: 'New York',
        group: 'B1',
    },
    {
        id:2,
        name: 'Todo #2',
        age: 19,
        male: false,
        email: 'test11@gmail.com',
        dateBirth: '11/11/1990',
        country: 'Miami',
        group: 'A1',
    }
]

const localTodos = JSON.parse(localStorage.getItem('todos'));

const App = () => {

    const [todos, setTodos] = useState(localTodos || initialTodos);
    const [todoEdit, setTodoEdit] = useState(null);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos]);

    const todoAdd = (todo) => {

        const newTodo = {
            id: Date.now(),
            ...todo,
            completed: false
        }

        const changedTodo = [
            newTodo,
            ...todos            
        ]

        setTodos(changedTodo);
    }

    const todoUpdate = (todoEdit) => {

        const changeTodos = todos.map(todo => (
          todo.id === todoEdit.id
          ? todoEdit
          : todo  
        ))

        setTodos(changeTodos);
    }

    const todoDelete = (todoId) => {

        if (todoEdit && todoId === todoEdit.id) {
            setTodoEdit(null);
        }

        const changeTodos = todos.filter(todo => todo.id !== todoId);
        setTodos(changeTodos);
    }

    const todoToogleComplete = (todoId) => {        

        const changeTodos = todos.map( todo => (
            todo.id === todoId
            ? {...todo, completed : !todo.completed}
            : todo
        ));

        setTodos(changeTodos);
    }

    return ( 
        <div className="container mt-4">
            <div className="row">
                <div className="col">
                    <TodoList 
                    todos={todos}
                    todoDelete={todoDelete}
                    todoToogleComplete={todoToogleComplete}
                    setTodoEdit={setTodoEdit}
                    />
                </div>

                <div className="col">
                    <TodoForm
                      todoAdd={todoAdd}  
                      todoUpdate={todoUpdate}  
                      todoEdit={todoEdit}
                      setTodoEdit={setTodoEdit}
                    />                 
                </div>
            </div>            
        </div>        
     );
}
 
export default App;