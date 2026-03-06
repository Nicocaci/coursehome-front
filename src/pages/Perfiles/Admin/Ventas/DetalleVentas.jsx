import { useEffect, useState } from "react";
import axiosInstance from "../../../../utils/axiosConfig.js";

function DetalleVentas() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axiosInstance
      .get("/api/orders/stats")
      .then((res) => setStats(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!stats) return <p>Cargando...</p>;

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <h3>Total Ventas</h3>
        <p>${stats.totalRevenue}</p>
      </div>

      <div className="stat-card">
        <h3>Órdenes</h3>
        <p>{stats.totalOrders}</p>
      </div>

      <div className="stat-card">
        <h3>Productos vendidos</h3>
        <p>{stats.totalProductsSold}</p>
      </div>

      <div className="stat-card">
        <h3>Pendientes</h3>
        <p>{stats.ordersByStatus.pendiente}</p>
      </div>

      <div className="stat-card">
        <h3>Enviados</h3>
        <p>{stats.ordersByStatus.enviado}</p>
      </div>

      <div className="stat-card">
        <h3>Entregados</h3>
        <p>{stats.ordersByStatus.entregado}</p>
      </div>

      <div className="stat-card">
        <h3>Cancelados</h3>
        <p>{stats.ordersByStatus.cancelado}</p>
      </div>
      <div className="stat-card">
        <h3>Ventas MercadoPago</h3>
        <p>${stats.salesByPaymentMethod.mercadopago}</p>
      </div>

      <div className="stat-card">
        <h3>Ventas Efectivo</h3>
        <p>${stats.salesByPaymentMethod.efectivo}</p>
      </div>
    </div>
  );
}

export default DetalleVentas;
