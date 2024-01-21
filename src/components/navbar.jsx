import './nav.css'
import { Link, NavLink } from 'react-router-dom';
import React, { useState } from 'react';
export const Navbar = () => {
  const [menuopen,setmenu] = useState(false)
  window.addEventListener("scroll", ()=>{
    var nav = document.querySelector("nav")
    nav.classList.toggle("change",window.scrollY>0)
  })
  return(
    <nav>
      <Link to="/" className='title'>Inicio</Link>
      <div className='menu' onClick={()=>{
          setmenu(!menuopen);
        }}>
        <i className='bx bx-menu'></i>
          <span></span>
          <span></span>
      </div>
      <ul className={menuopen ? 'open' : ''}>
        <li><NavLink to="/cpm">CPM</NavLink></li>
        <li><NavLink to="/pert">PERT</NavLink></li>
        <li><NavLink to="/modelo-inventario">M. Inventario</NavLink></li>
        <li><NavLink to="/teoria-decisiones-certidumbre">T. Decisiones C.</NavLink></li>
        <li><NavLink to="/teoria-decisiones-incertidumbre">T. Decisiones I.</NavLink></li>
        <li><NavLink to="/arbol-decisiones">Árbol de Decisiones</NavLink></li>
        <li><NavLink to="/teoria-colas">Teoria de Colas</NavLink></li>
        <li><NavLink to="/simulacion-montecarlo">Simulación de Montecarlo</NavLink></li>
        <li><NavLink to="/programacion-cuadratica">Programación Cuadrática</NavLink></li>
        {/*<li><NavLink to="/teoriadedecision">Teoría de Desiciones</NavLink></li>*/}
      </ul>
    </nav>
  )
}
