import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Bienvenido a nuestra Tienda Online</h1>
        <p className="hero-subtitle">
          Descubre nuestra colección exclusiva de productos de alta calidad
        </p>
        <Link to="/productos" className="cta-button">
          Ver Productos
        </Link>
      </div>

      <div className="features-section">
        <div className="feature">
          <div className="feature-icon">🛒</div>
          <h3>Compra Fácil</h3>
          <p>Proceso de compra simple y seguro</p>
        </div>
        <div className="feature">
          <div className="feature-icon">🚚</div>
          <h3>Envío Rápido</h3>
          <p>Entrega a todo el país</p>
        </div>
        <div className="feature">
          <div className="feature-icon">💯</div>
          <h3>Calidad Garantizada</h3>
          <p>Productos seleccionados de primera calidad</p>
        </div>
      </div>

      <div className="categories-section">
        <h2>Categorías Destacadas</h2>
        <div className="categories">
          <Link to="/productos" className="category-card">
            <div className="category-name">Hombre</div>
          </Link>
          <Link to="/productos" className="category-card">
            <div className="category-name">Mujer</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;