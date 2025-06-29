import React from 'react'
import { NavLink } from 'react-router-dom';

const NavBarAdmin = () => {
  return (
    <nav className="block gap-4 px-4 py-3 bg-[#ececee] w-[400px] rounded-[20px]">
      {['usuarios', 'canchas', 'reservas', 'facturas'].map((item) => (
        <NavLink
          key={item}
          to={`/admin/${item.toLowerCase()}`}
          className={({ isActive }) =>
            `px-4 py-2 rounded-[20px] ${isActive ? 'bg-white font-bold' : 'text-gray-600'}`
          }
        >
          {item}
        </NavLink>
      ))}
    </nav>
  );
};


export default NavBarAdmin