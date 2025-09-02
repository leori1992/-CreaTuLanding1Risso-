import React from 'react';
import logo from './componentes/imagenes/logoRejal.jpg';
import './App.css';
import NavBar from './componentes/NavBar/NavBar';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="logorejal" alt="logo" />
      </header>
      <NavBar />
    </div>
  );
}

export default App;