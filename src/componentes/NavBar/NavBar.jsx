import React from 'react';
import './NavBar.css';

function NavBar() {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><a href="inicio">inicio</a></li>
        <li><a href="productost">Productos</a></li>
        <li><a href="contacto">contacto</a></li>
      </ul>
    </nav>
  );
}
export default NavBar;