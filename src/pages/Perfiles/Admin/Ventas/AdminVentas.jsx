import React from 'react';
import DetalleVentas from './DetalleVentas.jsx';
import UltimasOrdenes from './UltimasOrdenes.jsx';
import '../../../../css/pages/Perfiles/AdminOrder.css'

const AdminVentas = () => {
  return (
    <div className='admin-section'>
        <div>
            <p className='titulo-admin-section'> 
                Dashboard Ventas
            </p>
            <div>
              <DetalleVentas />
            </div>
            <div>
              <UltimasOrdenes />
            </div>
        </div>

    </div>
  )
}

export default AdminVentas;