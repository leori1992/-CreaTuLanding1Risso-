import logo from './componentes/imagenes/logoRejal.jpg';
import './App.css';
import NavBar from './componentes/NavBar/NavBar'; // Importación correcta del componente

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="logorejal" alt="logo" />
      </header>
      <main>
        <NavBar />
      </main>
    </div>
  );
}

export default App;