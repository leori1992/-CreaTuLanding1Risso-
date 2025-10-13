import React, { useState } from "react";
import { useCart } from "../Context/CartContext";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../utilidades/firebase";
import "../ItemListContainer/ItemListContainer.css";

function CheckoutForm() {
  const { cart, confirmPurchase, getTotalPrice } = useCart();
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: ""
  });
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validar que el carrito no esté vacío
      if (cart.length === 0) {
        throw new Error("No hay productos en el carrito");
      }

      // Crear objeto de orden
      const order = {
        buyer: formData,
        items: cart.map(item => ({
          id: item.id,
          title: item.name || "Producto sin nombre", // Usar name en lugar de title y proporcionar valor por defecto
          price: item.price || 0, // Proporcionar valor por defecto para price
          quantity: item.quantity || 1 // Proporcionar valor por defecto para quantity
        })),
        total: getTotalPrice(),
        date: serverTimestamp()
      };

      // Guardar la orden en Firestore
      const docRef = await addDoc(collection(db, "orders"), order);
      setOrderId(docRef.id);
      
      // Limpiar el carrito
      confirmPurchase();
      
      // Limpiar el formulario
      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        direccion: ""
      });
    } catch (err) {
      console.error("Error al procesar la orden:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (orderId) {
    return (
      <div className="checkout-success">
        <h2>¡Compra realizada con éxito!</h2>
        <p>Tu número de orden es: <strong>{orderId}</strong></p>
        <p>Gracias por tu compra.</p>
      </div>
    );
  }

  return (
    <div className="checkout-form-container">
      <h2>Finalizar Compra</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="form-group">
          <label htmlFor="nombre">Nombre completo</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="telefono">Teléfono</label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="direccion">Dirección de envío</label>
          <textarea
            id="direccion"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <p className="checkout-total">Total a pagar: ${getTotalPrice()}</p>
        </div>
        <button 
          type="submit" 
          className="checkout-button"
          disabled={loading}
        >
          {loading ? "Procesando..." : "Confirmar Compra"}
        </button>
      </form>
    </div>
  );
}

export default CheckoutForm;