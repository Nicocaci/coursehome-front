import React, { useState, useContext, useEffect, useRef } from "react";
import AuthModal from "../components/AuthModal.jsx";
import { AuthContext } from "../context/AuthContext.jsx";
import "../css/navigation/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import CartDropdown from "../components/CartDropdown.jsx";
import { useCart } from "../context/CartContext.jsx";

const Navbar = () => {
  const { isAuthenticated, logOut } = useContext(AuthContext);
  const { cart } = useCart();
  const navigate = useNavigate();

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoriasOpen, setCategoriasOpen] = useState(false);

  const menuRef = useRef(null);
  const categoriasRef = useRef(null);

  const cartItemsCount =
    cart?.products?.reduce((acc, p) => acc + (p.quantity || 0), 0) || 0;

  // -------------------------
  // HANDLERS
  // -------------------------

  const handleUserClick = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
    } else {
      navigate("/perfil");
    }
  };

  const handleCloseMenus = () => {
    setMenuOpen(false);
    setCategoriasOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
    setCategoriasOpen(false);
  };

  const toggleCategorias = () => {
    setCategoriasOpen((prev) => !prev);
    setMenuOpen(false);
  };

  // -------------------------
  // CLOSE ON CLICK OUTSIDE
  // -------------------------

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }

      if (categoriasRef.current && !categoriasRef.current.contains(e.target)) {
        setCategoriasOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // -------------------------
  // CLOSE CART ON SCROLL
  // -------------------------

  useEffect(() => {
    if (!showCartDropdown) return;

    const handleScroll = () => setShowCartDropdown(false);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [showCartDropdown]);

  return (
    <div className="navbar-container">
      {/* ---------------- LEFT MENU ---------------- */}
      <div className="navbar-div-content-1">
        <ul ref={menuRef} className={`ul-div ${menuOpen ? "open" : ""}`}>
          <li >
            <Link className="li-none"  to="/contacto" onClick={handleCloseMenus}>
              Contacto
            </Link>
          </li>
          <li>
            <Link className="li-none" to="/nosotros" onClick={handleCloseMenus}>
              Nosotros
            </Link>
          </li>
          <li>
            <Link className="li-none" to="/faq" onClick={handleCloseMenus}>
              Preguntas Frecuentes
            </Link>
          </li>

          <li className="btn-login" onClick={handleUserClick}>Mi Perfil</li>

          {isAuthenticated && (
            <li>
              <button
                className="btn-logout"
                onClick={() => {
                  logOut();
                  handleCloseMenus();
                }}
              >
                Cerrar Sesión
              </button>
            </li>
          )}
        </ul>

        <button className="hamburger-btn" onClick={toggleMenu}>
          {menuOpen ? <FiX /> : <FiMenu color="#ffffff" />}
        </button>
      </div>

      {/* ---------------- LOGO ---------------- */}
      <div className="navbar-logo-content">
        <Link to="/" onClick={handleCloseMenus}>
          <img className="logo-home" src="/logo-wp.jpeg" alt="logo" />
        </Link>
      </div>

      {/* ---------------- RIGHT SIDE ---------------- */}
      <div className="navbar-div-content-2">
        <button className="categorias-btn" onClick={toggleCategorias}>
          Ver categorías
        </button>

        <ul
          ref={categoriasRef}
          className={`ul-div-2 ${categoriasOpen ? "open" : ""}`}
        >
          {["Mesa", "Textiles", "Jardín", "Cocina", "Deco"].map((cat) => (
            <li key={cat}>
              <Link
                className="li-none-black"
                to={`/productos?category=${cat}&page=1`}
                onClick={handleCloseMenus}
              >
                {cat.toUpperCase()}
              </Link>
            </li>
          ))}

          <li>
            <Link className="li-none-black" to="/productos" onClick={handleCloseMenus}>
              PRODUCTOS
            </Link>
          </li>
        </ul>

        {/* CART */}
        <div className="navbar-flex-cart">
          <button
            className="btn-cart"
            onClick={() => setShowCartDropdown((prev) => !prev)}
          >
            <FaShoppingCart size="30px" />
            {cartItemsCount > 0 && (
              <span className="cart-count">{cartItemsCount}</span>
            )}
          </button>

          {showCartDropdown && (
            <CartDropdown onClose={() => setShowCartDropdown(false)} />
          )}
        </div>
      </div>

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </div>
  );
};

export default Navbar;
