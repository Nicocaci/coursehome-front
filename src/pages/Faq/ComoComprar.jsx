import React from "react";
import { Link } from "react-router-dom";

const ComoComprar = () => {
  return (
    <div className="faq-section">
      <Link className="li-volver-productos" to="/faq">
        ⬅ Volver a Preguntas Frecuentes
      </Link>
      <div className="li-container">
        <h2 className="faq-title">¿Cómo Comprar?</h2>
        <p className="faq-content">
          Comprar en nuestra tienda es rápido, simple y seguro.
          <br />
          <br />
          Agregá al carrito los productos que quieras llevar. Cuando estés
          listo, hacé clic en
          <strong> “Finalizar compra” </strong> y completá tus datos de contacto
          y envío.
          <br />
          <br />
          Luego elegí el medio de pago que prefieras y confirmá tu pedido.
          <br />
          <br />
          Una vez acreditado el pago, te enviaremos un correo electrónico con la
          confirmación de la compra y los detalles para que puedas seguir tu
          pedido hasta que llegue a tus manos.
        </p>
      </div>
    </div>
  );
};

export default ComoComprar;
