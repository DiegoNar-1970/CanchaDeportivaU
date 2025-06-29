import { useForm } from 'react-hook-form';
import { HORAS_DISPONIBLES } from '../../Pages/User/Const/HorasDisponibles';
import { useState } from 'react';

const GenericForm = ({ 
  title = "Formulario", 
  inputs = [], 
  data = {},
  request = null
}) => {
  const [response,setResponse] = useState({error:null,ok:null});
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: data
  });

  const onsubmit = async(formData) => {
    const Response = await request(formData)
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

  const isOdd = inputs.length % 2 !== 0;

  return (
    <div>
      {response.error 
      ? 
        <div className="p-6 flex flex-col gap-4">
          <p className='text-red-500'>{response.error}</p>
          <button className='p-2 bg-black text-white rounded-[20px]'onClick={closeResponse}>Volver</button>
        </div>
      : response.ok 
      ?  
        <div className="p-6 flex flex-col gap-4">
          <p className='text-green-500'>{response.ok}</p>
          <button className='p-2 bg-black text-white rounded-[20px]' onClick={closeResponse}>Volver</button>
        </div>
      : 
            <form
        onSubmit={handleSubmit(onsubmit)}
        className="bg-white shadow rounded p-6 w-100 flex flex-col"
      >
        <h2 className="text-xl font-bold mb-4 text-black">{title}</h2>
        <div className="flex gap-2 flex-wrap">
          {inputs.map((input, index) => {
            const isLastAndOdd = isOdd && index === inputs.length - 1;
            return (
              <div
                key={input.name || index}
                className={`mb-4 ${isLastAndOdd ? 'flex-1' : 'w-[170px]'}`}
              >
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  {input.label}
                </label>

                {input.type === 'select' ? (
                  <select
                    {...register(input.name, { required: input.required })}
                    className="p-2 mt-1 outline-[1px] rounded-[16px] outline-black w-full"
                    defaultValue={data[input.name] || ""}
                  >
                    <option value="">Seleccionar</option>
                    {HORAS_DISPONIBLES.map((hora, i) => (
                      <option key={i} value={hora.value}>
                        {hora.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={input.type}
                    {...register(input.name, { required: input.required })}
                    className="p-2 mt-1 outline-[1px] rounded-[16px] outline-black w-full"
                  />
                )}

                {errors[input.name] && (
                  <span className="text-red-500 text-sm">
                    {errors[input.name]?.message || "Este campo es obligatorio"}
                  </span>
                )}
              </div>
            );
          })}
        </div>
        <button
          type="submit"
          className="mt-4 w-full bg-black text-white py-2 rounded font-semibold"
        >
          🧾 Continuar
        </button>
      </form>
      }
    </div>
  );
};

export default GenericForm;
