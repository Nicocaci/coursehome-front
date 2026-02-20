import React from "react";
import { Link } from "react-router-dom";

const ComoMayorista = () => {
  return (
    <div className="faq-section">
      <Link className="li-volver-productos" to="/faq">
        ⬅ Volver a Preguntas Frecuentes
      </Link>
      <div className="li-container">
        <h2 className="faq-title">¿Cómo obtengo una cuenta mayorista?</h2>
        <p className="faq-content">
          Si tenés un comercio o emprendimiento y querés trabajar con nosotros,
          podés solicitar una cuenta mayorista.
          <br />
          <br />
          Contactanos enviando los datos de tu negocio a través de nuestro formulario de contacto (nombre del comercio,
          CUIT, rubro y localidad) para que nuestro equipo comercial pueda
          evaluar la solicitud.
          <br />
          <br />
          Una vez aprobada, activaremos tu perfil mayorista y podrás acceder a
          condiciones y precios exclusivos.
        </p>
      </div>
    </div>
  );
};

export default ComoMayorista;
