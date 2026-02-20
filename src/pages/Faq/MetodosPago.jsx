import React from "react";
import { Link } from "react-router-dom";

const MetodosPago = () => {
  return (
    <div className="faq-section">
      <Link className="li-volver-productos" to="/faq">
        ⬅ Volver a Preguntas Frecuentes
      </Link>
      <div className="li-container">
        <h2 className="faq-title">
          ¿Cuáles son los métodos de pago disponibles?
        </h2>
        <p className="faq-content">
          Todos los pagos se gestionan de forma segura a través de Mercado Pago,
          lo que te permite elegir entre distintos medios como tarjetas de
          crédito y débito, saldo en cuenta, transferencias bancarias y otros
          métodos habilitados.
          <br />
          <br />
          Si seleccionás pago en efectivo, será necesario abonar una seña para
          confirmar la compra. El pedido comenzará a procesarse una vez
          acreditado dicho importe.
          <br />
          <br />
          Los pedidos sin seña confirmada no serán enviados.
        </p>
      </div>
    </div>
  );
};

export default MetodosPago;
