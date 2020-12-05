import React, { useEffect, useState } from 'react'
import "./FormEditOficio.css"
import axios from "axios"
import { useStateValue } from './StateProvider'
import qs from "querystring"
import FormEditChanga from './FormEditChanga'
import { useHistory } from 'react-router-dom'
function FormEditUserChanga() {
    const history = useHistory()
    const [{ token, userId }, dispatch] = useStateValue()
    const [datos, setDatos] = useState({
        nombre: "",
        apellido: "",
        phone: "",
        zona: "",
    })
    
    const {nombre, apellido, phone, zona} = datos

    const getDatos = async () => {
        await axios.get(`https://oficios-changas.herokuapp.com/userchanga/${userId}`)
            .then(data => {
                datos.nombre = data.data.user.nombre
                datos.apellido = data.data.user.apellido
                datos.phone = data.data.user.phone
                datos.zona = data.data.user.zona
            })
    }

    useEffect(() => {
        getDatos()
    }, [])
   const handleInputChange = (e) => {
       setDatos({
           ...datos,
           [e.target.name]:e.target.value
       })
   }
   const requestBody = {
    nombre: nombre,
    apellido: apellido,
    phone:phone,
    zona:zona
}
const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'token':token
    }
  }
   const handleSubmit = async (e) => {
       e.preventDefault()
       await axios.put(`https://oficios-changas.herokuapp.com/useroficio/${userId}`, qs.stringify(requestBody), config)
        .then(data=>{
            alert("datos actualizados")
        })
   }
   const handleLogout = () => {  
       dispatch({
           type:"LOGOUT"
       })
       history.push("/")
   }
   const handleDeleteAccount = async () => {
       await axios.delete(`https://oficios-changas.herokuapp.com/userchanga/${userId}`)
        .then(
            data=>{
                alert("cuenta eliminada")
            }
        )
        history.push("/")
   }
    return (
        <>
        <div className="formEditOficio">
            <div className="formEditOficio__header">
                <h1>Editar Perfil</h1>
                <button 
                    onClick={handleLogout}
                className="formEditOficio__logout">Cerrar Sesion <i class="fas fa-door-open"></i></button>
            </div>

            <form onSubmit={handleSubmit}>
            <div className="formEditOficio__form-control">
              <label>Nombre</label>
              <input 
                type="text"
                name="nombre"
                value={nombre}
                onChange={handleInputChange}
                className="formEditOficio__input"
              />
            </div>
            
            <div className="formEditOficio__form-control">
              <label>Apellido</label>
              <input 
                type="text"
                name="apellido"
                value={apellido}
                onChange={handleInputChange}
                className="formEditOficio__input"
              />
            </div>
            <div className="formEditOficio__form-control">
              <label>Teléfono</label>
              <input 
                type="text"
                name="phone"
                value={phone}
                onChange={handleInputChange}
                className="formEditOficio__input"
              />
            </div>
            <div className="formEditOficio__form-control">
              <label>Zona</label>
              <input 
                type="text"
                name="zona"
                value={zona}
                onChange={handleInputChange}
                className="formEditOficio__input"
              />
            </div>
            <button 
                className="formEditOficio__submit"
            type="submit">Guardar</button>
            </form>
            <FormEditChanga />
        </div>
        <button 
            onClick={handleDeleteAccount}
        className="formEditOficio__deleteAccount">Eliminar Cuenta <i class="fas fa-trash"></i></button>
        </>
    )
}

export default FormEditUserChanga
