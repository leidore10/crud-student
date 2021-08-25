import React, {useState, useEffect} from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import GroupList from './components/GroupList ';

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

const initialOptionsGroup = [
    { value: '0', label: 'Select Group' },
    { value: 'a1', label: 'A 1' },
    { value: 'a1', label: 'A 2' },
    { value: 'b1', label: 'B 1' },
    { value: 'b2', label: 'B 2' },
  ];


const initialOptionsCountry = [
    { value: '0', label: 'Select Group' },
    { value: 'havana', label: 'Havana' },
    { value: 'pinar del rio', label: 'Pinar del Rio' },
    { value: 'matanzas', label: 'Matanzas' },
    { value: 'villa clara', label: 'Villa Clara' },
    { value: 'sancti-spiritus', label: 'Sancti-Spiritus' },
    { value: 'Camaguey', label: 'Camaguey' },
    { value: 'Holguin', label: 'Holguin' },
    { value: 'santiago de cuba', label: 'Santiago de Cuba' },
  ];

  const initialTeacher = [
    { value: '0', label: 'Select Teacher' },
    { value: 'gob alisson', label: 'Gob Alisson' },
    { value: 'buster river', label: 'Buster River' },
    { value: 'george michael', label: 'George Michael' },
    { value: 'attony neon', label: 'Attony Neon' }, 
  ]

  const initialListGroup = [
    {id: 1, name: 'A 1', teacher: 'Buster River'},
    {id: 2, name: 'A 2', teacher: 'Gob Alisson'},
    {id: 3, name: 'B 1', teacher: 'Attony Neon'},  
    {id: 4, name: 'B 2', teacher: 'George Michael'},
  ]

const localTodos = JSON.parse(localStorage.getItem('todos'));

const App = () => {

    const [todos, setTodos] = useState(localTodos || initialTodos);
    const [optionsGroup, setOptionsGroup] = useState(initialOptionsGroup);
    const [optionsCountry, setOptionsCountry] = useState(initialOptionsCountry);
    //const [optionsCountry, setOptionsCountry] = useState(initialOptionsCountry);
    const [listGroup, setListGroup] = useState(initialListGroup);
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
        <div className="container-fluid mt-4">
            <div className="row">
                <div className="col">
                <GroupList 
                    listGroup={listGroup}
                    todoDelete={todoDelete}
                    todoToogleComplete={todoToogleComplete}
                    setTodoEdit={setTodoEdit}
                    />
                </div>
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
                      optionsCountry={optionsCountry}  
                      optionsGroup={optionsGroup}
                      listGroup={listGroup}
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