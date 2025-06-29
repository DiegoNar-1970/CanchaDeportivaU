import React from 'react'

const EditReserva = ({reserva}) => {
  return (
          <div className="bg-white p-6 rounded shadow-lg w-[400px]">
            <h2 className="text-xl font-bold mb-4">Editar Reserva</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Hora Inicio</label>
                <input type="time" className="w-full mt-1 border px-3 py-2 rounded" defaultValue={editReserva.hora_inicio} />
              </div>
              <div>
                <label className="block text-sm font-medium">Hora Fin</label>
                <input type="time" className="w-full mt-1 border px-3 py-2 rounded" defaultValue={editReserva.hora_fin} />
              </div>
              <div>
                <label className="block text-sm font-medium">Costo</label>
                <input type="number" className="w-full mt-1 border px-3 py-2 rounded" defaultValue={editReserva.costo_total} />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button type="button" className="px-4 py-2 bg-gray-300 rounded" onClick={handleClose}>Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Guardar</button>
              </div>
            </form>
          </div>
  )
}

export default EditReserva