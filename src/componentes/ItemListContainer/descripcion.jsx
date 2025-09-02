
import React, { useState } from "react";
import "./ItemListContainer.css";

function ProductCard({ product }) {
  const [showDescription, setShowDescription] = useState(false);

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  return (
    <div className="producto-item">
      <img src={product.image} alt={product.name} className="producto-imagen" />
      <p>{product.name}</p>
      <button className="toggle-button" onClick={toggleDescription}>
        {showDescription ? "Ocultar descripción" : "Ver descripción"}
      </button>
      {showDescription && <div className="descripcion">{product.description}</div>}
    </div>
  );
}

export default ProductCard;