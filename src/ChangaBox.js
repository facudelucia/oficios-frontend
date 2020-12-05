import React from 'react'
import "./ChangaBox.css"
function ChangaBox({title, description, remuneracion, nombre, phone, zona}) {
    return (
        <div className="changaBox">
            <h4 className="changaBox__title">{title}</h4>
            <p className="changaBox__description">{description}</p>
            <p className="changaBox__zone"><i class="fas fa-map-marker-alt"></i> {zona}</p>
            <div className="changaBox__footer">
                <p>$ {remuneracion}</p>
                <p> <span className="changaBox__phone"><i class="fab fa-whatsapp"></i> {phone}</span> - {nombre}</p>   
            </div>
            
        </div>
    )
}

export default ChangaBox
