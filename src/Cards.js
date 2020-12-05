import React, { useEffect } from 'react'
import Card from './Card'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Cards.css"
import axios from "axios"
import { useStateValue } from './StateProvider';
function Cards() {
  const [{oficios}, dispatch] = useStateValue()
  useEffect(() => {
    const getOficios = async ()=>{
      await axios.get("https://oficios-changas.herokuapp.com/useroficio?limite=6")
        .then(data=>{
 
          dispatch({
            type: "GET_OFICIOS",
            oficios: data.data.usuarios
          })
        })
    }
    getOficios()
  }, [])
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
              breakpoint: 576,
              settings: { slidesToShow: 1, slidesToScroll: 1, infinite:true }
            },
            {
              breakpoint: 768,
              settings: { slidesToShow: 2, slidesToScroll: 2, infinite:true }
            },
            {
              breakpoint: 1024,
              settings: { slidesToShow: 3, slidesToScroll: 3, infinite:true }
            }
          ]
      };
    return (
        <div className="Cards">
            <h2>Personas con oficios</h2>

                <Slider {...settings} className="Cards__slider">
                    {oficios.map(oficio=>(
                      <Card 
                        nombre={oficio.nombre}
                        apellido={oficio.apellido}
                        oficios={oficio.oficios}
                        description={oficio.description}
                        img={oficio.img}
                        id={oficio._id}
                      />
                    ))}
                </Slider>

        </div>
    )
}

export default Cards
