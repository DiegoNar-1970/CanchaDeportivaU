import { GlobalContext } from "../../Context/State";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const CanchaCard = ({ cancha }) => {

  const {setCancha} = GlobalContext();
  const navigate = useNavigate();
  const location = useLocation();
  
  const disponible = cancha.estado?.toLowerCase() === 'disponible';
  
  const { nombre_cancha, tipo, precio_hora, estado } = cancha;

  const Redirect = () => {
    setCancha(cancha);
    navigate('/reservar');
  }
  return (
    <div className=" rounded-xl shadow p-4 w-64 bg-[#f5f5f7]  hover:shadow-lg transition-shadow duration-300">
      <div className="h-40 bg-gray-200 rounded mb-4 flex items-center justify-center relative">
        <img src={cancha.img} alt={nombre_cancha} className="h-full w-full object-cover rounded" />
          <span className={`absolute top-2 right-2 text-white px-3 py-1 r-0 b-0  rounded-full text-sm font-semibold ${
          disponible ? 'bg-green-500' : 'bg-red-500'
        }`}>{estado}</span>
      </div>
      <h3 className="text-lg font-bold text-black mb-1">{nombre_cancha}</h3>
      <p className="text-sm text-gray-600">{tipo}</p>
      <p className="text-sm text-gray-600 my-2">Por hora</p>
      <p className="text-lg font-bold text-blue-600">${precio_hora}</p>
      {location.pathname === '/user' && (
        <button
        className={`mt-3 w-full py-2 rounded text-white font-semibold ${
          disponible ? 'bg-black hover:bg-gray-800' : 'bg-gray-400 cursor-not-allowed'
        }`}
        disabled={!disponible}
        onClick={Redirect}
      >
        {disponible ? 'Reservar Ahora' : 'No Disponible'}
      </button>
      )}
    </div>
  );
};

export default CanchaCard;
