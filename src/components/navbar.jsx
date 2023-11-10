import './nav.css'
import { Link, NavLink } from 'react-router-dom';
import React, { useState } from 'react';
export const Navbar = () => {
  const [menuopen,setmenu] = useState(false)
  return(
    <nav>
      <Link to="/EstimaciondeTiempo" className='title'>Inicio</Link>
      <div className='menu' onClick={()=>{
          setmenu(!menuopen);
        }}>
        <i className='bx bx-menu'></i>
          <span></span>
          <span></span>
      </div>
      <ul className={menuopen ? 'open' : ''}>
        <li><NavLink to="/EstimaciondeTiempo/cpm">CPM</NavLink></li>
        <li><NavLink to="/EstimaciondeTiempo/pert">PERT</NavLink></li>
        {/*<li><NavLink to="/decision">DECISION THEORY</NavLink></li>
        <li><Link to="/m-inventario">M.Inventario</Link></li>
        <li><Link to="/t-desiciones">T.Desiciones</Link></li>
        <li><Link to="/a-desiciones">A.Desiciones</Link></li>
        <li><Link to="/t-colas">T.Colas</Link></li>*/}
      </ul>
    </nav>
  )
}
