import React, { useEffect } from 'react'
import ChangaBox from './ChangaBox'
import "./Changas.css"
import axios from "axios"
import { useStateValue } from './StateProvider'
function Changas() {
    const [{changas}, dispatch] = useStateValue()
    useEffect(() => {
        const getChangas = async () =>{
            await axios.get("https://oficios-changas.herokuapp.com/getallchangas")
            .then(data=>{

                dispatch({
                    type: "GET_CHANGAS",
                    changas: data.data.changas
                })
            })
        }
        getChangas()
    }, [])
    return (
        <div className="changas">
                <h2>Changas</h2>
            <div className="changas__container">
                {changas.map(changa => (
                    <ChangaBox 
                        title={changa.title}
                        description={changa.description}
                        remuneracion={changa.remuneracion}
                        nombre={changa.creador.nombre}
                        phone={changa.creador.phone}
                        zona={changa.creador.zona}
                    />
                ))}
            </div>
        </div>
    )
}

export default Changas
