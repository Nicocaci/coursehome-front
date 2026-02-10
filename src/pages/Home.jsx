import React from "react";
import { useEffect, useState } from "react";
import "../css/pages/Home.css";
import { Link } from "react-router-dom";

const videos = [
  "/platos-home.mp4",
  "/pava-home.mp4",
  "/platos-home.mp4",
  "/pava-home.mp4",
];

const Home = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % videos.length);
    }, 5000); // 5 segundos

    return () => clearInterval(interval);
  }, []);
  return (
    <div>
      {/* Header */}
      {/* <div className="home-header">
        <h1 className="home-title">CF || HOME & DECO</h1>
        <p className="home-subtitle">Tu hogar, nuestro estilo</p>
      </div>  */}
      {/* Video */}
      <div className="foto-container">
        <video
          key={videos[current]}
          className="video-home"
          autoPlay
          muted
          loop
          playsInline
          src={videos[current]}
        />
      </div>
      {/* Card de Productos */}
      <div className="ofertas-container">
        <h1 className="titulo-ofertas">OFERTAS IMPERDIBLES</h1>
        <div className="card-container">
          <div className="card">
            <img className="img-card" src="/foto-3.jpg" alt="foto-3" />
            <div className="card-description">
              <h3>Set de Platos</h3>
              <p className="text-card">$100000</p>
            </div>
          </div>
          <div className="card">
            <img className="img-card" src="/parrilla-1.jpg" alt="parilla" />
            <div className="card-description">
              <h3>Set de Platos</h3>
              <p className="text-card">$100000</p>
            </div>
          </div>
          <div className="card">
            <img className="img-card" src="/plato-ondo.jpg" alt="dard" />
            <div className="card-description">
              <h3>Set de Platos Ondos</h3>
              <p className="text-card">$100000</p>
            </div>
          </div>
          <div className="card">
            <img className="img-card" src="/jarron.jpg" alt="dard" />
            <div className="card-description">
              <h3>Jarron de Vidrio</h3>
              <p className="text-card">$100000</p>
            </div>
          </div>
          <div className="card">
            <img className="img-card" src="/set-platos.jpg" alt="dard" />
            <div className="card-description">
              <h3>Set de Platos</h3>
              <p className="text-card">$100000</p>
            </div>
          </div>
        </div>
      </div>
      {/* Categories */}
      <div className="categories-container">
        <p className="titulo-categories">Categorias Destacadas</p>
        <div className="card-categories-container">
          <Link to={"/productos?category=Mesa&page=1"}>
            <div className="card-categories-mesa">
              <p className="card-titulo">MESA</p>
            </div>
          </Link>
          <Link to={"/productos?category=Textiles&page=1"}>
            <div className="card-categories-textiles">
              <p className="card-titulo">TEXTILES</p>
            </div>
          </Link>
          <Link to={"/productos?category=Jardín&page=1"}>
            <div className="card-categories-jardin">
              <p className="card-titulo">JARDÍN</p>
            </div>
          </Link>
          <Link to={"/productos?category=Cocina&page=1"}>
            <div className="card-categories-cocina">
              <p className="card-titulo">COCÍNA</p>
            </div>
          </Link>
          <Link to={"/productos?category=Deco&page=1"}>
            <div className="card-categories-deco">
              <p className="card-titulo">DECO</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Contacto */}
      <div className="contacto-container">
        <p className="titulo-contacto">ASESORAMINETO GRATUITO</p>
        <Link to="/contacto">
          <button className="btn-contacto">Contactanos</button>
        </Link>
        <p className="subtitulo-contacto">ESTAMOS PARA AYUDARTE</p>
      </div>
    </div>
  );
};

export default Home;
