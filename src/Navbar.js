import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "./Navbar.css"
import { useStateValue } from './StateProvider'
function Navbar() {
    const handleMenuClick = () => {
        const items = document.querySelector(".nav-items")
    const menuBtn = document.querySelector(".menu-icon span")
    const cancelBtn = document.querySelector(".cancel-icon")
    const searchBtn = document.querySelector(".search-icon")
    const form = document.querySelector("form")
        items.classList.add("active")
        menuBtn.classList.add("hide")
        searchBtn.classList.add("hide")
        cancelBtn.classList.add("show")
    }
    const handleCancel = () => {
        const items = document.querySelector(".nav-items")
    const menuBtn = document.querySelector(".menu-icon span")
    const cancelBtn = document.querySelector(".cancel-icon")
    const searchBtn = document.querySelector(".search-icon")
    const form = document.querySelector("form")
        items.classList.remove("active")
        menuBtn.classList.remove("hide")
        searchBtn.classList.remove("hide")
        cancelBtn.classList.remove("show")
        cancelBtn.style.color = "#ff3d00"
        form.classList.remove("active")
    }
    const handleSearch = () => {
        const items = document.querySelector(".nav-items")
    const menuBtn = document.querySelector(".menu-icon span")
    const cancelBtn = document.querySelector(".cancel-icon")
    const searchBtn = document.querySelector(".search-icon")
    const form = document.querySelector("form")
        form.classList.add("active")
        searchBtn.classList.add("hide")
        cancelBtn.classList.add("show")
    }
    const [{searchOficio}, dispatch]=useStateValue()
    const [form, setForm] = useState({
        search:""
    })
    const {search} = form
    const handleInputChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if(search.trim()==="") return
        dispatch({
            type:"SEARCH_OFICIO",
            searchOficio: search
        })
        setForm({
            search:""
        })
    }
    return (
        <nav>
            <div className="menu-icon">
                <span onClick={()=>handleMenuClick()} className="fas fa-bars"></span>
            </div>
            <div className="logo">
                Oficios Changas Rosario
            </div>
            <div className="nav-items">
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
            </div>
            <div className="search-icon" onClick={()=>handleSearch()}>
                <span className="fas fa-search"></span>
            </div>
            <div className="cancel-icon" onClick={()=>handleCancel()}>
                <span className="fas fa-times"></span>
            </div>
            <form onSubmit={handleSubmit}>
                <input onChange={handleInputChange} type="search" placeholder="Busca por oficio, ej: Albañileria" className="search-data" name="search" value={search}/>
                <button type="submit" class="fas fa-search"></button>
            </form>
        </nav>
    )
}

export default Navbar
