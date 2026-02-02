import React from 'react'
import "./TodoItem.css"
const TodoItem = (props) => {
    const {todolists,setTodoList} = props

    const toggleComplete = (id)=>{
        setTodoList(
            todolists.map((eachItem)=>
            eachItem.id === id ? {...eachItem,completed: !eachItem.completed}:eachItem)
        )}
    
        const deleteTodo =(id)=>{
            setTodoList(
                todolists.filter((eachItem)=>eachItem.id !== id)
            )
        }
    
        
  return (
    <div className="taskItemContainer">
        <p>List of Tasks</p>
       <ul className='taskItemList'>
        {todolists.map((eachItem)=>(
            <li 
            className='listItem'
            key={eachItem.id} 
            onClick={()=>toggleComplete(eachItem.id)}
            style={{
                cursor:'pointer',
                textDecoration :eachItem.completed ? 'line-through' : 'none',
                color :eachItem.completed? 'grey' : 'black'
            }}>
            <span className="taskItems">{eachItem.text} </span>
            <span
                className={`priority-badge ${eachItem.priority}`}
              >
                {eachItem.priority}
              </span>
            <button 
            className="delete-btn"
            onClick={(e)=>{
                e.stopPropagation();
                deleteTodo(eachItem.id);
            }}>
                Delete</button></li>
        ))}
       </ul>
    </div>
  )
}

export default TodoItem
