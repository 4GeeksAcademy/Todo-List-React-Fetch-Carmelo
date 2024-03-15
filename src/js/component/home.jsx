import React, { useState,useEffect } from "react";

const Home = () => {
  const [tarea, setTarea] = useState([]);
  const [text, setText] = useState('');
  // const [createUser,setCreateUser] = useState('');
 
const handleKeyDown = (e) => {
  if (e.key === "Enter" && text.trim() !== "") {
    setTarea((prevTodos) =>
      prevTodos.concat({
        label: text,
        done: false
      })
    );
    setText("");
  }
};

  const handleDelete = (id) => { 
    setTarea(prevTodos => prevTodos.filter(todo => todo.id !== id)); //Elimina la tarea al pulsar el boton 
    
  };


  function createUser(){
    fetch('https://playground.4geeks.com/apis/fake/todos/user/Carmelico92',{
      method:'POST',
      body: JSON.stringify([]),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch(error => console.log(error))
  }

  function getUser(){
    fetch('https://playground.4geeks.com/apis/fake/todos/user/Carmelico92',{
      method:'GET'
    })
    .then((response) => response.json())
    .then((data) => setTarea(data))
    .catch(error => console.log(error))
  }
  console.log(tarea);
  
    
  useEffect( () =>{
    // createUser()
   
    getUser()
  
 },[])

  function upDate(){
    console.log(tarea);
    fetch('https://playground.4geeks.com/apis/fake/todos/user/Carmelico92',{
      method:'PUT',
      body:JSON.stringify(tarea),
    headers:{
      "Content-Type": "application/json"
    }
    })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => {console.log(error)})
  }


  useEffect( () =>{
    if (tarea.length > 0){
      upDate()  
    } 
   
  },[tarea])

  return (
    <><h1 className="text-center">todos</h1>
    <div className="container col-5 ">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Escribe tu tarea aquí..." />

      <ul className="bg-white">
        {tarea.length > 0 ?  tarea.map(item => (
          <li className="border-bottom list-group-item d-flex justify-content-between align-items-center container-btnDelete" key={item.id}>
            {item.label}
            <button onClick={() => handleDelete(item.id)} className="btnDelete">🗙</button>
          </li>
        )) : "No hay tareas, añade alguna."}
        <div className="count m-">{tarea.length} item left</div>
      </ul>
    </div></>
  );
};

export default Home;




