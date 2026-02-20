import React from 'react';
import "../../css/pages/Faq.css";
import { Link } from 'react-router-dom';

const Faq = () => {
  return (
    <div className='faq-section'>
        <div className='li-container'>
        <p className='faq-title'>Preguntas Frecuentes</p>
          <ul className='li-none-black'>
            <Link className='li-none-black' to='/faq/como-comprar'><li className='li-content'>Cómo Comprar?</li></Link>
            <Link className='li-none-black' to='/faq/como-logear'><li className='li-content'>Cómo Registrarse/Iniciar Sesión</li></Link>
            <Link className='li-none-black' to={'/faq/como-mayorista'}><li className='li-content'>Cómo Obtengo una cuenta Mayorista?</li></Link>
            <Link className='li-none-black' to={'/faq/como-cancelo'}><li className='li-content'>Cómo cancelo una compra?</li></Link>
            <Link className='li-none-black' to={'/faq/metodosPago'}><li className='li-content'>Cuáles son los Metodos de pago?</li></Link>
          </ul>
        </div>
    </div>
  )
}

export default Faq