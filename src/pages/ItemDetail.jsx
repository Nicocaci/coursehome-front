import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosConfig.js";
import { getImageUrl } from "../utils/imageUtils.js";
import { Link } from "react-router-dom";
import "../css/pages/ItemDetail.css";
import { useCart } from "../context/CartContext.jsx";
import Swal from "sweetalert2";

const ItemDetail = () => {
  const { prodId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  const { addProductToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axiosInstance.get(`/api/products/${prodId}`);

        // Normalizar las imágenes que vienen del backend:
        // - Puede venir como `imagen` (string o array)
        // - O como `imagenes` (array)
        let imagenesNormalizadas = [];

        if (
          Array.isArray(response.data.imagenes) &&
          response.data.imagenes.length > 0
        ) {
          imagenesNormalizadas = response.data.imagenes;
        } else if (Array.isArray(response.data.imagen)) {
          imagenesNormalizadas = response.data.imagen;
        } else if (response.data.imagen) {
          imagenesNormalizadas = [response.data.imagen];
        }
        setProduct({
          ...response.data,
          imagenes: imagenesNormalizadas,
        });
        // Establecer la imagen inicial (la primera del array normalizado)
        const primeraImagen = imagenesNormalizadas[0];
        setImagenSeleccionada(
          primeraImagen ? getImageUrl(primeraImagen) : null,
        );
      } catch (error) {
        setError("Error al cargar el producto.");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [prodId]);


  const handleAddToCart = (productId) => {
    const quantity = 1;
    addProductToCart(productId, quantity);
        Swal.fire({
      icon: 'success',
      title: 'Producto agregado al carrito',
      text: 'El producto ha sido agregado al carrito correctamente',
      confirmButtonColor: '#28a745',
      timer: 2500,
      showConfirmButton: true,
    });
  };
  const descripcionFormateada = product?.descripcion?.replace(/\\n/g, "\n");

  if (loading) {
    return <div>Cargando...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="product-detail-section">
      <Link className="li-volver-productos" to={'/productos'}>⬅ Volver a Productos</Link>
      {product && (
        <div className="product-detail-grid">
          <div>
            <img
              src={imagenSeleccionada}
              alt={product.name || "Producto"}
              className="product-card-imagen-detail"
              onError={(e) => {
                const attemptedUrl = e.target.src;
                console.error("❌ Error cargando imagen del producto:", {
                  producto: product.name,
                  rutaOriginal: product.imagen,
                  urlIntentada: attemptedUrl,
                  apiUrl:
                    import.meta.env.VITE_API_URL || "http://localhost:3000",
                });
                e.target.src = "/vite.svg";
              }}
            />
            <div className="thumbnails-container">
              {product.imagenes.map((imagen, index) => {
                const imagenUrl = getImageUrl(imagen);
                return (
                  <img
                    key={index}
                    className={`thumbnail ${imagenSeleccionada === imagenUrl ? "thumbnail-active" : ""}`}
                    src={imagenUrl}
                    alt={`${product.name} - Imagen ${index + 1}`}
                    onClick={() => setImagenSeleccionada(imagenUrl)}
                    onError={(e) => {
                      console.error(
                        `❌ Error cargando thumbnail ${index + 1}:`,
                        {
                          rutaOriginal: imagen,
                          urlIntentada: e.target.src,
                        },
                      );
                      e.target.src = "/vite.svg";
                    }}
                  />
                );
              })}
            </div>
          </div>
          <div className="product-detail-content">
            <div>
              <h2>{product.name}</h2>
              <div className="precio-container">
                <strong>SKU:</strong>
                <p>{product.sku}</p>
              </div>
            </div>
            <div>
              {" "}
              <strong>Descripción:</strong>
            
                {" "}
                {descripcionFormateada.split("\n").map((linea, i) => (
                  <p key={i}>{linea.trim()}</p>
                ))}
              
            </div>
            <div className="precio-container">
              <strong>Precio:</strong>
              <p>${product.precio}</p>
            </div>
            <div>
              <button className="btn-agregar-carrito" onClick={() => handleAddToCart(product._id)}>
                Agregar al Carrito
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDetail;
