

const usuarios = [
  {
    id_usuario: 1,
    nombre: 'Juan Pérez',
    email: 'juan@email.com',
    rol: 'usuario',
    fecha_registro: '2024-12-01'
  },
  {
    id_usuario: 2,
    nombre: 'María García',
    email: 'maria@email.com',
    rol: 'usuario',
    fecha_registro: '2024-12-05'
  },
  {
    id_usuario: 3,
    nombre: 'Admin User',
    email: 'admin@email.com',
    rol: 'administrador',
    fecha_registro: '2024-11-15'
  }
];


const UserAdmin = () => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
    <thead className="bg-gray-50">
      <tr>
        {['ID', 'Nombre', 'Email', 'Rol', 'Fecha Registro', 'Acciones'].map((th) => (
          <th key={th} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{th}</th>
        ))}
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {usuarios.map((u, idx) => (
        <tr key={idx}>
          <td className="px-6 py-4 whitespace-nowrap">{u.id_usuario}</td>
          <td className="px-6 py-4 whitespace-nowrap">{u.nombre}</td>
          <td className="px-6 py-4 whitespace-nowrap">{u.email}</td>
          <td className="px-6 py-4 whitespace-nowrap">
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${u.rol === 'administrador' ? 'bg-black text-white' : 'bg-gray-100 text-black'}`}>{u.rol}</span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">{u.fecha_registro}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Acciones</td>
        </tr>
      ))}
    </tbody>
  </table>
);}

export default UserAdmin