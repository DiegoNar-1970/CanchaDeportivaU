import { ReservaService } from "../Services/Reservas/reservarService"

export const INPUT_UPDATE=[
    { label: 'La Hora es necesaria', name: 'hora_inicio', type: 'select', required: 'La fecha hora es obligatoria' },
    { label: 'La Hora es necesaria', name: 'hora_fin', type: 'select', required: 'La fecha hora es obligatoria' },
    { label: 'Costo Total', name: 'costo_total', type: 'number', required: 'El costo es obligatorio' }
  ]
export const INPUT_CREATE=[
  { label: 'Fecha de la Reserva', name: 'fecha_reserva', type: 'date', required: 'La fecha es obligatoria' },
    { label: 'La Hora es necesaria', name: 'hora_inicio', type: 'select', required: 'La fecha hora es obligatoria' },
    { label: 'La Hora es necesaria', name: 'hora_fin', type: 'select', required: 'La fecha hora es obligatoria' },
    { label: 'Costo Total', name: 'costo_total', type: 'number', required: 'El costo es obligatorio' },
    { label: 'Estado', name: 'estado', type: 'text', required: 'El estado es obligatorio' },
    { label: 'id cliente', name: 'id_usuario', type: 'number', required: 'El id del cliente es obligatorio  ' },
    { label: 'id cancha', name: 'id_cancha', type: 'number', required: 'El id de la cancha es obligatorio' },

  ]

export const CreateReserva = async(data) => {
  const response = await ReservaService.createReserva(data)
  return response;
}
export const  UpdateReserva = async(data) => {
  const response = await ReservaService.updateReserva(data)
  return response;
}
export const  delReserva = async(data) => {
  const response = await ReservaService.delReserva(data)
  return response;
}