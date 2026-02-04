import React from "react";
import "../css/pages/ProductosPage.css";
import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosConfig.js";
import { getImageUrl } from "../utils/imageUtils.js";
import { Link } from "react-router-dom";

const ProductosPage = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axiosInstance.get("/api/products");
        console.log("Respuesta completa:", response);
        console.log("Datos de respuesta:", response.data);
        if (response.data && Array.isArray(response.data)) {
          console.log("Productos obtenidos:", response.data);
          setProductos(response.data);
        } else if (
          response.data &&
          response.data.products &&
          Array.isArray(response.data.products)
        ) {
          console.log(
            "Productos obtenidos desde data.products:",
            response.data.products,
          );
          setProductos(response.data.products);
        } else {
          console.warn(
            "La respuesta no contiene un array de productos:",
            response.data,
          );
          setError("La respuesta del servidor no es válida.");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
        setError(
          "Error al cargar los productos. Verifica la conexión con el servidor.",
        );
        setLoading(false);
      }
    };
    fetchProductos();
  }, []);

  return (
    <div className="product-section">
      <div>
        <h2 className="titulo-productos center">Productos</h2>
      </div>
      {loading && <p className="center">Cargando productos...</p>} 
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && productos.length === 0 && (
        <p>No hay productos disponibles.</p>
      )}
      <div className="cards-container">
        {productos.map((p) => (
          <Link className="li-none-black" to={`/productos/${p._id}`} key={p._id}>
            <div className="product-card">
              <div className="card-img-productos">
                <img
                  src={getImageUrl(
                    // Usar siempre la primera imagen disponible
                    Array.isArray(p.imagen)
                      ? p.imagen[0]
                      : Array.isArray(p.imagenes)
                        ? p.imagenes[0]
                        : p.imagen,
                  )}
                  alt={p.name || "Producto"}
                  className="product-card-imagen"
                  onError={(e) => {
                    const attemptedUrl = e.target.src;
                    console.error("❌ Error cargando imagen del producto:", {
                      producto: p.name,
                      rutaOriginal: p.imagen,
                      urlIntentada: attemptedUrl,
                      apiUrl:
                        import.meta.env.VITE_API_URL || "http://localhost:3000",
                    });
                    e.target.src = "/vite.svg";
                  }}
                />
              </div>
              <div className="product-card-description">
                <h3 className="product-card-text">{p.name}</h3>
                <p className="product-card-text">${p.precio}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductosPage;
