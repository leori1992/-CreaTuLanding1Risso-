import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./componentes/NavBar/NavBar";
import ItemListContainer from "./componentes/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./componentes/ItemDetailContainer/ItemDetailContainer";
import Cart from "./componentes/Context/Cart";
import { CartProvider } from "./componentes/Context/CartContext";
import Home from "./componentes/Home/Home";
import Contacto from "./componentes/Contacto/Contacto";
import WhatsAppButton from "./componentes/WhatsAppButton/WhatsAppButton";

function App() {
  return (
    <CartProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<ItemListContainer />} />
          <Route path="/producto/:id" element={<ItemDetailContainer />} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
        <WhatsAppButton />
      </Router>
    </CartProvider>
  );
}

export default App;