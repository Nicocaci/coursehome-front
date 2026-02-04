import Home from "./pages/Home.jsx";
import Navbar from "./navigation/Navbar.jsx";
import Contacto from "./pages/Contacto.jsx";
import Nosotros from "./pages/Nosotros.jsx";
import Footer from "./navigation/Footer.jsx";
import Faq from "./pages/Faq.jsx";
import Perfil from "./pages/Perfiles/Perfil.jsx";
import ItemDetail from "./pages/ItemDetail.jsx";
import CartDetail from "./pages/CartDetail.jsx";
import Checkout from "./pages/Checkout/Checkout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ProductosPage from "./pages/ProductosPage.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import "./App.css";

function App() {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <div id="root">
              <Navbar />
              <main>
                <Routes>
                  <Route exact path="/" element={<Home />} />
                  <Route exact path="/contacto" element={<Contacto />} />
                  <Route exact path="/nosotros" element={<Nosotros />} />
                  <Route exact path="/faq" element={<Faq />} />
                  <Route exact path="/productos" element={<ProductosPage />} />
                  <Route
                    exact
                    path="/productos/:prodId"
                    element={<ItemDetail />}
                  />
                  <Route
                    exact
                    path="/carrito/:cartId"
                    element={
                  <ProtectedRoute>
                    <CartDetail />
                   </ProtectedRoute> 
                    }
                  />
                  <Route
                    exact
                    path="/checkout/:cartId"
                    element={
                      <ProtectedRoute>
                        <Checkout />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    exact
                    path="/perfil"
                    element={
                      <ProtectedRoute>
                        <Perfil />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </>
  );
}

export default App;
