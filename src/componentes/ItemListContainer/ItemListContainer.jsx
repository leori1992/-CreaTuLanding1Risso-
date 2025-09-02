import React from "react";
import ProductCard from "./descripcion"; // Importa el componente ProductCard
import './ItemListContainer.css';

function ItemListContainer() {
  const products = [
    { image: require('../imagenes/613 negro 1.jpg'), name: '', description: 'Calzado de cuero, con base de pvc (Leal), forrado en badana(Cuero de oveja) y ecocuero' },
    { image: require('../imagenes/650-1.jpg'), name: '', description: 'Calzado de cuero, con base de pvc (Leal), forrado en badana(Cuero de oveja) y ecocuero' },
    { image: require('../imagenes/850 negro 1.jpg'), name: 'Articulo 850 Negro', description: 'Calzado de cuero, con base de pvc (Leal), forrado en badana(Cuero de oveja) y ecocuero' },
    { image: require('../imagenes/855 1.jpg'), name: '', description: 'Calzado de cuero, con base de pvc (Leal), forrado en badana(Cuero de oveja) y ecocuero' },
    { image: require('../imagenes/858 N.jpg'), name: 'art 858', description: 'Calzado de cuero, con base de pvc (Leal), forrado en badana(Cuero de oveja) y ecocuero' },
    { image: require('../imagenes/jaz 1.png'), name: 'Articulo Jaz', description: 'Calzado de cuero, con base de pvc (Leal), forrado en badana(Cuero de oveja) y ecocuero' },
    { image: require('../imagenes/M1.jpg'), name: 'Articulo M1', description: 'Calzado de cuero, con base de pvc (Leal), forrado en badana(Cuero de oveja) y ecocuero' },
    { image: require('../imagenes/M2   1.png'), name: 'Articulo M2', description: 'Calzado de cuero, con base de pvc (Leal), forrado en badana(Cuero de oveja) y ecocuero' },
    { image: require('../imagenes/BOL.. GAMUZA.jpg'), name: 'Bota Gamuza', description: 'Bota Gamuza. y base de pvc Leal' },
    { image: require('../imagenes/112 (1).jpg'), name: 'Articulo 112', description: 'Calzado de cuero, con base de pvc (Leal), forrado en badana(Cuero de oveja) y ecocuero' },
    { image: require('../imagenes/91-1.jpg'), name: 'Articulo 98', description: 'Calzado de cuero, con base de pvc (Leal).' },
    { image: require('../imagenes/910.jpg'), name: '', description: 'Calzado de cuero, con base de pvc (Leal), forrado en badana(Cuero de oveja) y ecocuero' },
  ];

  return (
    <div className="item-list-container">
      <h1>Bienvenido a nuestra tienda</h1>(Cuero de oveja)
      <p>Explora nuestros productos.</p>
      <div className="productos-grid">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ItemListContainer;