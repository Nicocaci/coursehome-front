import React from 'react';
import '../css/pages/Contacto.css';
import { FaWhatsapp } from "react-icons/fa";
import { FcIphone } from "react-icons/fc";

const Contacto = () => {
  return (
    <div className='contacto-section'>
        <div className='contacto-content'>
          <h3 className='titulo-contacto'> ¿Querés hablar con nosotros?</h3>
          <p className='wp-contacto'>Escribinos por <strong>WhatsApp</strong><FaWhatsapp size={'30px'}/></p>
          <p className='wp-contacto' >O llamanos al <strong>11 2345-6789</strong> <FcIphone size={'30px'}/></p>
        </div>

        <div className='contacto-form'>
          <div className='form-header'>
            <h3 className='titulo-contacto'>¿Consultas mayoristas?</h3>
            <p className='form-content'>Si estás interesado en compras al por mayor o necesitás información adicional, dejá tu mensaje y nos pondremos en contacto a la brevedad.</p>
          </div>
          <div className='form-container'>
            <form>
              <div className='form-group'>
                <label htmlFor='nombre'>Nombre:</label>
                <input type='text' id='nombre' name='nombre' required />
              </div>
              <div className='form-group'>
                <label htmlFor='email'>Email:</label>
                <input type='email' id='email' name='email' required />
              </div>
              <div className='form-group'>
                <label htmlFor="telefono">Teléfono:</label>
                <input type="tel" id="telefono" name="telefono" />
              </div>
              <div className='form-group'>
                <label htmlFor='mensaje'>Mensaje:</label>
                <textarea id='mensaje' name='mensaje' rows='4' required></textarea>
              </div>
              <button className='btn-form' type='submit'>Enviar</button>
            </form>
          </div>
        </div>
    </div>
  )
}

export default Contacto