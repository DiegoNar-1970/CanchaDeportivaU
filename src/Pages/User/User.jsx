import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../Context/State";
import { useEffect } from "react";
import NavBarUser from "../../Layout/User/NavBarUser";
import CanchaList from "../../Components/generic/CanchaList";
const User = () => {
  const navigate = useNavigate();
  const {user,rol} = GlobalContext();

  //   useEffect(() => {
  //   if (!user || !rol) {
  //     navigate('/'); 
  //   }
  // }, [user, rol, navigate]);

  // console.log('User:', user, 'Role:', rol);
  
  // if (!user || !rol) {
  //   return null; 
  // }
  
  return (
    <div className="min-h-screen bg-white h-full w-full p-2 gap-4 flex flex-col py-7 px-7">
      <NavBarUser />
      <CanchaList />
    </div>
  )
}

export default User