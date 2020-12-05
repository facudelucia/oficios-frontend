import React, { useEffect, useState } from 'react'
import { useStateValue } from './StateProvider'
import axios from "axios"
import OficioScreen from './OficioScreen'
function SearchScreen() {
    const [{searchOficio}, dispatch]=useStateValue()
    const [usuarios, setUsuarios] = useState([])
    useEffect(() => {
        const searchOficios = async() =>{
            await axios.get(`https://oficios-changas.herokuapp.com/useroficio/buscar/${searchOficio}`)
                .then(data=>{
                    setUsuarios(data.data.usuarios)
                })
        }
        searchOficios()
    }, [searchOficio])
    const handleClick = () => {
        dispatch({
          type:"RETURN"
        })
      }
    return (
        <div className="oficiouser__back">
        <div className="searchScreen">
            {usuarios.map(usuario=>(
                <OficioScreen 
                    nombre={usuario.nombre}
                    apellido={usuario.apellido}
                    description={usuario.description}
                    oficios={usuario.oficios}
                    img={usuario.img}
                    zona={usuario.zona}
                    phone={usuario.phone}
                />
            ))}
            {
                (usuarios.length === 0) &&
                <div className="oficioScreen__notFound"><h4>No hay perfiles con el oficio solicitado</h4></div>
                
            }
        </div>
        <div onClick={handleClick} className="oficiouser__return">
            Volver
        </div>
        </div>
    )
}

export default SearchScreen
