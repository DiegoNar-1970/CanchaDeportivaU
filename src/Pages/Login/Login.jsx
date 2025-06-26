import { useState } from 'react';
import { useForm } from 'react-hook-form';
import '../Login/Login.css';
import { useNavigate } from 'react-router-dom';
import { UserService } from '../../Services/User/UserService';
import { GlobalContext } from '../../Context/State';



const Login = () => {
  const {setUser,setRol} = GlobalContext();

  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);

  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    watch,
    reset 
  } = useForm();

  const password = watch('password');
  
  const onSubmit = async (data) => {
    setError(null); 
    if(isLogin) {
      const userLogin = await UserService.getUserByEmail(data);
      console.log('este error llego aca',userLogin);
      if (userLogin.response?.data?.status === 'error') {
        setError(userLogin.response?.data?.message);
        return;
      }
      const navigateTo = userLogin.user?.rol;
      setUser(userLogin.user);
      setRol(userLogin.user.rol);
      console.log('este error llego aca',userLogin.user.rol);
      navigate(`/${navigateTo}`); // Redirigir al inicio después del submit
    }
    else {
      let newData = { 
        rol:'user',
        ...data 
      };
      const userRegister = await UserService.createUser(newData);
      console.log('este error llego aca',userRegister);
      setUser(userRegister.nombre);
      setRol(userRegister.rol);
      navigate('/user'); // Redirigir al inicio después del submit
    }
  };

  return (
    <div className="login-container login">
      <div className="background-image"></div>
      
      <div className="form-container">
        <div className="form-card">
          <h2 className='font-bold'>
            {isLogin ? 'Iniciar Sesión para reservar tu cancha' : 'Crear Cuenta'}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {!isLogin && (
              <div className="form-group">
                <label>Nombre</label>
                <input 
                  type="text" 
                  {...register('name', { required: !isLogin && 'Nombre es requerido' })} 
                  placeholder="Tu nombre completo"
                />
                {errors.name && <span className="error">{errors.name.message}</span>}
              </div>
            )}
            {error && <span className="font-bold text-red-600 mb-[10px] ">{error} </span>}
            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                {...register('email', { 
                  required: 'Email es requerido',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Email inválido'
                  }
                })} 
                placeholder="tu@email.com"
              />
              {errors.email && <span className="error">{errors.email.message}</span>}
            </div>
            
            <div className="form-group">
              <label>Contraseña</label>
              <input 
                type="password" 
                id="password"
                {...register('password', { 
                  required: 'Contraseña es requerida',
                  minLength: {
                    value: 6,
                    message: 'Mínimo 6 caracteres'
                  }
                })} 
                placeholder="••••••••"
              />
              {errors.password && <span className="error">{errors.password.message}</span>}
            </div>
            
            {!isLogin && (
              <div className="form-group">
                <label>Confirmar Contraseña</label>
                <input 
                  type="password" 
                  {...register('confirmPassword', { 
                    required: !isLogin && 'Confirma tu contraseña',
                    validate: value => 
                      value === password || 'Las contraseñas no coinciden'
                  })} 
                  placeholder="••••••••"
                />
                {errors.confirmPassword && <span className="error">{errors.confirmPassword.message}</span>}
              </div>
            )}
            
            <button type="submit" className="submit-btn">
              {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
            </button>
          </form>
          
          <p className="toggle-form">
            {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
            <button 
              type="button" 
              onClick={() => {
                setIsLogin(!isLogin), 
                reset(),
                setError(null) 
              }}
              className="toggle-btn"
            >
              {isLogin ? 'Crear una cuenta' : 'Iniciar sesión'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;