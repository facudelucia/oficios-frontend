import React, { useEffect, useState } from 'react'
import "./OficioUser.css"
import axios from "axios"
import { useStateValue } from './StateProvider'
import OficioScreen from './OficioScreen'
function OficioUser() {
  const [{oficioId}, dispatch]=useStateValue()
  const [user, setUser] = useState({
    nombre:"",
    apellido:"",
    description:"",
    img:"",
    oficios:"",
    phone:"",
    zona:""
  })
  const {nombre, apellido, description, img, oficios, phone, zona} = user
  useEffect(() => {
    const getOficio = async()=>{
      await axios.get(`https://oficios-changas.herokuapp.com/useroficio/${oficioId}`)
        .then(data=>{
          setUser({
            nombre: data.data.user.nombre,
            apellido: data.data.user.apellido,
            description: data.data.user.description,
            img: data.data.user.img,
            oficios: data.data.user.oficios,
            phone:data.data.user.phone,
            zona: data.data.user.zona
          })
        })
    }
    getOficio()
  }, [])
  const handleClick = () => {
    dispatch({
      type:"RETURN"
    })
  }
  return (
    <div className="oficiouser__back">
    <div onClick={handleClick} className="oficiouser__return">
      Volver
    </div>
    <OficioScreen 
      nombre={nombre}
      apellido={apellido}
      description={description}
      img={img}
      oficios={oficios}
      phone={phone}
      zona={zona}
    />
    </div>
  )
}

export default OficioUser
