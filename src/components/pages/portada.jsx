import React, { useState, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import intel from'./intel.mp4';
export const Portada = () => {
  const metodosRef = useRef(null);

  const handleEntrarClick = () => {
    if (metodosRef.current) {
      metodosRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const handleNavLinkClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return(
    <>
        <div className="row m-0 p-0 gradient">
          <video autoPlay loop muted className='m-0 p-0'>
            <source src={intel} type="video/mp4" />
            Tu navegador no soporta el elemento de video.
          </video>
          <div className="content m-0">
            <div className='row m-0 d-flex justify-content-center aling-items-center'>
              <div className='col-lg-6 col-12 menu-portada p-5 flex-column'>
                <h1 className='title-portada'>INVESTIGACIÓN&nbsp;</h1>
                <h1 className='title-portada' style={{ color: 'grey' }}>OPERATIVA II</h1>
              </div>
              <div className='col-lg-2 col-12 circle' onClick={handleEntrarClick} style={{ cursor: 'pointer' }}>
                <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="100" cy="100" r="80" />
                  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="bold">ENTRAR</text>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="row metodos row m-0 d-flex justify-content-center aling-items-cente text-center mt-5 pt-5">
              <div ref={metodosRef} className='col-lg-12 p-4 m-0 second-title'>
                <h1 className='m-0'>MÉTODOS IMPLEMENTADOS</h1>
              </div>
              <hr className="my-3" style={ {border: "0"}}/>
              <div className='col-lg-3 m-0 tema p-0'>
                <NavLink onClick={handleNavLinkClick} className='lista-portada col-12' to="/cpm">
                  <div className='col-lg-12 p-4 m-0'>CPM</div>
                </NavLink>
              </div>
              <div className='col-lg-3 p-0 m-0 tema'>
                <NavLink onClick={handleNavLinkClick} className='lista-portada col-12' to="/pert">
                  <div className='col-lg-12 p-4 m-0'>PERT</div>
                </NavLink>
              </div>
              <div className='col-lg-6 p-0 m-0 tema'>
                <img src="https://images.unsplash.com/photo-1594935975218-a3596da034a3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt=""/>
              </div>
              <div className='col-lg-6 p-0 m-0 tema'>
                <img src="https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt=""/>
              </div>
              <div className='col-lg-3 p-0 m-0 tema'>
              </div>
              <div className='col-lg-3 p-0 m-0 tema'>
                <NavLink onClick={handleNavLinkClick} className='lista-portada col-12' to="/modelo-inventario">
                  <div className='col-lg-12 p-4 m-0'>MODELO DE INVENTARIO</div>
                </NavLink>
              </div>
              <div className='col-lg-3 p-0 m-0 tema'>
                <NavLink onClick={handleNavLinkClick} className='lista-portada col-12' to="/teoria-decisiones-certidumbre">
                  <div className='col-lg-12 p-4 m-0'>TEORÍA DE DECISIONES BAJO CERTIDUBMBRE</div>
                </NavLink>
              </div>
              <div className='col-lg-3 p-0 m-0 tema'>
              </div>
              <div className='col-lg-3 p-0 m-0 tema'>
                <NavLink onClick={handleNavLinkClick} className='lista-portada col-12' to="/teoria-decisiones-incertidumbre">
                  <div className='col-lg-12 p-4 m-0'>TEORÍA DE DECISIONES BAJO INCERTIDUBMBRE</div>
                </NavLink>
              </div>
              <div className='col-lg-3 p-0 m-0 tema'>
                <img src="https://plus.unsplash.com/premium_photo-1675323087892-41bcf3222585?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt=""/>
              </div>
              
              <div className='col-lg-6 p-0 m-0 tema'>
                <img src="https://images.unsplash.com/photo-1521158611-6b569322677d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt=""/>
              </div>
              <div className='col-lg-3 p-0 m-0 tema'>
              </div>
              <div className='col-lg-3 p-0 m-0 tema'>
                <NavLink onClick={handleNavLinkClick} className='lista-portada col-12' to="/arbol-decisiones">
                  <div className='col-lg-12 p-4 m-0'>ÁRBOL DE DECISIONES</div>
                </NavLink>
              </div>
              <div className='col-lg-3 p-0 m-0 tema'>
              </div>
              <div className='col-lg-3 p-0 m-0 tema'>
                <NavLink onClick={handleNavLinkClick} className='lista-portada col-12' to="/teoria-colas">
                  <div className='col-lg-12 p-4 m-0'>TEORÍA DE COLAS</div>
                </NavLink>
              </div>
              <div className='col-lg-6 p-0 m-0 tema'>
                <img src="https://images.unsplash.com/photo-1613018274564-bec35a774995?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt=""/>
              </div>
              <div className='col-lg-3 p-0 m-0 tema'>
                <img src="https://blog.bodog.com/wp-content/uploads/2020/09/jogar-roleta-sorte-bodog.jpg" alt=""/>
              </div>
              <div className='col-lg-3 p-0 m-0 tema'>
              </div>
              <div className='col-lg-3 p-0 m-0 tema'>
                <NavLink onClick={handleNavLinkClick} className='lista-portada col-12' to="/simulacion-montecarlo">
                  <div className='col-lg-12 p-4 m-0'>SIMULACIÓN DE MONTECARLO</div>
                </NavLink>
              </div>
              <div className='col-lg-3 p-0 m-0 tema'>
              </div>
              <div className='col-lg-3 p-0 m-0 tema'>
                <NavLink onClick={handleNavLinkClick} className='lista-portada col-12' to="/programacion-cuadratica">
                  <div className='col-lg-12 p-4 m-0'>PROGRAMACIÓN CUADRÁTICA</div>
                </NavLink>
              </div>
              <div className='col-lg-3 p-0 m-0 tema'>
              </div>
              <div className='col-lg-6 p-0 m-0 tema'>
                <img src="https://rubenllera.files.wordpress.com/2014/04/2-006.jpg" alt=""/>
              </div>
              
          </div>
    </>
  )
}