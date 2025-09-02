import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './NavBar.css';
import carrito from '../imagenes/carrito.jpg';
import ItemListContainer from '../ItemListContainer/ItemListContainer';

function NavBar() {
  return (
    <Router>
      <nav className="navbar">
        <ul className="nav-links">
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? 'active-link' : ''}>
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink to="/productos" className={({ isActive }) => isActive ? 'active-link' : ''}>
              Productos
            </NavLink>
          </li>
          <li>
            <NavLink to="/contacto" className={({ isActive }) => isActive ? 'active-link' : ''}>
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
      <Routes>
        <Route path="/" element={<h1>Inicio</h1>} />
        <Route path="/productos" element={<ItemListContainer />} />
        <Route path="/contacto" element={<h1>Contacto</h1>} />
        <Route path="/carrito" element={<h1>Carrito</h1>} />
      </Routes>
    </Router>
  );
}

export default NavBar;