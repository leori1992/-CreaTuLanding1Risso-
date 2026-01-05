import React, { createContext, useState, useContext, useEffect } from "react";
// Se elimina la sincronización con Firebase

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // Inicializar el carrito desde localStorage si existe
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [stockReduced, setStockReduced] = useState(true); // Por defecto, el stock se reduce al agregar al carrito
  
  // Guardar el carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Función para agregar productos al carrito
  const addToCart = (product, quantity, size) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id && item.size === size);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity, size }];
      }
    });
  };

  // Función para eliminar productos del carrito (sin sincronización)
  const removeFromCart = (id, size) => {
    setCart((prevCart) => prevCart.filter((item) => !(item.id === id && item.size === size)));
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