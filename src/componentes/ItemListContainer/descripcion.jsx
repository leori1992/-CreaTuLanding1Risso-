import React, { useState } from "react";
import Contador from "../ItemCarrito/form"; // Importa el componente Contador
import { useCart } from "../Context/CartContext"; // Importa el contexto del carrito
import "./ItemListContainer.css";

// Devuelve rango de talles según el nombre/modelo
function getSizeRangeForModel(product) {
  const name = (product?.name || "").toLowerCase();
  const rules = [
    { keys: ["112", "858"], range: [38, 46] },
    { keys: ["m1", "m2"], range: [36, 41] },
    { keys: ["850"], range: [34, 50] },
    { keys: ["613", "910", "650"], range: [39, 46] },
  ];
  for (const r of rules) {
    if (r.keys.some(k => name.includes(k))) return r.range;
  }
  return null;
}

function ProductCard({ product }) {
  const [addedToCart, setAddedToCart] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const { addToCart } = useCart(); // Obtén la función addToCart del contexto

  const range = getSizeRangeForModel(product);
  const sizes = range ? Array.from({ length: range[1] - range[0] + 1 }, (_, i) => range[0] + i) : [];

  const isOutOfStockProduct = () => {
    const name = (product?.name || "").toLowerCase();
    return name.includes("botgam") || name.includes("articulo 98") || name.includes("bot");
  };

  const handleAddToCart = (quantity) => {
    if (!selectedSize) {
      alert("Por favor, selecciona un talle antes de agregar al carrito.");
      return;
    }

    // Bloquear agregado si el producto está sin stock
    if (isOutOfStockProduct()) {
      alert("Este producto está sin stock y no puede agregarse al carrito.");
      return;
    }
    // Stock fijo en 10 para el resto
    const displayStock = 10;
    if (quantity > displayStock) {
      alert("No hay suficiente stock disponible.");
      return;
    }

    addToCart(product, quantity, selectedSize);
    setAddedToCart(true);
  };

  return (
    <div className="producto-item">
      <img src={product.image} alt={product.name} className="producto-imagen" />
      <p className="producto-nombre">{product.name}</p>
      <p className="producto-precio">
        Precio: ${product.price ? product.price.toLocaleString() : "No disponible"}
      </p>
      <p className="producto-descripcion">Colores: {product.colors?.join(", ")}</p>
      {/* Selector de talles */}
      <div className="producto-talles">
        <label htmlFor={`talle-${product.id}`}>Talle</label>
        <select
          id={`talle-${product.id}`}
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
        >
          <option value="">Selecciona un talle</option>
          {sizes.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {isOutOfStockProduct() ? (
        <p className="producto-stock">Sin stock</p>
      ) : (
        <p className="producto-stock">Stock disponible: 10</p>
      )}
      {isOutOfStockProduct() ? null : (
        <Contador stock={10} onAddToCart={handleAddToCart} />
      )}
      {addedToCart && <p className="mensaje-agregado">¡Producto agregado al carrito!</p>}
    </div>
  );
}

export default ProductCard;