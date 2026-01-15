import React from 'react';
import '../css/navigation/Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className='navbar-container'>
            <div className='navbar-div-content-1'>
                <ul className='ul-div'>
                    <li>
                        <Link className='li-none' to={'/contacto'}>
                            Contacto</Link>
                    </li>
                    <li>
                        <Link className='li-none' to={'/nosotros'}>Nosotros</Link>
                    </li>
                    <li>
                        <Link className='li-none' to={'/faq'}>Preguntas Frecuentes</Link>
                    </li>
                    <li>Quiero Registrarme</li>
                    <li>Ingresar</li>
                </ul>
            </div>
            <div className='navbar-div-content-2'>
                <Link to={'/'}><img className='logo-home' src="/logo-wp.jpeg" alt="logo-course" /></Link>
            </div>
            <div className='navbar-div-content-2'>
                <ul className='ul-div-2'>
                    <li>MESA</li>
                    <li>TEXTILES</li>
                    <li>JARDÍN</li>
                    <li>COCINA</li>
                    <li>DECO</li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar