import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const API_URL = "http://localhost:8080/cancha";

const CanchasAdmin = () => {
  const [canchas, setCanchas] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCancha, setEditingCancha] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetchCanchas();
  }, []);

  const fetchCanchas = async () => {
    try {
      const res = await axios.get(`${API_URL}/get-all`);
      setCanchas(res.data);
    } catch (err) {
      console.error("Error al obtener canchas", err);
    }
  };

  const onSubmit = async (data) => {
    try {
      if (editingCancha) {
        await axios.put(`${API_URL}/${editingCancha.id_cancha}`, data);
      } else {
        await axios.post(`${API_URL}/create`, data);
      }
      fetchCanchas();
      closeModal();
    } catch (error) {
      console.error("Error al guardar cancha", error);
    }
  };

  const openModal = (cancha = null) => {
    setModalOpen(true);
    setEditingCancha(cancha);
    if (cancha) {
      setValue("nombre_cancha", cancha.nombre_cancha);
      setValue("tipo", cancha.tipo);
      setValue("precio_hora", cancha.precio_hora);
      setValue("estado", cancha.estado);
      setValue("img", cancha.img);
    } else {
      reset();
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingCancha(null);
    reset();
  };

  const deleteCancha = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar esta cancha?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchCanchas();
    } catch (error) {
      console.error("Error al eliminar cancha", error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-[20px] shadow-md py-7 px-7">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Gestión de Canchas</h2>
        <button
          onClick={() => openModal()}
          className="bg-blue-500 text-white px-4 py-2 rounded-[20px] hover:bg-blue-600 transition-colors"
        >
          Crear Cancha
        </button>
      </div>

      <div className="overflow-x-auto shadow rounded-[20px]">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio/Hora</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Imagen</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {canchas.map((cancha) => (
              <tr key={cancha.id_cancha}>
                <td className="px-6 py-4 text-sm text-gray-900">{cancha.id_cancha}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{cancha.nombre_cancha}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{cancha.tipo}</td>
                <td className="px-6 py-4 text-sm text-gray-500">${cancha.precio_hora}</td>
                <td className="px-6 py-4 text-sm">
                  <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs">
                    {cancha.estado}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <img src={cancha.img} alt="cancha" className="w-10 h-10 rounded-full object-cover" />
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex gap-3">
                    <button
                      onClick={() => openModal(cancha)}
                      className="text-blue-500 hover:underline text-sm font-medium"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => deleteCancha(cancha.id_cancha)}
                      className="text-red-500 hover:underline text-sm font-medium"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-[20px] shadow-md w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {editingCancha ? "Editar Cancha" : "Crear Cancha"}
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block font-medium">Nombre:</label>
                <input
                  {...register("nombre_cancha", { required: true })}
                  className="w-full border border-gray-300 rounded-[10px] px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-medium">Tipo:</label>
                <input
                  {...register("tipo", { required: true })}
                  className="w-full border border-gray-300 rounded-[10px] px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-medium">Precio/Hora:</label>
                <input
                  type="number"
                  {...register("precio_hora", { required: true })}
                  className="w-full border border-gray-300 rounded-[10px] px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-medium">Estado:</label>
                <select
                  {...register("estado", { required: true })}
                  className="w-full border border-gray-300 rounded-[10px] px-3 py-2"
                >
                  <option value="Disponible">Disponible</option>
                  <option value="Ocupada">Ocupada</option>
                  <option value="Mantenimiento">Mantenimiento</option>
                </select>
              </div>
              <div>
                <label className="block font-medium">Imagen (URL):</label>
                <input
                  {...register("img", { required: true })}
                  className="w-full border border-gray-300 rounded-[10px] px-3 py-2"
                />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-200 rounded-[20px] hover:bg-gray-300 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-[20px] hover:bg-blue-600 transition"
                >
                  {editingCancha ? "Actualizar" : "Crear"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CanchasAdmin;
