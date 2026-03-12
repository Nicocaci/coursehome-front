import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useCart } from "../../context/CartContext.jsx";
import '../../css/pages/Gracias/Gracias.css'

function Gracias() {

  const location = useLocation();
  const navigate = useNavigate();
  const { getCart } = useCart();

  const order = location.state?.order;

  // params que devuelve Mercado Pago
  const params = new URLSearchParams(location.search);

  const paymentId = params.get("payment_id");
  const status = params.get("status");
  const externalReference = params.get("external_reference");

  useEffect(() => {

    if (paymentId) {
      console.log("Pago MercadoPago:", paymentId);
      console.log("Estado:", status);
      console.log("Cart ID:", externalReference);
    }

    // refrescar carrito (porque el webhook ya lo limpió)
    getCart();

  }, []);

  return (
    <div className="gracias-container">

      <div className="gracias-card">

        <div className="gracias-icon">
          ✓
        </div>

        <h1>¡Compra realizada!</h1>

        <p>
          Gracias por tu compra. Tu pedido fue procesado correctamente.
        </p>

        {/* compra normal */}
        {order && (
          <div className="gracias-order-info">
            <p><strong>Orden:</strong> #{order._id.slice(-6)}</p>
            <p><strong>Total:</strong> ${order.total}</p>
          </div>
        )}

        {/* pago Mercado Pago */}
        {paymentId && (
          <div className="gracias-order-info">
            <p><strong>Pago:</strong> #{paymentId}</p>
            <p><strong>Estado:</strong> {status}</p>
          </div>
        )}

        <p className="gracias-email">
          Recibirás un email con los detalles de tu pedido.
        </p>

        <div className="gracias-buttons">

          <button
            onClick={() => navigate("/productos")}
            className="btn-primary"
          >
            Seguir comprando
          </button>

          <button
            onClick={() => navigate("/")}
            className="btn-secondary"
          >
            Ir al inicio
          </button>

        </div>

      </div>

    </div>
  );
}

export default Gracias;