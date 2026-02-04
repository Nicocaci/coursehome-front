import React from "react";
import { useState, useEffect } from "react";
import axiosInstance from "../../../utils/axiosConfig.js";

const AdminOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/api/orders");
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);
  return (
    <>
      <div className="admin-section">
        <div>
          <p className="titulo-admin-section">Lista de Ordenes</p>
        </div>
        <div>
          <div className="status-message">
            {loading && <p>Cargando ordenes...</p>}
            {error && <p>Error al cargar las ordenes: {error.message}</p>}
          </div>
          {!loading && !error && (
            <table className="users-table">
              <thead>
                <tr>
                  <th>ID de Orden</th>
                  <th>Cliente</th>
                  <th>Fecha</th>
                  <th>Estado</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr>
                    <td>{order._id}</td>
                    <td>{order.user}</td>
                    <td>{order.status}</td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>$ {order.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminOrder;
