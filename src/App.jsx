import Home from "./pages/Home.jsx";
import Navbar from "./navigation/Navbar.jsx";
import Contacto from "./pages/Contacto.jsx";
import Nosotros from "./pages/Nosotros.jsx";
import Footer from "./navigation/Footer.jsx";
import Faq from "./pages/Faq/Faq.jsx";
import Perfil from "./pages/Perfiles/Perfil.jsx";
import ItemDetail from "./pages/ItemDetail.jsx";
import CartDetail from "./pages/CartDetail.jsx";
import Checkout from "./pages/Checkout/Checkout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ComoComprar from "./pages/Faq/ComoComprar.jsx";
import ComoLogear from "./pages/Faq/ComoLogear.jsx";
import ComoMayorista from "./pages/Faq/ComoMayorista.jsx";
import ComoCancelo from "./pages/Faq/ComoCancelo.jsx";
import MetodosPago from "./pages/Faq/MetodosPago.jsx";
import ProductosPage from "./pages/ProductosPage.jsx";
import ScrollToTop from "./utils/ScrollToTop.jsx";
import Gracias from "./pages/Gracias/Gracias.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import WpButton from "./components/WpButton.jsx";
import "./App.css";

function App() {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <ScrollToTop />
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
                    path="/faq/como-comprar"
                    element={<ComoComprar />}
                  />
                  <Route
                    exact
                    path="/faq/como-logear"
                    element={<ComoLogear />}
                  />
                  <Route
                    exact
                    path="/faq/como-mayorista"
                    element={<ComoMayorista />}
                  />
                  <Route
                    exact
                    path="/faq/como-cancelo"
                    element={<ComoCancelo />}
                  />
                  <Route
                    exact
                    path="/faq/metodosPago"
                    element={<MetodosPago />}
                  />
                  <Route
                    exact
                    path="/productos/:prodId"
                    element={<ItemDetail />}
                  />
                  <Route path="/carrito" element={<CartDetail />} />
                  <Route path="/gracias" element={<Gracias />} />

                  <Route
                    path="/checkout"
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
                <WpButton />
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
