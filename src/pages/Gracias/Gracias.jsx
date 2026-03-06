import { useLocation, useNavigate } from "react-router-dom";
import '../../css/pages/Gracias/Gracias.css'

function Gracias() {
  const location = useLocation();
  const navigate = useNavigate();

  const order = location.state?.order;

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

        {order && (
          <div className="gracias-order-info">
            <p><strong>Orden:</strong> #{order._id.slice(-6)}</p>
            <p><strong>Total:</strong> ${order.total}</p>
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