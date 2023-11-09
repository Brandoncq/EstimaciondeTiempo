import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import time from'./time.mp4';
export const Portada = () => {
  return(
    <>
      <div className="row m-0 p-0 gradient">
          <video autoPlay loop muted className='m-0 p-0'>
            <source src={time} type="video/mp4" />
            Tu navegador no soporta el elemento de video.
          </video>
          <div className="content m-0">
            {/*<h1>Contenido sobre el video</h1>
            <p>Este es un ejemplo de cómo mostrar un video de fondo con HTML y CSS.</p>
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='ifl'><path fill="currentColor" d="M6.5 2h4l2.94 8.83L13.5 2h4v20c-1.25-.22-2.63-.36-4.09-.42L10.5 13l-.07 8.59c-1.4.06-2.73.2-3.93.41V2Z"/></svg>*/}
            <ul className='menu-portada'>
              <li><NavLink className='lista-portada' to="/cpm">CPM</NavLink></li>
              <li><NavLink className='lista-portada' to="/pert">PERT</NavLink></li>
              {/*<li><NavLink className='lista-portada' to="/decision">DECISION THEORY</NavLink></li>*/}
            </ul>
          </div>
        </div>
    </>
  )
}