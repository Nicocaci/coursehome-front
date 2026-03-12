import { useRef, useEffect, useState } from "react";
import { useCart } from "../context/CartContext.jsx";
import { Link } from "react-router-dom";
import { getImageUrl } from "../utils/imageUtils.js";
import "../css/components/CartDropdown.css";
import axiosInstance from "../utils/axiosConfig.js";

const CartDropdown = ({ onClose }) => {
  const { cart, clearCart, updateProductQuantity } = useCart();
  const products = cart?.products || [];
  const [productsWithDetails, setProductsWithDetails] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    console.log("CartDropdown - products:", products);
    const fetchProducts = async () => {
      const details = await Promise.all(
        products.map(async (item) => {
          console.log("CartDropdown - item:", item);

          // Si el producto ya tiene datos completos
          if (
            item.product &&
            typeof item.product === "object" &&
            item.product.name
          ) {
            return item;
          }

          // Intentar extraer el ID del producto
          let productId = null;

          if (item.product && typeof item.product === "string") {
            // El servidor mandó solo el ID del producto
            productId = item.product;
          } else if (
            item.product &&
            typeof item.product === "object" &&
            (item.product._id || item.product.id)
          ) {
            // El servidor mandó un objeto con datos pero incompleto
            productId = item.product._id || item.product.id;
          } else if (item.product_id) {
            productId = item.product_id;
          } else if (item._id || item.id) {
            // Fallback a item._id si no hay product info
            productId = item._id || item.id;
          }

          if (!productId) {
            console.warn("No productId found for item:", item);
            return item;
          }

          // Solo fetch si no tenemos datos completos
          if (
            !item.product ||
            typeof item.product !== "object" ||
            !item.product.name
          ) {
            try {
              console.log("Fetching product:", productId);
              const res = await axiosInstance.get(`/api/products/${productId}`);
              console.log("Fetched product:", res.data);
              return { ...item, product: res.data };
            } catch (error) {
              console.error("Error fetching product:", error);
              return item;
            }
          }

          return item;
        }),
      );
      setProductsWithDetails(details);
    };
    if (products.length > 0) {
      fetchProducts();
    }
  }, [products]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Verificar si el clic fue fuera del dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // Verificar si el clic NO fue en el botón del carrito ni en su wrapper
        const cartButton = event.target.closest(".navbar-cart-wrapper");
        if (!cartButton) {
          onClose();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const total = productsWithDetails.reduce((acc, item) => {
    const product =
      item.product && typeof item.product === "object" ? item.product : item;
    const price = product.precio || 0;
    const quantity = item.quantity || 1;
    return acc + price * quantity;
  }, 0);

  return (
    <div className="cart-dropdown" ref={dropdownRef}>
      <div className="cart-dropdown-header">
        <h4 className="titulo-cartdropdown">Mi carrito</h4>
        <button className="cart-dropdown-close" onClick={onClose}>
          ×
        </button>
      </div>

      {products.length === 0 ? (
        <div className="cart-dropdown-empty">Tu carrito está vacío</div>
      ) : productsWithDetails.length === 0 ? (
        <div className="cart-dropdown-empty">Cargando productos...</div>
      ) : (
        <>
          <div className="cart-dropdown-items">
            {productsWithDetails.map((item) => {
              // Obtener el objeto producto
              const product =
                item.product && typeof item.product === "object"
                  ? item.product
                  : item;

              // Extraer el ID del producto - primero del product, luego del item como fallback
              let productId = null;
              if (item.product && typeof item.product === "string") {
                productId = item.product;
              } else if (product._id) {
                productId = product._id;
              } else if (product.id) {
                productId = product.id;
              } else if (item.product_id) {
                productId = item.product_id;
              } else if (item._id) {
                productId = item._id;
              } else if (item.id) {
                productId = item.id;
              }

              const id = productId;
              const name = product.name || "Producto";
              const quantity = item.quantity || 1;
              const price = product.precio || 0;
              const imagen = Array.isArray(product.imagen)
                ? product.imagen[0]
                : product.imagen;

              return (
                <div className="cart-dropdown-item" key={id || Math.random()}>
                  <img
                    src={getImageUrl(imagen)}
                    alt={name}
                    className="cart-dropdown-image"
                    onError={(e) => {
                      e.target.src = "/vite.svg";
                    }}
                  />
                  <div className="cart-dropdown-info">
                    <span className="cart-dropdown-name">{name}</span>
                    <div className="cart-dropdown-qty-container">
                      <span className="cart-dropdown-qty">
                        Cantidad: {quantity}
                      </span>
                      <svg
                        onClick={() =>
                        updateProductQuantity(productId, quantity - 1)
                        }
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="icono-delete"
                        viewBox="0 0 16 16"
                      >
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                      </svg>
                    </div>
                    <span className="cart-dropdown-price">${price}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="cart-dropdown-footer">
            <span>Total: ${total.toFixed(2)}</span>
            <div className="cart-dropdown-footer-buttons">
              <button
                className="cart-dropdown-clear"
                onClick={() => clearCart(null)}
              >
                Limpiar carrito
              </button>
              <Link to={`/carrito`} onClick={onClose}>
                <button className="cart-dropdown-checkout">
                  Ir al carrito
                </button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartDropdown;
