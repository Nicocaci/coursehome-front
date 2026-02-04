import React, { useState } from "react";
import "../css/pages/Nosotros.css";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { FaTruck } from "react-icons/fa";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { GrCatalogOption } from "react-icons/gr";

import CountUp from "react-countup";

const Nosotros = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.4, // % visible para disparar
  });

  // referencia separada para la animación de la imagen
  const { ref: imageRef, inView: imageInView } = useInView({
    triggerOnce: true,
    threshold: 0.4,
  });
  const [counted1, setCounted1] = useState(false);
  const [counted2, setCounted2] = useState(false);
  const [counted3, setCounted3] = useState(false);
  return (
    <>
      <section className="nosotros-container">
        <div className="nosotros-content">
          <motion.div ref={imageRef} className="image-wrapper">
            {/* Overlay rojo: entra (0->1) y luego sale (1->0) */}
            <motion.div
              className="image-reveal"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: [0, 1, 0] }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{
                duration: 1.2,
                ease: "easeInOut",
                times: [0, 0.5, 1],
              }}
            />

            {/* Imagen: aparece después de que el overlay terminó */}
            <motion.img
              src="/fondo-contacto.jpg"
              alt="set-platos"
              className="img-nosotros"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: 0.5, duration: 0.35 }}
            />
          </motion.div>

          <div className="nosotros-text">
            <p className="cf-titulo">CF || Home & Deco</p>
            <h2 className="cf-subtitulo">
              Donde nos necesites... Ahí estamos
            </h2>
            <p className="cf-contenido">
              En CF Home creemos que una mesa bien puesta es una forma de
              expresión.
            </p>
          </div>
        </div>
      </section>

      <div ref={ref} className="nosotros-stats">
        <div className="stats-group">
          <p className="stats-numero">
            {counted1 ? (
              10
            ) : inView ? (
              <CountUp end={10} duration={5} onEnd={() => setCounted1(true)} />
            ) : (
              ""
            )}{" "}
            +
          </p>
          <p className="stats-texto">Años de trayectoria</p>
        </div>
        <div className="stats-group">
          <p className="stats-numero">
            {counted2 ? (
              1000
            ) : inView ? (
              <CountUp end={1000} duration={2} onEnd={() => setCounted2(true)} />
            ) : (
              ""
            )}{" "}
            +
          </p>
          <p className="stats-texto">Entregas Hechas</p>
        </div>
        <div className="stats-group">
          <p className="stats-numero">
            {counted3 ? (
              1000
            ) : inView ? (
              <CountUp end={1000} duration={5} onEnd={() => setCounted3(true)} />
            ) : (
              ""
            )}{" "}
            +
          </p>
          <p className="stats-texto">Clientes</p>
        </div>
      </div>

      <section className="nostros-container">
        <div className="nosotros-content-2">
          <div className="nosotros-text-2">
            <p style={{ color: "#ffffff" }}>
              Somos una marca dedicada a la selección y creación de vajilla,
              cristalería y cubertería de alta calidad, pensadas para
              transformar cada comida en una experiencia especial.
            </p>
            <p style={{ color: "#ffffff" }}>
              Nos especializamos en el armado de mesas con diseños exclusivos,
              donde la elegancia, la armonía y los detalles marcan la
              diferencia. Cada pieza es elegida cuidadosamente, combinando
              estética, funcionalidad y materiales nobles, para lograr mesas
              sofisticadas y atemporales.
            </p>
          </div>
          <div className="nosotros-imagen">
            <img
              className="img-nosotros"
              style={{ boxShadow: "0 8px 8px rgba(255, 255, 255, 0.15)" }}
              src="/jarron.jpg"
              alt="foto-Jarron"
            />
          </div>
        </div>
      </section>

      <div className="nosotros-stats-2">
        <div className="stats-group-2">
          <FaTruck className="stats-icons" size={50} color="#000000" />
          <p className="stats-texto">Envíos a domicilio</p>
        </div>
        <div className="stats-group-2">
          <AiFillSafetyCertificate className="stats-icons" size={50} color="#000000" />
          <p className="stats-texto">Garantía Oficial</p>
        </div>
        <div className="stats-group-2">
          <GrCatalogOption className="stats-icons" size={50} color="#000000" />
          <p className="stats-texto">Amplio Catalogo</p>
        </div>
      </div>

      <section className="nosotros-container-2">
        <div className="nosotros-content">
          <div className="nosotros-image">
            <img
              className="img-nosotros"
              src="/set-platos.jpg"
              alt="foto-platos"
            />
          </div>
          <div className="nosotros-text">
            <p className="cf-contenido-2">
              En CF Home acompañamos tanto los momentos cotidianos como las
              ocasiones especiales, ofreciendo propuestas que elevan el arte de
              recibir y reflejan un estilo refinado y contemporáneo. Porque
              creemos que el verdadero lujo está en los detalles.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Nosotros;
