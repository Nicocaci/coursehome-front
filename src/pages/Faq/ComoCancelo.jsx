import React from "react";
import { Link } from "react-router-dom";

const ComoCancelo = () => {
  return (
    <div className="faq-section">
      <Link className="li-volver-productos" to="/faq">
        ⬅ Volver a Preguntas Frecuentes
      </Link>
      <div className="li-container">
        <h2 className="faq-title">¿Cómo Cancelo una compra?</h2>
        <p className="faq-content">
          Si necesitás cancelar una compra, podés hacerlo comunicándote con
          nosotros lo antes posible.
          <br />
          <br />
          Te recomendamos contactarnos inmediatamente después de realizar el
          pedido, indicando el número de orden y el motivo de la cancelación.
          <br />
          <br />
          Si el pedido aún no fue despachado, podremos cancelarlo sin
          inconvenientes y gestionar el reintegro correspondiente.
          <br />
          <br />
          En caso de que el pedido ya haya sido enviado, deberás aguardar a
          recibirlo y luego coordinar la devolución según nuestras políticas
          vigentes.
          <br />
          <br />
          Ante cualquier duda, nuestro equipo de atención al cliente está
          disponible para ayudarte.
        </p>
      </div>
    </div>
  );
};

export default ComoCancelo;
