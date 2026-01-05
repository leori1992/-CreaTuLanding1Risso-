import React, { useState } from "react";
import "./form.css";

function Contador({ stock, onAddToCart }) {
  const [count, setCount] = useState(1);

  const handleIncrement = () => {
    if (stock == null || count < stock) {
      setCount(count + 1);
    }
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(count); // Llama a la función pasada como prop con la cantidad seleccionada
  };

  return (
    <div className="contador">
      <div className="contador-controles">
        <button onClick={handleDecrement} className="contador-boton">-</button>
        <span className="contador-cantidad">{count}</span>
        <button onClick={handleIncrement} className="contador-boton">+</button>
      </div>
      <button onClick={handleAddToCart} className="contador-agregar">
        Agregar al carrito
      </button>
    </div>
  );
}

export default Contador;