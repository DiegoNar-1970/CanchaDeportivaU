
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const NavBarAdmin = () => {
  const navigate = useNavigate();
  return (
  <div className='flex justify-between'>
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
    <div className='p-2  pr-[20px] pl-[20px] bg-[#ececee] rounded-[20px] flex justify-center'>
      <button onClick={()=>{navigate('/')}}
        className='bg-white pr-[10px] pl-[10px]  rounded-[18px] cursor-pointer '> 
        Logout 
        </button>
    </div>

  </div>
  );
};


export default NavBarAdmin