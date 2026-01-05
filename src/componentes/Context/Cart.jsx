import React from "react";
import { useCart } from "../Context/CartContext"; // Usa el contexto del carrito
import "./Cart.css";

function Cart() {
  const { cart, removeFromCart } = useCart(); // Obtén las funciones del contexto

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0); // Calcula el total

  const getModelCode = (name) => {
    const lower = (name || "").toLowerCase();
    const models = ["112", "858", "m1", "m2", "850", "613", "910", "650"];
    return models.find((m) => lower.includes(m)) || null;
  };

  const handleSendToWhatsApp = () => {
    const phone = "5491165411918"; // Número de WhatsApp destino (Argentina, móvil)
    const lines = [];
    lines.push("Hola, quisiera continuar con la compra. Detalle del carrito:");
    cart.forEach((item) => {
      const name = item.name || "Producto";
      const qty = item.quantity || 1;
      const price = item.price || 0;
      const subtotal = price * qty;
      const sizeTxt = item.size ? ` (Talle ${item.size})` : "";
      const model = getModelCode(name);
      const modelPrefix = model ? `Artículo ${model} - ` : "Artículo - ";
      lines.push(`- ${modelPrefix}${name}${sizeTxt} x${qty} - $${price.toLocaleString()} c/u - Subtotal: $${subtotal.toLocaleString()}`);
    });
    lines.push(`Total: $${total.toLocaleString()}`);

    const message = encodeURIComponent(lines.join("\n"));
    const url = `https://wa.me/${phone}?text=${message}`;
    window.open(url, "_blank");
  };

  return (
    <div className="cart-container">
      <h1>Carrito de Compras</h1>
      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <>
          <ul className="cart-items">
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>Cantidad: {item.quantity}</p>
                  {item.size && <p>Talle: {item.size}</p>}
                  <p>Precio: ${item.price.toLocaleString()}</p>
                  <p>Total: ${(item.price * item.quantity).toLocaleString()}</p>
                  <button
                    className="remove-button"
                    onClick={() => removeFromCart(item.id, item.size)}
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
          <button className="confirm-button" onClick={handleSendToWhatsApp}>
            Continuar con la compra
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;