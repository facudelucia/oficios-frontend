import React, { useEffect, useState } from 'react'
import "./FormEditOficio.css"
import axios from "axios"
import { useStateValue } from './StateProvider'
import qs from "querystring"
import { useHistory } from 'react-router-dom'
function FormEditOficio() {
    const history = useHistory()
    const [{ token, userId }, dispatch] = useStateValue()
    const [datos, setDatos] = useState({
        nombre: "",
        apellido: "",
        oficios: "",
        descripcion: "",
        phone: "",
        zona: "",
    })
    
    const {nombre, apellido, oficios, descripcion, phone, zona} = datos
    const [img, setImg] = useState("")
    const getDatos = async () => {
        await axios.get(`https://oficios-changas.herokuapp.com/useroficio/${userId}`)
            .then(data => {
                datos.nombre = data.data.user.nombre
                datos.apellido = data.data.user.apellido
                datos.oficios = data.data.user.oficios
                datos.descripcion = data.data.user.description
                datos.phone = data.data.user.phone
                datos.zona = data.data.user.zona
                setImg(data.data.user.img)
            })
    }
    useEffect(() => {
            getDatos()
    }, [datos.img])
    const handlePictureClick = () => {
        document.querySelector("#fileSelector").click()
    }
    var formData = new FormData()
    const headers = {
        'Content-Type': 'multipart/form-data'
    }
    const handleFileChange = async (e) => {
        const file = e.target.files[0]
        if (file) {
            formData.append("archivo", file)
            await axios.put(`https://oficios-changas.herokuapp.com/upload/usuarios/${userId}`, formData, headers)
                .then(data => {
                    alert("foto de perfil actualizada")
                })
            getDatos()

        }
    }
   const handleInputChange = (e) => {
       setDatos({
           ...datos,
           [e.target.name]:e.target.value
       })
   }
   const requestBody = {
    nombre: nombre,
    apellido: apellido,
    description:descripcion,
    phone:phone,
    oficios:oficios,
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
            alert("Datos actualizados")
        })
   }
   const handleLogout = () => {  
       dispatch({
           type:"LOGOUT"
       })
       history.push("/")
   }
   const handleDeleteAccount = async () => {
       await axios.delete(`https://oficios-changas.herokuapp.com/useroficio/${userId}`)
        .then(
            data=>{
                alert("Cuenta eliminada")
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
            
            <div className="formEditOficio__form-img">
            {
                img ? <img src={`https://oficios-changas.herokuapp.com/imagen/usuarios/${img}`} className={"formEditOficio__img"}/>: <img src={"./assets/avatar.jpg"} className={"formEditOficio__img"}/>
             }
            <input
                id="fileSelector"
                type="file"
                name="file"
                style={{ display: "none" }}
                onChange={handleFileChange}
            />
            <button
                className="formEditOficio__changeImg"
                onClick={handlePictureClick}
            >{!img ? "Agregar foto de perfil" : "Cambiar foto de perfil"}</button>
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
              <label>Oficios</label>
              <input 
                type="text"
                name="oficios"
                value={oficios}
                onChange={handleInputChange}
                className="formEditOficio__input"
              />
            </div>
            <div className="formEditOficio__form-control">
              <label>Descripcion</label>
              <textarea
                name="descripcion"
                value={descripcion}
                onChange={handleInputChange}
                className="formEditOficio__textarea"    
                rows="5"
            >
                
              </textarea>
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
        </div>
        <button 
            onClick={handleDeleteAccount}
        className="formEditOficio__deleteAccount">Eliminar Cuenta <i class="fas fa-trash"></i></button>
        </>
    )
}

export default FormEditOficio
