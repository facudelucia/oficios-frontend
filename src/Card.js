import React from 'react'
import "./Card.css"
import { useStateValue } from './StateProvider'

function Card({id, nombre, apellido, oficios, description, img}) {
    const [{oficioId}, dispatch] = useStateValue()
    const handleClick = () => {
        dispatch({
            type: "OFICIO_ID",
            oficioId: id
        })
    }
    const cutDescription = description.substr(0, 60)
    return (
        <div class="card">
            <h2>{nombre} {apellido}</h2>
            <div class="title title--epic">{oficios}</div>
            <div class="desc">{cutDescription}...</div>
            <div>
                {
                    img ? <img class="card-img" src={`https://oficios-changas.herokuapp.com/imagen/usuarios/${img}`} /> : <img className="card-img" src={"./assets/avatar.jpg"} />
                }
                
            </div>
                <button onClick={handleClick} class="actions__trade">Ver mas</button>
        </div>
    )
}

export default Card
