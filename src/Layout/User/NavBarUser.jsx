import { Link } from "react-router-dom"


const NavBarUser = () => {
  return (
     <nav className="flex items-center justify-between py-4 px-8 bg-[#f5f5f7] shadow w-full h-full rounded-[20px] ">
      <h1 className="text-xl self-start font-bold text-black">CanchasDev</h1>
      <ul className="flex gap-[30px] text-black font-medium">
        <Link to="/user" className="hover:underline cursor-pointer">Inicio</Link>
        <Link to="/user/reservas" className="hover:underline cursor-pointer">Mis Reservas</Link>
      </ul>
    </nav>
  )
}

export default NavBarUser