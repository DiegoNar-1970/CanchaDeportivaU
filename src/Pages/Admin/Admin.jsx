import { Suspense, lazy } from 'react'
import NavBarAdmin from '../../Layout/Admin/NavBarAdmin'
import { Navigate, Route, Routes } from 'react-router-dom'


const UserAdmin = lazy(() => import('./UserAdmin'))
const CanchasAdmin = lazy(() => import('./CanchasAdmin'))
const ReservasTable = lazy(() => import('../../Components/generic/ReservasTable'))

const Admin = () => {
  return (
    <div className='flex flex-col p-2 px-7 py-7 gap-10'>

      <NavBarAdmin />
      <Suspense fallback={<div className='loading'></div>}>
        <Routes>
          <Route index element={<Navigate to="usuarios" replace />} />
          <Route path="usuarios" element={<UserAdmin />} />
          <Route path="canchas" element={<CanchasAdmin />} />
          <Route path="reservas" element={<ReservasTable />} />
          <Route path="facturas" element={<UserAdmin />} />
          <Route path="*" element={<Navigate to="/admin/usuarios" replace />} /> {/* ✅ ABSOLUTA */}
        </Routes>
      </Suspense>
    </div>
  )
}

export default Admin
