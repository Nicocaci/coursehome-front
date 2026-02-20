import React from "react";
import { Link } from "react-router-dom";

const ComoLogear = () => {
  return (
    <div className="faq-section">
      <Link className="li-volver-productos" to="/faq">
        ⬅ Volver a Preguntas Frecuentes
      </Link>
      <div className="li-container">
        <h2 className="faq-title">¿Cómo Iniciar Sesión / Registrarse?</h2>
        <p className="faq-content">
          Crear una cuenta te permitirá comprar más rápido y hacer seguimiento
          de tus pedidos.
          <br />
          <br />
          Si ya estás registrado, simplemente ingresá tu correo y contraseña en
          <strong> “Iniciar sesión”</strong>.
          <br />
          <br />
          Si aún no tenés cuenta, podés registrarte en pocos segundos
          completando tus datos básicos. Una vez creado tu perfil, podrás
          gestionar tus compras y recibir actualizaciones sobre tus pedidos.
        </p>
      </div>
    </div>
  );
};

export default ComoLogear;
