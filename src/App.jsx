import './App.css'
import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

const Login = lazy(() => import('./Pages/Login/Login'))
const User = lazy(() => import('./Pages/User/User'))
const Admin = lazy(() => import('./Pages/Admin/Admin'))
const UserReservas = lazy(() => import('./Pages/User/UserReservas'))
const Reservar = lazy(() => import('./Components/generic/Reservar'))

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user" element={<User />} />
        <Route path="/admin/*" element={<Admin />} /> {/* ✅ SOLO ESTA */}
        <Route path="/user/reservas" element={<UserReservas />} />
        <Route path="/reservar" element={<Reservar />} />
      </Routes>
    </Suspense>
  )
}

export default App
