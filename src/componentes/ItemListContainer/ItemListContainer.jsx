import React, { useEffect, useState } from "react";
import ProductCard from "./descripcion"; // Importa el componente ProductCard
import "./ItemListContainer.css";
import { collection, getDocs } from "firebase/firestore"; // Importa Firestore
import { db } from "../utilidades/firebase"; // Importa la configuración de Firebase

function ItemListContainer() {
  const [products, setProducts] = useState([]); // Estado para almacenar los productos
  const [loading, setLoading] = useState(true); // Estado para manejar el cargando

  // Función para obtener todos los productos desde Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsRef = collection(db, "products"); // Referencia a la colección "products"
        const querySnapshot = await getDocs(productsRef); // Obtén todos los documentos de la colección

        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })); // Mapea los documentos a un array de objetos
        setProducts(productsData); // Guarda los productos en el estado
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      } finally {
        setLoading(false); // Finaliza el estado de carga
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Cargando productos...</p>; // Muestra un mensaje mientras se cargan los productos
  }

  if (products.length === 0) {
    return <p>No se encontraron productos.</p>; // Muestra un mensaje si no hay productos
  }

  return (
    <div className="item-list-container">
      <h1>Lista de Productos</h1>
      <div className="productos-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product} // Pasa cada producto como prop
          />
        ))}
      </div>
    </div>
  );
}

export default ItemListContainer;