import React,{useState, useEffect} from 'react'  
import {isEmpty,rest,size, toSafeInteger} from 'lodash'
import { addDocument, deleteDocument, getCollection, updateDocument } from './actions'
function App() {
  const [tarea, setTarea]= useState("") //Estado para alacenat la tarea
  const [tareas, setTareas] = useState([])//Se declara un estado tipo arreglo
  const [modoEdicion,setModoEdicion]= useState(false)//Estado para editición
  const [id,setId]= useState("")//Estado para almacenar el id en edicion
  const [error,setError]= useState(null)//Estado para manejo del error

   useEffect(() => {
     (async()=>{
       const result=await getCollection("tareas")
       if(result.statusResponse){
        setTareas(result.data)
       }
   
     })()
   }, [])

const validarFormulario=()=>{
  let esValido=true
  setError(null)
  if(isEmpty(tarea)){
    setError("Debes ingresar una tarea.")
    esValido=false
   
 }
 return esValido
}

  // Definicion de función que ejecuta la tarea del boton agregar
  const agregarTarea = async (e) => {
        e.preventDefault()
       if(!validarFormulario())
       {
        return
       }

       const result = await addDocument("tareas",{ nombre : tarea })
       if(!result.statusResponse){
         setError(result.error)
         return
       }
    
    setTareas([...tareas, {id: result.data.id, nombre: tarea}]) //se agrega la nueva tarea a la cleccion de tareas
       setTarea("")

  }
  //Método recibe el id de las tareas uy filtra la lista cargando todas las tareas, menos
  //la tarea que pertenece al id enviado 
  const eliminarTarea= async (id)=>{

    const result = await deleteDocument("tareas",id)
      if(!result.statusResponse){
      setError(result.error)
       return 
      }
    
    const tareasFiltradas=tareas.filter(tarea=>tarea.id!==id)
   setTareas(tareasFiltradas)
  }

  //Método para editar la tarea

  const editarTarea=(laTarea)=>{
    setTarea(laTarea.nombre)
    setModoEdicion(true)
    setId(laTarea.id)
  }

  //Método para guardar la tarea (modificación)
  const guardarTarea = async (e) => {
    e.preventDefault()
    if(!validarFormulario())
       {
        return
       }
   const result =  await updateDocument("tareas",id,{nombre: tarea})
   if(!result.statusResponse)
     {
        setError=result.error
        return
     }
   const tareasEditadas=tareas.map(item=>item.id===id ?{id,nombre:tarea}:item)
   setTareas(tareasEditadas)
   setModoEdicion(false)
   setTarea("")
   setId("")
  }

  return (
    
    <div className="container mt-2">

    <h1>Tareas </h1>
    <hr/>
    <div className="row">
      <div className="col-8">
        <h4 className="text-center">Lista de Tareas</h4>

        {
        size(tareas)===0 ?
        (
          <li className="list-group-item">No hay tarea agregadas.</li>
        ):(

          <ul className="list-group">
              {
             tareas.map((tarea)=>(
             <li className="list-group-item" key={tarea.id}>
              <span className="lead">{tarea.nombre}</span>
              <button
                className="btn btn-danger btn-sm float-right mx-2"
                onClick={()=>eliminarTarea(tarea.id)}
              >
                Eliminar
              </button>
              <button 
                 className="btn btn-warning btn-sm float-right"
                 onClick={()=>editarTarea(tarea)}
             >
                Editar
              </button>
           </li>
            ))
         }
         
        </ul> 
        )
          
      }
      </div>

      <div className="col-4">
      <h4 className="text-center">
        {modoEdicion ? "Modificar tarea":"Agregar tarea"}
      </h4>
        <form onSubmit={modoEdicion ? guardarTarea: agregarTarea}>
          {error && <span className="badge badge-danger text-wrap">{error}</span>}
          <input 
           type="text" 
           className="form-control mb-2"
           placeholder="Ingrese la tarea..."
           onChange={(text)=>setTarea(text.target.value)}
           value={tarea}
           />
           
           <button 
           className={modoEdicion ?"btn btn-warning btn-block": "btn btn-dark btn-block"}
           type="submit"
           >
             {modoEdicion ? "Guardar" : "Agregar"}
             </button>
        </form>
      </div>
    </div>

    </div>
  );
}

export default App;
