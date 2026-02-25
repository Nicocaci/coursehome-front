import React, { useEffect, useState } from "react";
import "../css/pages/CartDetail.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { getImageUrl } from "../utils/imageUtils.js";

const CartDetail = () => {
  const navigate = useNavigate();
  const {
    cart,
    getCart,
    updateProductQuantity,
    error: cartError,
    loading,
  } = useCart();

  const [error, setError] = useState(null);
  const [updatingQuantities, setUpdatingQuantities] = useState({});

  useEffect(() => {
    const fetchCart = async () => {
      try {
        await getCart();
      } catch (error) {
        setError(error.message || "Error al cargar el carrito");
      }
    };

    fetchCart();
  }, [getCart]);

  const handleQuantityChange = async (productId, newQuantity) => {
    const quantity = parseInt(newQuantity, 10);
    if (isNaN(quantity) || quantity < 0) return;

    setUpdatingQuantities((prev) => ({ ...prev, [productId]: true }));

    try {
      await updateProductQuantity(productId, quantity);
    } catch (error) {
      setError(error.message || "Error al actualizar la cantidad");
    } finally {
      setUpdatingQuantities((prev) => {
        const copy = { ...prev };
        delete copy[productId];
        return copy;
      });
    }
  };

  if (error || cartError) {
    return <div className="cart-detail-error">Error: {error || cartError}</div>;
  }

  if (!cart || !cart.products?.length) {
    return <div>Tu carrito está vacío</div>;
  }

  const total = cart.products.reduce((acc, item) => {
    const price =
      item.product?.precio ||
      item.product?.price ||
      item.precio ||
      item.price ||
      0;

    const quantity = item.quantity || item.cantidad || 1;

    return acc + price * quantity;
  }, 0);

  return (
    <div className="cart-detail-container">
      <h1 className="cart-detail-title">Mi Carrito</h1>

      <div className="cart-detail-products-list">
        {cart.products.map((item) => {
          const productId =
            typeof item.product === "string"
              ? item.product
              : item.product?._id || item.product?.id;

          return (
            <div key={productId} className="cart-detail-products-list-item">
              <img
                src={getImageUrl(
                  Array.isArray(item.product?.imagen)
                    ? item.product.imagen[0]
                    : Array.isArray(item.product?.imagenes)
                      ? item.product.imagenes[0]
                      : item.product?.imagen,
                )}
                alt={item.product?.name || "Producto"}
                className="cart-dropdown-image"
                onError={(e) => {
                  e.target.src = "/vite.svg";
                }}
              />

              <h3 className="cart-detail-products-list-title">
                {item.product?.name}
              </h3>

              <p className="cart-detail-price">
                Precio: ${item.product?.precio}
              </p>

              <div className="cart-detail-quantity">
                <label htmlFor={`quantity-${productId}`}>Cantidad:</label>

                <input
                  type="number"
                  id={`quantity-${productId}`}
                  min="0"
                  value={item.quantity || item.cantidad || 1}
                  onChange={(e) =>
                    handleQuantityChange(productId, e.target.value)
                  }
                  disabled={updatingQuantities[productId]}
                  className="cart-detail-quantity-input"
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="cart-detail-total">
        <button
          className="cart-detail-checkout"
          onClick={() => navigate("/checkout")}
        >
          Finalizar compra
        </button>

        <span className="cart-detail-total-text">
          Total: ${total.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default CartDetail;
