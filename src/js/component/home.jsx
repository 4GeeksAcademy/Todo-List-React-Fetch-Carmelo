import React, { useState,useEffect } from "react";

const Home = () => {
  const [tarea, setTarea] = useState([]);
  const [text, setText] = useState('');
  // const [createUser,setCreateUser] = useState('');
 
const handleKeyDown = (event) => {
  if (event.key === "Enter" && text.trim() !== "") {
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
    setTarea(prevTodos => prevTodos.filter(todo => todo.label !== id)); //Elimina la tarea al pulsar el boton 
    
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
    .then((response) => {
      if (response.status === 404) {
          createUser();
          return [];
      }
      return response.json();
  })
    .then((data) => setTarea(data))
    .catch(error => console.log(error))
  }
  console.log(tarea);
  

  function upDate(){
    console.log(tarea);
    fetch('https://playground.4geeks.com/apis/fake/todos/user/Carmelico92',{
      method:'PUT',
      body:JSON.stringify(tarea),
    headers:{
      "Content-Type": "application/json"
    }
    })
    .then((response) => {
      if (response.status === 404) {
          createUser();
          return tarea;
      }
      return response.json();
  })
    .then((data) => console.log(data))
    .catch((error) => {console.log(error)})
  }

  useEffect( () =>{
    // createUser()           //AL DESCOMENTAR ESTE LINEA DE CODIGO EL USUARIO SE CREA. 
       getUser()
      //  deleteUser()        // AL DESCOMENTAR ESTA LINEA DE CODIGO EL USUARIO SE ELIMINA.
  
 },[])

  useEffect( () =>{
    if (tarea.length > 0){
      upDate()  
    } 
   
  },[tarea])

  function deleteUser(){
    fetch ('https://playground.4geeks.com/apis/fake/todos/user/Carmelico92',{
      method: 'DELETE',
      headers:{
        "Content-Type": "application/json"
      }
    })
  }

  return (
    <><h1 className="text-center">todos</h1>
    <div className="container col-5 ">
      <input
        value={text}
        onChange={(event) => setText(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Escribe tu tarea aquí..." />

      <ul className="bg-white">
        {tarea.length > 0 ?  tarea.map(item => (
          <li className="border-bottom list-group-item d-flex justify-content-between align-items-center container-btnDelete" key={item.label}>
            {item.label}
            <button onClick={() => handleDelete(item.label)} className="btnDelete">🗙</button>
          </li>
        )) : "No hay tareas, añade alguna."}
        <div className="count m-">{tarea.length} item left</div>
      </ul>
    </div></>
  );
};

export default Home;




