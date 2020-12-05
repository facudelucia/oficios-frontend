import React, { useState } from 'react'
import RegisterChanga from './RegisterChanga'
import RegisterOficio from './RegisterOficio'
import "./RegisterScreen.css"
function RegisterScreen() {
    const [tipo, setTipo] = useState("oficio")
    const handleChangeOficio = (e) => {
       setTipo(e.target.value)
    }
    const handleChangeChanga = (e) => {
        setTipo(e.target.value)
     }
    return (
        <div className="registerScreen">
            <h1>Crear una cuenta de {tipo}</h1>
            <div className="registerScreen__inputRadio">
                <input 
                    className="registerScreen__input" 
                    type='radio' 
                    value='oficio' 
                    name='tipoCuenta' 
                    id='oficio'
                    onChange={handleChangeOficio}
                    checked={tipo === "oficio"}
                />
                <label className="registerScreen__inputRadioLabel" htmlFor='oficio'>Quiero ofrecer mi oficio</label>

                <input 
                    className="registerScreen__input" 
                    type='radio' 
                    value='changa' 
                    name='tipoCuenta'
                    onChange={handleChangeChanga}
                    id='changa'
                    checked={tipo==="changa"}
                />
                <label className="registerScreen__inputRadioLabel" htmlFor='changa'>Quiero crear changas</label>
            </div>
            {
                tipo === "oficio" &&
                <RegisterOficio 
                    cuenta={tipo}
                />

            }
            {
                tipo === "changa" &&
                <RegisterChanga
                    cuenta={tipo}
                />
            }
            
        </div>
    )
}

export default RegisterScreen
