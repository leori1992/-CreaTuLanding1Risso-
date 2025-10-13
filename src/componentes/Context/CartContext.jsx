import React, { createContext, useState, useContext } from "react";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../utilidades/firebase";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [stockReduced, setStockReduced] = useState(true); // Por defecto, el stock se reduce al agregar al carrito

  // Función para agregar productos al carrito
  const addToCart = (product, quantity) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  // Función para eliminar productos del carrito y recuperar el stock
  const removeFromCart = async (id) => {
    // Buscar el producto en el carrito antes de eliminarlo
    const productToRemove = cart.find(item => item.id === id);
    
    if (productToRemove) {
      try {
        // Obtener el documento actual de Firestore para conocer el stock actual
        const productRef = doc(db, "products", id);
        const productSnap = await getDoc(productRef);
        
        if (productSnap.exists()) {
          const currentStock = productSnap.data().stock;
          // Actualizar el stock en Firestore sumando la cantidad que estaba en el carrito
          await updateDoc(productRef, { 
            stock: currentStock + productToRemove.quantity 
          });
          console.log(`Stock recuperado para el producto ${id}: ${currentStock + productToRemove.quantity}`);
        }
      } catch (error) {
        console.error("Error al recuperar el stock:", error);
      }
    }
    
    // Eliminar el producto del carrito
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Función para finalizar la compra
  const clearCart = () => {
    setCart([]);
  };

  // Función para confirmar la compra (no es necesario reducir el stock porque ya se redujo al agregar al carrito)
  const confirmPurchase = () => {
    // Simplemente limpiamos el carrito sin modificar el stock
    clearCart();
    return true;
  };

  // Función para calcular el precio total del carrito
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      clearCart,
      confirmPurchase,
      getTotalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};