import React from "react";
import { useState, useContext, useEffect, useRef } from "react";
import AuthModal from "../components/AuthModal.jsx";
import { AuthContext } from "../context/AuthContext.jsx";
import axiosInstance from "../utils/axiosConfig.js";
import "../css/navigation/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import CartDropdown from "../components/CartDropdown.jsx";
import { useCart } from "../context/CartContext.jsx";

const Navbar = () => {
  const { isAuthenticated, logOut } = useContext(AuthContext);
  const { cart } = useCart();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const [showProductsDropdown, setShowProductsDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoriasOpen, setCategoriasOpen] = useState(false);
  const navigate = useNavigate();

  const handleUserIconClick = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
    } else {
      navigate("/perfil");
    }
  };
  const handleCartIconClick = () => {
    setShowCartDropdown((prev) => !prev);
  };
  const handleCloseModal = () => setShowAuthModal(false);
  const cartItemsCount =
    cart?.products?.reduce((acc, p) => acc + (p.quantity || 0), 0) || 0;

  const dropdownRef = useRef(null);
  const hideTimeoutRef = useRef(null);

  const openDropdown = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    setShowProductsDropdown(true);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(e.target)) {
        setShowProductsDropdown(false);
      }
    };

    if (showProductsDropdown) {
      document.addEventListener("mousedown", handleDocumentClick);
    }

    return () => document.removeEventListener("mousedown", handleDocumentClick);
  }, [showProductsDropdown]);

  // Close dropdown on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setShowProductsDropdown(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);
  useEffect(() => {
    if (!showCartDropdown) return;

    const handleScroll = () => {
      setShowCartDropdown(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showCartDropdown]);

  return (
    <div className="navbar-container">
      <div className="navbar-div-content-1">
        <ul className={`ul-div ${menuOpen ? "open" : ""}`}>
          <li>
            <Link className="li-none" to={"/contacto"}>
              Contacto
            </Link>
          </li>
          <li>
            <Link className="li-none" to={"/nosotros"}>
              Nosotros
            </Link>
          </li>
          <li>
            <Link className="li-none" to={"/faq"}>
              Preguntas Frecuentes
            </Link>
          </li>
          <li
            className="btn-logout"
            onClick={handleUserIconClick}
            title={isAuthenticated ? "Mi cuenta" : "Iniciar sesión"}
          >
            Mi Perfil
          </li>
          <li>
            {isAuthenticated && (
              <button className="btn-logout" onClick={logOut}>
                <Link className="li-none" to={"/"}>
                  Cerrar Sesión
                </Link>
              </button>
            )}
          </li>
        </ul>
        {/* BOTON HAMBUREGUESA */}
        <button
          className="hamburger-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu color="#ffffff" />}
        </button>
      </div>
      <div className="navbar-logo-content">
        <Link to={"/"}>
          <img className="logo-home" src="/logo-wp.jpeg" alt="logo-course" />
        </Link>
      </div>
      <div className="navbar-div-content-2">
        {/* BOTON MOBILE */}
        <button
          className="categorias-btn"
          onClick={() => setCategoriasOpen(!categoriasOpen)}
        >
          Ver categorías
        </button>
        <ul className={`ul-div-2 ${categoriasOpen ? "open" : ""}`}>
          <li>MESA</li>
          <li>TEXTILES</li>
          <li>JARDÍN</li>
          <li>COCINA</li>
          <li>DECO</li>
          <li>
            <Link className="li-none-black" to={"/productos"}>
              PRODUCTOS
            </Link>
          </li>
        </ul>
        <div className="navbar-flex-cart">
          <div className="navbar-cart-wrapper">
            <button className="btn-cart" onClick={handleCartIconClick}>
              <FaShoppingCart size={"30px"} />
              {cartItemsCount > 0 && (
                <span className="cart-count">{cartItemsCount}</span>
              )}
            </button>
            {showCartDropdown && (
              <CartDropdown onClose={() => setShowCartDropdown(false)} />
            )}
          </div>
        </div>
      </div>

      {showAuthModal && <AuthModal onClose={handleCloseModal} />}
    </div>
  );
};

export default Navbar;
