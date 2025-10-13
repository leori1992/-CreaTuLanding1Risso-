import React, { useState } from "react";
import { useCart } from "../Context/CartContext"; // Usa el contexto del carrito
import CheckoutForm from "../ItemCarrito/CheckoutForm"; // Importa el formulario de checkout
import "./Cart.css";

function Cart() {
  const { cart, removeFromCart } = useCart(); // Obtén las funciones del contexto
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0); // Calcula el total

  const handleProceedToCheckout = () => {
    setShowCheckoutForm(true);
  };

  return (
    <div className="cart-container">
      <h1>Carrito de Compras</h1>
      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : showCheckoutForm ? (
        <CheckoutForm />
      ) : (
        <>
          <ul className="cart-items">
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>Cantidad: {item.quantity}</p>
                  <p>Precio: ${item.price.toLocaleString()}</p>
                  <p>Total: ${(item.price * item.quantity).toLocaleString()}</p>
                  <button
                    className="remove-button"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <h2>Total de la compra: ${total.toLocaleString()}</h2>
          </div>
          <button className="confirm-button" onClick={handleProceedToCheckout}>
            Proceder al Pago
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;