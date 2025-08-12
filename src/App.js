import React, { useState } from 'react';
import logo from './componentes/imagenes/logoRejal.jpg';

import './App.css';
import NavBar from './componentes/NavBar/NavBar';
import ItemListContainer from './componentes/ItemListContainer/ItemListContainer';


function App() {
  const [activeSection, setActiveSection] = useState('home'); // Estado para controlar la sección activa

  const handleNavClick = (section) => {
    setActiveSection(section); // Cambia la sección activa
  };

  const productImages = [
    require('./componentes/imagenes/613 negro 1.jpg'),
    require('./componentes/imagenes/650-1.jpg'),
    require('./componentes/imagenes/850 negro 1.jpg'),
    require('./componentes/imagenes/855 1.jpg'),
    require('./componentes/imagenes/858 N.jpg'),
    require('./componentes/imagenes/jaz 1.png'),
    require('./componentes/imagenes/M1.jpg'),
    require('./componentes/imagenes/M2   1.png'),
    require('./componentes/imagenes/BOL.. GAMUZA.jpg'),
    require('./componentes/imagenes/112 (1).jpg'),
    require('./componentes/imagenes/91-1.jpg'),
    require('./componentes/imagenes/910.jpg'),
  ];

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="logorejal" alt="logo" />
      </header>
      <NavBar onNavClick={handleNavClick} />
      <main>
        {activeSection === 'home' && <ItemListContainer />}
        {activeSection === 'productos' && (
          <div className="productos-grid">
            {productImages.map((image, index) => (
              <div key={index} className="producto-item">
                <img src={image} alt={`Producto ${index + 1}`} className="producto-imagen" />
                <p>Producto {index + 1}</p>
              </div>
            ))}
          </div>
        )}
        
      </main>
    </div>
  );
}

export default App;