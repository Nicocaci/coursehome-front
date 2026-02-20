import React from "react";
import { useState } from "react";
import "../css/pages/Contacto.css";
import { FaWhatsapp } from "react-icons/fa";
import { FcIphone } from "react-icons/fc";
import axiosInstance from "../utils/axiosConfig.js";
import Swal from "sweetalert2";

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/api/contacto", formData);
      Swal.fire({
        icon: "success",
        title: "Mensaje enviado",
        text: response.data.message,
        confirmButtonColor: "#000",
      });

      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        mensaje: "",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Error al enviar el mensaje",
        confirmButtonColor: "#000",
      });
    }
  };

  return (
    <div className="contacto-section">
      <div className="contacto-content">
        <h3 className="titulo-contacto"> ¿Querés hablar con nosotros?</h3>
        <p className="wp-contacto">
          Escribinos por <strong>WhatsApp</strong>
          <FaWhatsapp size={"30px"} />
        </p>
        <p className="wp-contacto">
          O llamanos al <strong>11 2345-6789</strong> <FcIphone color="black" size={"30px"} />
        </p>
      </div>

      <div className="contacto-form">
        <div className="form-header">
          <h3 className="titulo-contacto">¿Consultas mayoristas?</h3>
          <p className="form-content">
            Si estás interesado en compras al por mayor o necesitás información
            adicional, dejá tu mensaje y nos pondremos en contacto a la
            brevedad.
          </p>
        </div>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nombre">Nombre:</label>
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
              <label htmlFor="email">Email:</label>
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
              <label htmlFor="telefono">Teléfono:</label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="mensaje">Mensaje:</label>
              <textarea
                id="mensaje"
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                rows="4"
                required
              ></textarea>
            </div>
            <button className="btn-form" type="submit">
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contacto;
