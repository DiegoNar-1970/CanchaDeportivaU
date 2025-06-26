import { useForm } from "react-hook-form";
import { GlobalContext } from "../../Context/State";
import CanchaCard from "./CanchaCard";
import { useState } from "react";
import PopPap from "./PopPap";
import { HORAS_DISPONIBLES } from "../../Pages/User/Const/HorasDisponibles";
import OptionsReserva from "../User/OptionsReserva";
import NavBarUser from "../../Layout/User/NavBarUser";

const Reservar = () => {
  const [popPap, setPopPap] = useState(false);
  const [dataCReserva, setDataCReserva] = useState(null);

  const { cancha, user } = GlobalContext();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      fecha_reserva: '',
      hora_inicio: '',
      hora_fin: '',
      id_usuario: user?.id_usuario || '',
      id_cancha: cancha?.id_cancha || '',
      estado: 'Pagado',
      costo_total: cancha?.precio_hora
    }
  });

  const horaInicioSeleccionada = watch("hora_inicio");

  const onClosePopPap = () => {
    setPopPap(false);
  };

  const generateReserva = (data) => {
    setPopPap(true);
    setDataCReserva(data);
    console.log(data, 'Datos de reserva');
  };

  return (
    <div className="flex flex-col p-2 gap-4 bg-white">
      <NavBarUser />
      <div className="bg-[#f5f5f7] min-h-screen flex items-center gap-12 justify-center p-2 rounded-[20px] ">
      
      <div className="flex flex-col items-center gap-4 font-bold text-[18px] ">
        <h2>Resumen de la Reserva</h2>
        <CanchaCard cancha={cancha} />
      </div>

      <form onSubmit={handleSubmit(generateReserva)} className="bg-white shadow rounded p-6 w-96 flex flex-col">
        <h2 className="text-xl font-bold mb-4 text-black">Realizar Reserva</h2>

        {/* FECHA */}
        <label className="block mb-1 text-sm font-medium text-gray-700">Fecha de la reserva</label>
        <input
          type="date"
          {...register('fecha_reserva', { required: 'La fecha es obligatoria' })}
          className="p-2 mt-1 mb-2 outline-[1px] rounded-[16px] outline-black"
        />
        {errors.fecha_reserva && <span className="text-red-500 text-sm">{errors.fecha_reserva.message}</span>}

        {/* HORAS */}
        <div className="flex gap-4 mb-4">
          {/* HORA INICIO */}
          <div className="flex-1">
            <label className="block mb-1 text-sm font-medium text-gray-700">Hora de inicio</label>
            <select
              {...register('hora_inicio', { required: 'Selecciona una hora' })}
              className="p-2 mt-1 mb-1 outline-[1px] rounded-[16px] outline-black w-full"
            >
              <option value="">Seleccionar</option>
              {HORAS_DISPONIBLES.map((hora, index) => (
                <option key={index} value={hora.value}>
                  {hora.label}
                </option>
              ))}
            </select>
            {errors.hora_inicio && <span className="text-red-500 text-sm">{errors.hora_inicio.message}</span>}
          </div>

          {/* HORA FIN */}
          <div className="flex-1">
            <label className="block mb-1 text-sm font-medium text-gray-700">Hora final</label>
            <select
              {...register('hora_fin', { required: 'Selecciona una hora' })}
              className="p-2 mt-1 mb-1 outline-[1px] rounded-[16px] outline-black w-full"
            >
              <option value="">Seleccionar</option>
              {HORAS_DISPONIBLES.filter(hora => hora.value > horaInicioSeleccionada).map((hora, index) => (
                <option key={index} value={hora.value}>
                  {hora.label}
                </option>
              ))}
            </select>
            {errors.hora_fin && <span className="text-red-500 text-sm">{errors.hora_fin.message}</span>}
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 w-full bg-black text-white py-2 rounded font-semibold"
        >
          🧾 Continuar
        </button>

        {popPap && (
          <PopPap
            dataCReserva={dataCReserva}
            onClose={onClosePopPap}
            component={OptionsReserva}
          />
        )}
      </form>
    </div>
    </div>
    
  );
};

export default Reservar;
