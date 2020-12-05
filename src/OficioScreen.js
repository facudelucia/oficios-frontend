import React from 'react'
import "./OficioScreen.css"
function OficioScreen({img, nombre, apellido, oficios, zona, description, phone}) {
    return (
      <>
        <div class="oficiouser">
      <section class="movie_image">
        <img class="movie_poster" src={`https://oficios-changas.herokuapp.com/imagen/usuarios/${img}`} />
      </section>

      <section class="center">
        <div class="about_movie">
          <h3>{nombre} {apellido}</h3>
          <div class="movie_info">
            <p>{oficios}</p>
            <p className="oficiouser__zona"><i class="fas fa-map-marker-alt"></i> {zona}</p>
          </div>
          <div class="movie_desc">
            <p>{description}</p>
          </div>
          <div class="watch"><i class="fab fa-whatsapp"></i> {phone}</div>
        </div>
      </section>
    </div>
      </>
        
    )
}

export default OficioScreen
