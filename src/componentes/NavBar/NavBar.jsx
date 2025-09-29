import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';
import carrito from '../imagenes/carrito.jpg';
import logo from '../imagenes/logoRejal.jpg'; // Importa el logo

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Logo Rejal" className="logo-rejal" />
      </div>
      <ul className="nav-links">
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink to="/productos" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            Productos
          </NavLink>
        </li>
        <li>
          <NavLink to="/contacto" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            Contacto
          </NavLink>
        </li>
        <li className="carrito">
          <NavLink to="/carrito">
            <img src={carrito} alt="Carrito" className="carrito-imagen" />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;