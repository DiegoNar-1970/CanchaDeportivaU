import React, { useState } from 'react';
import moment from 'moment';

const CanchasAdmin   = () => {
  const [reservas, setReservas] = useState([
    {
      id: 1,
      nombre: 'Diego',
      cancha: 'Cancha de Fútbol A',
      tipo: 'Fútbol',
      fecha: '2025-06-28',
      hora_inicio: '08:00:00',
      hora_fin: '09:00:00',
      costo_total: 12000,
      img: 'https://i0.wp.com/www.construcanchas.com/wp-content/uploads/2021/03/fondo-3.jpg?w=1280&ssl=1  ',
    },
    {
      id: 2,
      nombre: 'Diego',
      cancha: 'Cancha de Busquet',
      tipo: 'Fútbol',
      fecha: '2025-06-25',
      hora_inicio: '09:00:00',
      hora_fin: '10:00:00',
      costo_total: 50000,
      img: 'https://phantom-marca-mx.unidadeditorial.es/651127d047ae3ecec86bfcf244f406a9/resize/828/f/jpg/mx/assets/multimedia/imagenes/2023/09/26/16957642774417.jpg	',
    },
    {
      id: 3,
      nombre: 'Diego',
      cancha: 'Cancha de  tennis',
      tipo: 'Fútbol',
      fecha: '2025-06-07',
      hora_inicio: '13:00:00',
      hora_fin: '14:00:00',
      costo_total: 50000,
      img: 'https://bogota.gov.co/sites/default/files/styles/1050px/public/2024-06/canchas-de-tenis-en-bogota_-reserva-gratis-en-los-parques-de-la-ciudad.png',
    },
    {
      id: 4,
      nombre: 'Diego',
      cancha: 'Cancha de  Futbol B',
      tipo: 'Fútbol',
      fecha: '2025-06-07',
      hora_inicio: '13:00:00',
      hora_fin: '14:00:00',
      costo_total: 50000,
      img: 'https://img.olympics.com/images/image/private/t_s_16_9_g_auto/t_s_w1460/f_auto/primary/tarhmadzucbnqb8wzhsg',
    },

  ]);

  const [form, setForm] = useState({ nombre: '', fecha: '', hora_inicio: '', hora_fin: '', costo_total: '' });
  const [editId, setEditId] = useState(null);

  const handleDelete = (id) => {
    setReservas(reservas.filter((r) => r.id !== id));
  };

  const handleEdit = (reserva) => {
    setForm(reserva);
    setEditId(reserva.id);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (editId) {
      setReservas(reservas.map((r) => (r.id === editId ? { ...form, id: editId, img: r.img } : r)));
      setEditId(null);
    } else {
      const newId = reservas.length ? Math.max(...reservas.map((r) => r.id)) + 1 : 1;
      setReservas([...reservas, { ...form, id: newId, nombre: 'Diego', cancha: 'Cancha de Fútbol A', tipo: 'Fútbol', img: 'https://cdn-icons-png.flaticon.com/512/854/854894.png' }]);
    }
    setForm({ nombre: '', fecha: '', hora_inicio: '', hora_fin: '', costo_total: '' });
  };

  const totalPagos = reservas.reduce((acc, r) => acc + Number(r.costo_total), 0);

  return (
    <div className="p-6 bg-white rounded-[20px] shadow-md py-7 px-7 font-sans">
      <div className="mb-6">
        <input className="border p-2 mr-2 rounded" name="fecha" type="date" value={form.fecha} onChange={handleChange} placeholder="Fecha" />
        <input className="border p-2 mr-2 rounded" name="hora_inicio" value={form.hora_inicio} onChange={handleChange} placeholder="Hora inicio (08:00:00)" />
        <input className="border p-2 mr-2 rounded" name="hora_fin" value={form.hora_fin} onChange={handleChange} placeholder="Hora fin (09:00:00)" />
        <input className="border p-2 mr-2 rounded" name="costo_total" type="number" value={form.costo_total} onChange={handleChange} placeholder="Costo" />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSubmit}>
          {editId ? 'Actualizar' : 'Crear'} Reserva
        </button>
      </div>

      <div className="overflow-x-auto shadow rounded-[20px]">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usuario</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cancha</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hora Inicio</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hora Fin</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Costo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Imagen</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reservas.map((reserva) => (
              <tr key={reserva.id}>
                <td className="px-6 py-4 text-sm text-gray-900">{reserva.nombre}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{reserva.cancha}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{reserva.tipo}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{moment(reserva.fecha).format('DD/MM/YYYY')}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{reserva.hora_inicio}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{reserva.hora_fin}</td>
                <td className="px-6 py-4 text-sm text-gray-500">${Number(reserva.costo_total).toLocaleString('es-CO')}</td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <img src={reserva.img} alt="User" className="w-10 h-10 rounded-full" />
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <div className="flex gap-2">
                    <button className="text-red-500" onClick={() => handleDelete(reserva.id)}>Eliminar</button>
                    <button className="text-blue-500" onClick={() => handleEdit(reserva)}>Actualizar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CanchasAdmin;
