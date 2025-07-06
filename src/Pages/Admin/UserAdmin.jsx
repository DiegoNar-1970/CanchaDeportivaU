import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserService } from '../../Services/User/UserService';

const UserAdmin = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const obtenerUsuarios = async () => {
    try {
      const data = await UserService.getAllUsers();
      setUsuarios(data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  const onSubmit = async (data) => {
    try {
      await UserService.createUser(data);
      reset();
      setMostrarModal(false);
      obtenerUsuarios(); // recargar usuarios
    } catch (error) {
      console.error('Error al crear usuario:', error);
    }
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-end">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={() => setMostrarModal(true)}
        >
          Crear Usuario
        </button>
      </div>

      {/* Tabla de usuarios */}
      <table className="min-w-full divide-y divide-gray-200 shadow border rounded overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            {['ID', 'Nombre', 'Email', 'Rol', 'Fecha Registro'].map((th) => (
              <th key={th} className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">{th}</th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {usuarios.map((u) => (
            <tr key={u.id_usuario}>
              <td className="px-6 py-4 whitespace-nowrap">{u.id_usuario}</td>
              <td className="px-6 py-4 whitespace-nowrap">{u.nombre}</td>
              <td className="px-6 py-4 whitespace-nowrap">{u.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  u.rol === 'admin' ? 'bg-black text-white' : 'bg-gray-100 text-black'
                }`}>
                  {u.rol}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{new Date(u.fecha_registro).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de creación */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-[#ffffff8d] bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md space-y-4 relative">
            <button
              onClick={() => setMostrarModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
            >
              &times;
            </button>
            <h2 className="text-lg font-bold text-center">Crear Nuevo Usuario</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex flex-col">
                <label className="text-sm">Nombre</label>
                <input
                  type="text"
                  {...register('nombre', { required: true })}
                  className="border p-2 rounded"
                />
                {errors.nombre && <span className="text-red-500 text-sm">Campo requerido</span>}
              </div>

              <div className="flex flex-col">
                <label className="text-sm">Email</label>
                <input
                  type="email"
                  {...register('email', { required: true })}
                  className="border p-2 rounded"
                />
                {errors.email && <span className="text-red-500 text-sm">Campo requerido</span>}
              </div>

              <div className="flex flex-col">
                <label className="text-sm">Contraseña</label>
                <input
                  type="password"
                  {...register('password', { required: true })}
                  className="border p-2 rounded"
                />
                {errors.password && <span className="text-red-500 text-sm">Campo requerido</span>}
              </div>

              <div className="flex flex-col">
                <label className="text-sm">Rol</label>
                <select {...register('rol', { required: true })} className="border p-2 rounded">
                  <option value="">Selecciona un rol</option>
                  <option value="user">Usuario</option>
                  <option value="admin">Administrador</option>
                </select>
                {errors.rol && <span className="text-red-500 text-sm">Campo requerido</span>}
              </div>

              <div className="flex justify-end">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAdmin;
