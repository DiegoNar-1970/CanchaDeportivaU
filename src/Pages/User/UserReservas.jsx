import { useEffect, useState } from 'react'
import NavBarUser from '../../Layout/User/NavBarUser'
import ReservasTable from '../../Components/generic/ReservasTable'
import {GlobalContext} from '../../Context/State'
import { ReservaService } from '../../Services/Reservas/reservarService'


const UserReservas = () => {

  const { user } = GlobalContext();
  const [reservas, setReservas] = useState([]);
  const [error, setError] = useState(null);
  const [isloading, setIsloading] = useState(false);
  const [onChangue,setOnchangue]= useState(false)

  useEffect(() => {

    const getReservas = async () => {
      //inicializacion
      setIsloading(true)
      setError(null)

      try {

        const totalReservas = await ReservaService.getReservasByUsuario(user.id_usuario);
        
        if(totalReservas?.data?.message){
          setIsloading(false)
          setError(totalReservas.data.message)
          return
        }

        console.log(totalReservas);
        setReservas(totalReservas.data);
        setIsloading(false)

      } catch (error) {
        console.error("Error al cargar reservas:", error);
      }
    };

    if (user?.id_usuario) {
      getReservas();
    }
  }, [user, onChangue]);

  return (
    <div className='p-2 flex flex-col gap-4 py-7 px-7'>
      
        <NavBarUser />
        <div className='flex gap-1'>
          <h1 className='font-bold text-[20px]'>Historial de reservas de: </h1>
          <h1 className='font-bold text-[20px]'>{user.nombre}</h1>
        </div>
        {isloading ? 
          <div className='loading'></div>
        : error ? 
          <div className='text-red-500 font-bold text-[20px]'>{error}</div>
        : (
          <ReservasTable reservas={reservas} setIsloading={setOnchangue}  />
        )}
    </div>
  )
}

export default UserReservas