import React, { useState } from "react";
import Contador from "../ItemCarrito/form"; // Importa el componente Contador
import { useCart } from "../Context/CartContext"; // Importa el contexto del carrito
import { doc, updateDoc } from "firebase/firestore"; // Importa Firestore
import { db } from "../utilidades/firebase"; // Importa la configuración de Firebase
import "./ItemListContainer.css";

function ProductCard({ product }) {
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart(); // Obtén la función addToCart del contexto

  const handleAddToCart = async (quantity) => {
    if (quantity <= product.stock) {
      // Agrega el producto al carrito global
      addToCart(product, quantity);

      // Actualiza el stock en Firestore
      const newStock = product.stock - quantity;
      const productRef = doc(db, "products", product.id);

      try {
        await updateDoc(productRef, { stock: newStock }); // Actualiza el stock en la base de datos
        product.stock = newStock; // Actualiza el stock en la página
        setAddedToCart(true);
      } catch (error) {
        console.error("Error al actualizar el stock en Firestore:", error);
        alert("Hubo un problema al actualizar el stock. Inténtalo de nuevo.");
      }
    } else {
      alert("No hay suficiente stock disponible.");
    }
  };

  return (
    <div className="producto-item">
      <img src={product.image} alt={product.name} className="producto-imagen" />
      <p className="producto-nombre">{product.name}</p>
      <p className="producto-precio">
        Precio: ${product.price ? product.price.toLocaleString() : "No disponible"}
      </p>
      <p className="producto-descripcion">Colores: {product.colors?.join(", ")}</p>
      <p className="producto-stock">Stock disponible: {product.stock}</p>
      <Contador stock={product.stock} onAddToCart={handleAddToCart} />
      {addedToCart && <p className="mensaje-agregado">¡Producto agregado al carrito!</p>}
    </div>
  );
}

export default ProductCard;