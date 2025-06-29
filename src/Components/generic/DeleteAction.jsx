import React, { useState } from 'react'
import { HORAS_DISPONIBLES } from '../../Pages/User/Const/HorasDisponibles';

const DeleteAction = ({request,data,setIsloading}) => {
console.log('data',data)
const [response,setResponse] = useState({error:null,ok:null});

    const onsubmit = async() => {
    const Response = await request(data)
    console.log(Response)

    if(Response?.response?.data?.error){
      setResponse(({
        ok:null,
        error:Response?.response?.data?.error
      }))}

    if(Response.reservaId){
      setResponse({
        ok:Response.message,
        error:null
      })
    }
    
    if(Response?.data){
      setResponse({
        ok:Response.data.message,
        error:null
      })
      
    }
    console.log(response)
    
  };

  const closeResponse = () => {
    setResponse({error:null,ok:null})
  }

  return (
    <div className='p-6 flex flex-col gap-4'>
    <div className='flex-col flex gap-3'>
        <p className='font-bold text-[20px] '>Estas seguro de eliminar esta reserva?</p>
        <p className='font-medium text-[15px] text-[#737373]'>Se eliminaran todos los datos</p>
    </div>
    {response.error 
      ? <p className='text-red-500'>{response.error}</p>
      : response.ok 
      ?  <p className='text-green-500'>{response.ok}</p>
      : <button className='p-2 bg-red-600 text-white rounded-[20px] ' onClick={onsubmit}>Eliminar</button> 
    }   
    </div>
  )
}

export default DeleteAction     