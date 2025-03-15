import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { FaRegEdit } from "react-icons/fa";
import Navbar from './components/Navbar'
import { MdDeleteOutline } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [count, setCount] = useState(0)

  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showfinished, setshowfinished] = useState(true)

  const savetoLS = (first) => { 
    localStorage.setItem ("todos",JSON.stringify(todos))
   }
   
  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }

  }, [])
  
  const handleAdd = () =>{
    settodos([...todos,{id:uuidv4(), todo, isCompleted:false}])
    settodo("")
    // console.log(todos);
    savetoLS();
  }

  const toggleFinished = (e) => { 
    setshowfinished(!showfinished)
   }

  const handleEdit = (e,id) =>{
    let t = todos.filter(item=>
      item.id === id
      // setTodo(t[0].todo)
    )
    settodo(t[0].todo)
    savetoLS();
  }

  const handleChange = (e) =>{
      settodo(e.target.value)
  }

  const handleDelete = (e, id) =>{
    // let id = e.target.name;
    // console.log(`the id is ${id}`);
    let index = todos.findIndex(item=>{
      return item.id === id;
    })
    let newTodos = todos.filter(item=>{
      return item.id!=id
    });
    settodos(newTodos)
    savetoLS();
  }

  const handleCheckbox = (ele) => {
    let id = ele.target.name;
    let index = todos.findIndex(item=>{
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    settodos(newTodos)
  }

  return (
    <>
    <Navbar/>
    <div className="container bg-amber-100 md:mx-auto my-5 rounded-xl p-5 min-h-[70vh] text  md:w-1/2">
    <div className="addTodo">
      <h2 className=' text-lg font-bold'>Add a todo</h2>
      <input onChange={handleChange}  value={todo} className=' bg-white  md:w-3/4' type="text"/> 
      <button onClick={handleAdd} disabled={todo.length<3} className=' disabled:bg-amber-300 bg-amber-500 hover:bg-amber-700 p-7 py-0.5 mx-3 rounded-md font-bold text-sm'><FaSave /></button>
    </div>
    <input type="checkbox" onChange={toggleFinished} name="" id="" checked={showfinished}/> Show Finished
      <h2 className=' text-lg font-bold'>Your Todo</h2>

      {/* {todos.length ==0 && <div>No todos to dsiplay<div/> } */}
      {todos.map(item=>{

     return (showfinished || !item.isCompleted) && <div key={item.id} className="todos flex justify-between  md:w-1/2">
      <input name={item.id}  onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
      <div className={item.isCompleted?" line-through": ""}>{item.todo}</div>
      <div className="buttons">
        <button onClick={(e)=>handleEdit(e, item.id)} className=' bg-amber-500 hover:bg-amber-700 p-7 py-0.5 mx-3 rounded-md font-bold text-sm'><FaRegEdit /></button>
        <button onClick={(e)=>handleDelete(e, item.id)} className=' bg-amber-500 hover:bg-amber-700 p-7 py-0.5 mx-3 rounded-md font-bold text-sm'><MdDeleteOutline /></button>
      </div>

    </div>
       })}
    </div>
    
    </>
  )
}

export default App
