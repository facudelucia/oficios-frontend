import React, { useState, useEffect } from 'react'
import "./RegisterOficio.css"
import validator from "validator"
import axios from "axios"
import qs from "querystring"
import { useHistory } from 'react-router-dom'
function RegisterOficio({cuenta}) {
const history = useHistory()
const [form, setForm] = useState({
    nombre:"",
    apellido:"",
    email:"",
    password:"",
    confirmation:"",
    oficio:"",
    descripcion:"",
    phone:"",
    zona:""
})

const {nombre, apellido, email, password, confirmation, oficio, descripcion, phone, zona} = form
const [errors, setErrors] = useState({});
const [isSubmitting, setIsSubmitting] = useState(false);
const validate = (form)=>{
    let errors = {}
    if(form.nombre.trim() === ""){
        errors.nombre = "El nombre es requerido"
    }

    if(form.apellido.trim() === ""){
        errors.apellido = "El apellido es requerido"
    }

    if(!validator.isEmail(form.email)){
        errors.email= "Debes ingresar un email valido"
    }
    if(form.password.trim()==="" || form.password.length < 6){
        errors.password= "La contraseña debe tener al menos 6 caracteres"
    }
     
    if(form.password !== form.confirmation){
        errors.confirmation= "Las contraseñas deben coincidir"
    }
    if(form.phone.trim() === ""){
        errors.phone= "El numero de telefono es requerido"
    }
    if(form.zona.trim() === ""){
        errors.zona= "La zona es requerida"
    }
    if(form.oficio.trim() === ""){
        errors.oficio= "El oficio es requerido"
    }
    if(form.descripcion.trim() === ""){
        errors.descripcion= "La descripcion es requerida"
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
    nombre: nombre,
    apellido: apellido,
    email: email,
    password: password,
    description:descripcion,
    phone:phone,
    oficios:oficio,
    zona:zona
}
const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors(validate(form));
    if(Object.keys(errors).length > 0){
        console.log(errors)
        return
    }
    await axios.post("https://oficios-changas.herokuapp.com/useroficio", qs.stringify(requestBody), config)
    .then(data=>{
        alert(`Te has registrado correctamente, inicia sesión con tu cuenta de ${cuenta}`)
        history.push("/login")
    })
    .catch(err=>{
        alert("error en el registro")
    })
}
    return (
        <form onSubmit={handleSubmit} id="form" class="registerOficio__form">
<div class={errors.nombre ? "form-control error":"form-control"}>
                <label for="nombre">Nombre</label>
                <input 
                    type="text" 
                    placeholder="Nombre" 
                    id="nombre"
                    name="nombre"
                    value={nombre}
                    onChange={handleInputChange}
                />
                {errors.nombre && <><i class="fas fa-check-circle"></i>
                <i class="fas fa-exclamation-circle"></i>
                <small>{errors.nombre}</small></>}
            </div>
            <div class={errors.apellido ? "form-control error":"form-control"}>
                <label for="apellido">Apellido</label>
                <input 
                    type="text" 
                    placeholder="Apellido" 
                    id="apellido"
                    name="apellido"
                    value={apellido}
                    onChange={handleInputChange}
                />
                {errors.apellido && <><i class="fas fa-check-circle"></i>
                <i class="fas fa-exclamation-circle"></i>
                <small>{errors.apellido}</small></>}
            </div>
            <div class={errors.email ? "form-control error":"form-control"}>
                <label for="email">Email</label>
                <input 
                    type="email" 
                    placeholder="email" 
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleInputChange}
                />
                {errors.email && <><i class="fas fa-check-circle"></i>
                <i class="fas fa-exclamation-circle"></i>
                <small>{errors.email}</small></>}
            </div>
            <div class={errors.password ? "form-control error":"form-control"}>
                <label for="password">Password</label>
                <input 
                    type="password" 
                    placeholder="Password" 
                    id="password" 
                    name="password"
                    value={password}
                    onChange={handleInputChange}
                />
                {errors.password && <><i class="fas fa-check-circle"></i>
                <i class="fas fa-exclamation-circle"></i>
                <small>{errors.password}</small></>}
            </div>
            <div class={errors.confirmation ? "form-control error":"form-control"}>
                <label for="confirmation">Password check</label>
                <input 
                    type="password" 
                    placeholder="Confirma Password" 
                    id="confirmation"
                    name="confirmation"
                    value={confirmation}
                    onChange={handleInputChange}
                />
                {errors.confirmation && <><i class="fas fa-check-circle"></i>
                <i class="fas fa-exclamation-circle"></i>
                <small>{errors.confirmation}</small></>}
            </div>
            <div class={errors.phone ? "form-control error":"form-control"}>
                <label for="phone">Numero de telefono</label>
                <input 
                    type="text" 
                    placeholder="phone" 
                    id="phone"
                    name="phone"
                    value={phone}
                    onChange={handleInputChange}
                />
                {errors.phone && <><i class="fas fa-check-circle"></i>
                <i class="fas fa-exclamation-circle"></i>
                <small>{errors.phone}</small></>}
            </div>
            <div class={errors.zona ? "form-control error":"form-control"}>
                <label for="zona">Zona</label>
                <input 
                    type="text" 
                    placeholder="Zona" 
                    id="zona"
                    name="zona"
                    value={zona}
                    onChange={handleInputChange}
                />
                {errors.zona && <><i class="fas fa-check-circle"></i>
                <i class="fas fa-exclamation-circle"></i>
                <small>{errors.zona}</small></>}
            </div>
            <div class={errors.oficio ? "form-control error":"form-control"}>
                <label for="oficio">Oficio</label>
                <input 
                    type="text" 
                    placeholder="Oficio" 
                    id="oficio"
                    name="oficio"
                    value={oficio}
                    onChange={handleInputChange}
                />
                {errors.oficio && <><i class="fas fa-check-circle"></i>
                <i class="fas fa-exclamation-circle"></i>
                <small>{errors.oficio}</small></>}
            </div>
            <div class={errors.descripcion ? "form-control error":"form-control"}>
                <label for="descripcion">Descripcion</label>
                <textarea 
                    placeholder="Descripcion" 
                    id="descripcion"
                    name="descripcion"
                    value={descripcion}
                    onChange={handleInputChange}
                    className="registerOficio__textarea"
                    rows="5"
                >    
                </textarea>
                {errors.descripcion && <><i class="fas fa-check-circle"></i>
                <i class="fas fa-exclamation-circle"></i>
                <small>{errors.descripcion}</small></>}
                
            </div> 
            <button type="submit">Registrarme</button>
        </form>
    )
}

export default RegisterOficio
