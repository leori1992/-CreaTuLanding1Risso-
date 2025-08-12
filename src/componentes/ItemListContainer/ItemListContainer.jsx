import React from "react";
import './ItemListContainer.css';

function ItemListContainer({ productImages }) {
  if (!productImages || productImages.length === 0) {
    return <p></p>;
  }

  return (
    <div className="item-list-container">
      <h1>Bienvenido a nuestra tienda</h1>
      <p>Explora nuestros productos y ofertas especiales.</p>
      <div className="productos-grid">
        {productImages.map((image, index) => (
          <div key={index} className="producto-item">
            <img src={image} alt={`Producto ${index + 1}`} className="producto-imagen" />
            <p>Producto {index + 1}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemListContainer;