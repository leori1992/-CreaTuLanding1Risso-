import React from 'react';
import './NavBar.css';
import carrito from '../imagenes/carrito.jpg';

function NavBar({ onNavClick }) {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><a href="#inicio" onClick={() => onNavClick('home')}>Inicio</a></li>
        <li><a href="#productos" onClick={() => onNavClick('productos')}>Productos</a></li>
        <li><a href="#contacto" onClick={() => onNavClick('contacto')}>Contacto</a></li>
        <li className="carrito">
          <a href="#carrito" onClick={() => onNavClick('carrito')}>
            <img src={carrito} alt="Carrito" className="carrito-imagen" />
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;