import React,{useState} from 'react'
import "./Login.css"
import axios from "axios"
import qs from "querystring"
import validator from "validator"
import { useStateValue } from './StateProvider'
import { useHistory } from 'react-router-dom'
function Login() {
    const history = useHistory()
    const [{token, userId}, dispatch]=useStateValue()
    const [form, setForm] = useState({
        email:"",
        password:""
    })
    const {email, password} = form
    const [errors, setErrors] = useState([]);
    const validate = (form)=>{
        let errors = {}

        if(!validator.isEmail(form.email)){
            errors.email= "Debes ingresar un email valido"
        }
        if(form.password.trim()===""){
            errors.password= "La contraseña es requerida"
        }
        return errors
    }
    const handleInputChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }
    const requestBody = {
        email: email,
        password: password,
    }
    const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    const handleLoginOficio = async (e) => {
        e.preventDefault()
        setErrors(validate(form))
        await axios.post("https://oficios-changas.herokuapp.com/loginoficio", qs.stringify(requestBody), config)
        .then(data=>{
            dispatch({
                type:"LOGIN",
                token:data.data.token,
                userId:data.data.usuario._id
            })
            history.push("/edituseroficio")
        })
        .catch(err=>{
            alert("Error en el inicio de sesión")
        }) 
        
    }
    const handleLoginChanga= async (e) => {
        e.preventDefault()
        setErrors(validate(form))
        await axios.post("https://oficios-changas.herokuapp.com/loginchanga", qs.stringify(requestBody), config)
        .then(data=>{
            dispatch({
                type:"LOGIN",
                token:data.data.token,
                userId:data.data.usuario._id
            })
            history.push("/edituserchanga")
        })
        .catch(err=>{
            alert("Error en el inicio de sesión")
        })

    }
    return (
        <div className="login__back">
           <div className="login">
            <h1>Iniciar Sesión
            </h1>
            <form>

            <div class={errors.email ? "login__inputSection error":"login__inputSection"}>
                <i className="login__icon fas fa-user"></i>
                <input 
                    type="email"
                    className="login__input"
                    name="email"
                    value={email}
                    onChange={handleInputChange}
                />
            {errors.email &&
                <i class="fas fa-exclamation-circle"></i>}
                </div>         
                {errors.email &&<small>{errors.email}</small>}


                <div class={errors.password ? "login__inputSection error":"login__inputSection"}>
                <i className="login__icon fas fa-lock"></i>
                <input 
                    type="password"
                    className="login__input"
                    name="password"
                    value={password}
                    onChange={handleInputChange}
                />
                {errors.password && 
                <i class="fas fa-exclamation-circle"></i>}
                </div>         
                {errors.password &&<small>{errors.password}</small>}
                <div 
                    onClick={handleLoginOficio}
                    className="login__button"
                >
                    Iniciar sesión con cuenta de oficio
                </div>
                <div 
                    onClick={handleLoginChanga}
                    className="login__button secondary"
                >
                    Iniciar sesión con cuenta de changa
                </div>
            </form>
        </div> 
        </div>
        
    )
}

export default Login
