import React,{useState,useEffect} from 'react'
import FilterControls from './FilterControls';
import useLocalStorage from '../../hooks/useLocalStorage';
import TodoItem from './TodoItem';
import {v4 as uuidv4} from "uuid" 
import "./TodoApp.css"

const TodoApp = () => {
  const[filter,setFilter] = useState("all");
  const[priority,setPriority] = useState("medium")
    const [todo,setTodo] = useState("");
    const [todoList,setTodoList] = useLocalStorage("todos",[])

    const addTodo = () =>{
        if(todo.trim()==="") return;
        setTodoList([...todoList,{id:uuidv4(),text:todo,completed: false,priority:priority}])
        setTodo("");
        setPriority("medium")
    }
    
    const filteredTodos = todoList.filter((item) => {
    if (filter === "active") return !item.completed;
    if (filter === "completed") return item.completed;
    return true;
  });
  return (
    <div className='wholeContainer'>
      <h1 className="TodoHeading">To-Do App</h1>
      <div className="input-container">
        <input type="text" 
        placeholder='Add a new Task' 
        value={todo} 
        className='inputElement'
        onChange={(e)=>setTodo(e.target.value)}/>
        
        <select
    className="priority-select"
    value={priority}
    onChange={(e) => setPriority(e.target.value)}
  >
    <option value="low">Low</option>
    <option value="medium">Medium</option>
    <option value="high">High</option>
  </select>

        <button onClick={addTodo} className='add-btn'>Add</button>
      </div>
      <FilterControls filter={filter} setFilter={setFilter}/>
      <TodoItem todolists={filteredTodos} setTodoList={setTodoList}/>
    </div>
  )
}

export default TodoApp
