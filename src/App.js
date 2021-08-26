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
    { id: 1, value: '0', label: 'Select Group' },
    { id: 2, value: 'A 1', label: 'A 1' },
    { id: 3, value: 'A 2', label: 'A 2' },
    { id: 4, value: 'B 1', label: 'B 1' },
    { id: 5, value: 'B 2', label: 'B 2' },
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
    {id: 1, nameGroup: 'A 1', teacher: 'Buster River'},
    {id: 2, nameGroup: 'A 2', teacher: 'Gob Alisson'},
    {id: 3, nameGroup: 'B 1', teacher: 'Attony Neon'},  
    {id: 4, nameGroup: 'B 2', teacher: 'George Michael'},
  ]

const localTodos = JSON.parse(localStorage.getItem('todos'));

const localOptionsGroup = JSON.parse(localStorage.getItem('optionsGroup'));

const localListGroup = JSON.parse(localStorage.getItem('listGroup'));

const App = () => {

    const [todos, setTodos] = useState(localTodos || initialTodos);
    const [optionsGroup, setOptionsGroup] = useState(localOptionsGroup || initialOptionsGroup);
    const [optionsCountry, setOptionsCountry] = useState(initialOptionsCountry);
    const [listTeacher, setListTeacher] = useState(initialTeacher);
    const [listGroup, setListGroup] = useState(localListGroup || initialListGroup);
    const [todoEdit, setTodoEdit] = useState(null);
    const [groupEdit, setGroupEdit] = useState(null);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos]);

    useEffect(() => {
        localStorage.setItem('optionsGroup', JSON.stringify(optionsGroup))
    }, [optionsGroup]);

    useEffect(() => {
        localStorage.setItem('listGroup', JSON.stringify(listGroup))
    }, [listGroup]);

    const todoAdd = (todo,group) => {

        if(todo) {
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

        if(group) {
            const newGroup = {
                id: Date.now(),
                ...group,
                }

                const changedGroup = [
                    newGroup,
                    ...listGroup            
                ]

            setListGroup(changedGroup);

           const newOptionsGroup = {
                id: Date.now(),
               value: group.nameGroup,
               label: group.nameGroup,
           } 

           const changedOptionGroup = [                    
                    ...initialOptionsGroup,
                    newOptionsGroup,         
                ]            
        
            setOptionsGroup(changedOptionGroup);     
        }        
    }

    const todoUpdate = (todoEdit, groupEdit) => {
        if (todoEdit) {
            const changeTodos = todos.map(todo => (
            todo.id === todoEdit.id
            ? todoEdit
            : todo  
            ))

            setTodos(changeTodos);
        }

        if(groupEdit) {

        }
        
    }

    const todoDelete = (todoId) => {

        if (todoEdit && todoId === todoEdit.id) {
            setTodoEdit(null);
        }

        const changeTodos = todos.filter(todo => todo.id !== todoId);
        setTodos(changeTodos);
    }

    const groupDelete = (groupName) => {

        const changeListGroup = listGroup.filter(group => group.nameGroup !== groupName);
        setListGroup(changeListGroup);
        
        const changeOptionsGroup = optionsGroup.filter(optionGroup => optionGroup.value !== groupName);
        setOptionsGroup(changeOptionsGroup);


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
                    groupDelete={groupDelete}
                    todoToogleComplete={todoToogleComplete}
                    groupEdit={groupEdit}
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
                      listTeacher={listTeacher}  
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