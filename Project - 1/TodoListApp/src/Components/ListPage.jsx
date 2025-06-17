import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import './DarkLight.css'

const ListPage = (props) => {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(true)
  let [zStyle, setZStyle] = useState({zIndex: "-1"})
  const InputAdd = (e)=>{
    if(e.key === "Enter"){
      handleAdd();
    }
  }
  useEffect(() => {
    let checkSavedTodos = localStorage.getItem("SavedTodos")
    if (checkSavedTodos) {
      let retrivedTodos = JSON.parse(localStorage.getItem("SavedTodos"));
      setTodos(retrivedTodos)
    }
  }, [])
  const saveToLs = () => {
    localStorage.setItem("SavedTodos", JSON.stringify(todos));
  }
  const handleChange = (e) => {
    setTodo(e.target.value)
  }
  const handleEdit = (id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos);
  }
  // delete todo
  const handleDel = (id) => {
    if (window.confirm("Do you really want to delete!") === false) {
      return
    }
    let newTodos = [...todos].filter(item => {
      return item.id !== id
    });
    setTodos(newTodos);
    saveToLs();
  }
  //add todo
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: true }]);
    setTodo("");
    saveToLs();
  }
  //add line-through
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLs();
    if(!todos[index].isCompleted){
      setZStyle({zIndex: "4"})
    }
    setTimeout(() => {
      setZStyle({zIndex: "-1"})
    }, 3000);
  }
  //   toggle to show finished task
  const toggleFinished = () => {
    setShowFinished(!showFinished)
  }
  return (
    <>
    <div className="body-3">
      <div className= {`todo_container relative w-[60vw] min-h-[80vh] p-[10px] rounded-[10px] flex flex-col gap-[10px] justify-start items-center max-md:w-[97%] ${props.mode === 'light'?'todo_light':'todo_dark'}`}>
        <h2>All Todos</h2>
        <div className="Todo_add_container flex gap-[20px] w-full justify-center">
          <input type="" onChange={handleChange} onKeyUp={InputAdd} id="Input-Add" value={todo} className="todo_add_input" />
          <button onClick={handleAdd} disabled={todo.length < 3}  className={`todo-add h-[2em] w-[2em] rounded-[10em] text-[19px] font-[600] cursor-pointer ${props.mode === 'light'?'todo-add-drop-light':'todo-add-drop-dark'}`}>+</button>
          <button onClick={toggleFinished} value={showFinished} className={`todo-caret h-[2em] w-[2em] rounded-[10px] text-[17px] font-[500] cursor-pointer ${props.mode === 'light'?'todo-add-drop-light':'todo-add-drop-dark'}`}>{showFinished ? <i className="fa-solid fa-square-caret-up"></i> : <i className="fa-solid fa-square-caret-down"></i>}</button>
        </div>

        <h2 className=''>Your todos</h2>
        {/* second part */}
        <div className="collection_todos flex items-center w-full gap-[10px]">
          {/* when there is no todos */}
          {todos.length === 0 && <h3 className=''>No todos to display</h3>}
          {/* when there is todos */}
          <div className="todo_container_width w-full flex flex-col">
            {todos.map((item) => {

              return (showFinished || item.isCompleted) && <div key={item.id} className="">
                {/* checkbox */}
                <div className="xxx flex justify-evenly gap-[10px]">
                  <input className='todo-check mr-1 w-6 h-6 bg-[#16151c] cursor-pointer rounded-[4px] border-2 border-[#333]' name={item.id} value={false} onChange={handleCheckbox} type="checkbox" />

                  {/* todos */}
                  <div className={`todo-list ${item.isCompleted ? "" : "line-through"} ${props.mode === 'light'?'todo-list-light':'todo-list-dark'}`} > {item.todo} </div>

                  {/* buttons */}
                  <button onClick={() => { handleEdit(item.id) }} className={`Todo-edit-btn ${props.mode === 'light'?'todo-edit-del-light':'todo-edit-del-dark'}`}><i className="fa-solid fa-pen-to-square"></i></button>
                  <button onClick={() => { handleDel(item.id) }} className={`Todo-del-btn ${props.mode === 'light'?'todo-edit-del-light':'todo-edit-del-dark'}`}><i className="fa-solid fa-trash-can"></i></button>
                </div>
              </div>
            })}
          </div>
        </div>
      </div>
    </div>
    <div id='congrats' style={zStyle}>C o n g r a t s <i>&#127881;&#127882;&#127881;&#127882;&#127881;&#127882;</i></div>
    </>
  )
}

export default ListPage