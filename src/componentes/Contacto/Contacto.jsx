import React, { useState } from "react";
import "./Contacto.css";

function Contacto() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: ""
  });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí normalmente enviarías los datos a un servidor
    // Para esta demo, simplemente mostraremos un mensaje de éxito
    console.log("Datos del formulario:", formData);
    setEnviado(true);
    
    // Resetear el formulario
    setFormData({
      nombre: "",
      email: "",
      asunto: "",
      mensaje: ""
    });
    
    // Simular envío de email a leonelrisso92@live.com.ar
    alert(`Formulario enviado a leonelrisso92@live.com.ar\nNombre: ${formData.nombre}\nEmail: ${formData.email}\nAsunto: ${formData.asunto}\nMensaje: ${formData.mensaje}`);
  };

  return (
    <div className="contacto-container">
      <h1>Contacto</h1>
      <p className="contacto-descripcion">
        Completa el formulario y nos pondremos en contacto contigo lo antes posible.
      </p>
      
      {enviado && (
        <div className="mensaje-exito">
          ¡Gracias por contactarnos! Te responderemos a la brevedad.
        </div>
      )}
      
      <form className="contacto-form" onSubmit={handleSubmit}>
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
          <label htmlFor="asunto">Asunto</label>
          <input
            type="text"
            id="asunto"
            name="asunto"
            value={formData.asunto}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="mensaje">Mensaje</label>
          <textarea
            id="mensaje"
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            rows="5"
            required
          ></textarea>
        </div>
        
        <button type="submit" className="enviar-button">
          Enviar mensaje
        </button>
      </form>
      
      <div className="contacto-info">
        <h3>Información de contacto</h3>
        <p>
          <strong>Email:</strong> leonelrisso92@live.com.ar
        </p>
        <p>
          <strong>WhatsApp:</strong> +54 9 1165411918
        </p>
      </div>
    </div>
  );
}

export default Contacto;