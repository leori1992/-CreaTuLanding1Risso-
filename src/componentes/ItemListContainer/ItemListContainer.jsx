import React, { useEffect, useState } from "react";
import ProductCard from "./descripcion"; // Importa el componente ProductCard
import GenderFilter from "./GenderFilter"; // Importa el componente de filtro
import "./ItemListContainer.css";
import { collection, getDocs, query, where } from "firebase/firestore"; // Importa Firestore
import { db } from "../utilidades/firebase"; // Importa la configuración de Firebase
import { useLocation } from "react-router-dom"; // Importa useLocation para acceder a los parámetros de URL

function ItemListContainer() {
  const [products, setProducts] = useState([]); // Estado para almacenar los productos
  const [filteredProducts, setFilteredProducts] = useState([]); // Estado para productos filtrados
  const [loading, setLoading] = useState(true); // Estado para manejar el cargando
  const [selectedGender, setSelectedGender] = useState("todos"); // Estado para el género seleccionado
  const location = useLocation(); // Hook para obtener la ubicación actual

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
        
        // Obtener el parámetro de género de la URL
        const params = new URLSearchParams(location.search);
        const generoParam = params.get('genero');
        
        if (generoParam) {
          // Si hay un parámetro de género en la URL, actualiza el estado y filtra los productos
          setSelectedGender(generoParam);
          const filtered = productsData.filter(product => product.genero === generoParam);
          setFilteredProducts(filtered);
        } else {
          // Si no hay parámetro, muestra todos los productos
          setFilteredProducts(productsData);
        }
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      } finally {
        setLoading(false); // Finaliza el estado de carga
      }
    };

    fetchProducts();
  }, [location.search]); // Ejecutar cuando cambie la URL

  // Función para filtrar productos por género
  const handleGenderChange = (gender) => {
    setSelectedGender(gender);
    
    if (gender === "todos") {
      setFilteredProducts(products); // Muestra todos los productos
    } else {
      // Filtra los productos por género
      const filtered = products.filter(product => product.genero === gender);
      setFilteredProducts(filtered);
    }
  };

  if (loading) {
    return <p>Cargando productos...</p>; // Muestra un mensaje mientras se cargan los productos
  }

  if (products.length === 0) {
    return <p>No se encontraron productos.</p>; // Muestra un mensaje si no hay productos
  }

  return (
    <div className="item-list-container">
      <h1>Lista de Productos</h1>
      
      {/* Componente de filtro por género */}
      <GenderFilter 
        selectedGender={selectedGender} 
        onGenderChange={handleGenderChange} 
      />
      
      {filteredProducts.length === 0 ? (
        <p>No se encontraron productos para el género seleccionado.</p>
      ) : (
        <div className="productos-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product} // Pasa cada producto como prop
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ItemListContainer;