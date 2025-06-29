
import moment from 'moment';
import { useState } from 'react';
import PopPap from './PopPap'
import GenericForm from './GenericForm';
import { UpdateReserva, delReserva, CreateReserva, INPUT_UPDATE,INPUT_CREATE } from '../../Helpers/FunctiosActions';
import DeleteAction from './DeleteAction';
import { GlobalContext } from '../../Context/State';

const ReservasTable = ({reservas,setIsloading}) => {
  const {user} = GlobalContext()
  console.log(user)
  const totalReservas = reservas.length
  const [viewModal,setViewModal] = useState(null);
  const [selected,setSelected] = useState(null);
  const totalPagos = reservas.reduce((acumulador, reserva)=>acumulador + reserva.costo_total ,0)

  const ClosePopap=()=>{
    setViewModal(null)
  }

  const valorFormateado = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0 // sin decimales
    });

  return (
    <div className="p-6 bg-white rounded-[20px] shadow-md py-7 px-7 ">
      <div className="flex justify-between items-center mb-4 rounded-[20px]">
        <div className='flex w-full h-full justify-between'>
          <div className='flex gap-10'>
            <span className='font-bold text-[20px]'>Total de pagos {valorFormateado.format(totalPagos)} </span>
            <span className='font-bold text-[20px]'>Total de Reservas {totalReservas}</span>
          </div>
          
          {user.role === 'admin' && (
            <button onClick={()=>{setViewModal('create')}}
              className='bg-blue-500 p-2 rounded-[20px] text-white' >Crear Una reserva
            </button>
          )}
        </div>
      </div> 
      <div className="overflow-x-auto shadow rounded-[20px]">
        <table className="min-w-full divide-y divide-gray-200 ">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cancha</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hora Inicio</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hora Fin</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Costo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Imagen</th>
              {user.rol==='admin'&&
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              }
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reservas.map((reserva, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{reserva.nombre}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reserva.nombre_cancha}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reserva.tipo}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {moment(reserva.fecha_reserva).format('DD/MM/YYYY')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reserva.hora_inicio}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reserva.hora_fin}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${reserva.costo_total.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <img src={reserva.img} alt="User" className="w-10 h-10 rounded-full" />
                </td>
                {user.rol==='admin'&&(
                <td className=" ">
                  <div className='flex  gap-3 '>
                    <button className='' onClick={()=>{setViewModal('delete'), setSelected(reserva)}}>Eliminar</button>
                    <button className='' onClick={()=>{setViewModal('update'), setSelected(reserva)}}>Actualizar</button>
                  </div>
                </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {viewModal === 'update' && (
         <PopPap 
            data={selected}
            component={GenericForm}
            onClose={ClosePopap}
            inputs={INPUT_UPDATE}
            request={UpdateReserva}
            setIsloading={setIsloading}
          />
      )}
      {viewModal === 'delete' && (
        <PopPap 
            data={selected}
            component={DeleteAction}
            onClose={ClosePopap}
            request={delReserva}
          />
      )}
      {viewModal === 'create' && (
        <PopPap 
            component={GenericForm}
            onClose={ClosePopap}
            inputs={INPUT_CREATE}
            request={CreateReserva}
          />
      )}
    </div>
  );
};

export default ReservasTable;
