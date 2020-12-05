import React,{useState, useEffect} from 'react'
import { useStateValue } from './StateProvider'
import axios from "axios"
import "./FormEditChanga.css"
import qs from "querystring"
function FormEditChanga() {
    const [{token, userId}, dispatch]=useStateValue()
    const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'token':token
        }
      }
    const [changas, setChangas] = useState([])
    const [nueva, setNueva] = useState(false)
    const [form, setForm] = useState({
        title:"",
        description:"",
        remuneracion:""
    })
    const { title, description, remuneracion} = form
    const getChangas = async () =>{
            await axios.get(`https://oficios-changas.herokuapp.com/getuserchangas`, config)
                .then(data=>{

                    setChangas(data.data.changas)
                })
        }
    useEffect(() => {
        getChangas()
    }, [])
    const handleInputChange=(e)=>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }
    const handleDelete = async (id) => {
        await axios.delete(`https://oficios-changas.herokuapp.com/deletechanga/${id}`, config)
            .then(data=>{
 
                getChangas()
            })
    }
   const handleNew = () => {
       setNueva(!nueva)
   }
   const requestBody = {
        title:title,
        description:description,
        remuneracion:remuneracion
    }
   const handleSubmit = async(e) => {
    e.preventDefault()
    await axios.post(`https://oficios-changas.herokuapp.com/createchanga`, qs.stringify(requestBody), config)
    .then(data=>{
        getChangas()
        setForm({
            title:"",
            description:"",
            remuneracion:""
        })
    })
   }
    return (
        <div>
            <h2>Mis changas</h2>
            <div className="formEditChanga">
                   {  changas.map(changa=>(
                         <div className="formEditChanga__box">
                             <div className="formEditChanga__boxSection">
                                <h4>{changa.title}</h4>
                                <p>{changa.description}</p>
                                <p>{changa.remuneracion}</p> 
                             </div>
                            
                             <button className="formEditChanga__boxDelete" onClick={()=>handleDelete(changa._id)}><i class="fas fa-trash"></i></button>
                         </div> 
                        ))
                 }
            </div>
            <button className="formEditChanga__new" onClick={handleNew}>Crear nueva changa  <i class="fas fa-plus"></i></button>
            {
                nueva &&
                <form className="formEditChanga__form" onSubmit={handleSubmit}>
                    <div className="formEditChanga__form-control">
                     <label>Titulo</label>
                    <input 
                        type="text"
                        name="title"
                        value={title}
                        onChange={handleInputChange}
                        className="formEditChanga__input"
                    />   
                    </div>
                    <div className="formEditChanga__form-control">
                      <label>Descripcion</label>
                    <input 
                        type="text"
                        name="description"
                        value={description}
                        onChange={handleInputChange}
                        className="formEditChanga__input"
                    />  
                    </div>
                    <div className="formEditChanga__form-control">
                      <label>Remuneracion</label>
                    <input 
                        type="text"
                        name="remuneracion"
                        value={remuneracion}
                        onChange={handleInputChange}
                        className="formEditChanga__input"
                    />  
                    </div>
                    
                    <button className="formEditChanga__submit" type="submit">Crear</button>
                </form>
            }
        </div>
    )
}

export default FormEditChanga
