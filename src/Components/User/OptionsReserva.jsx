import { useState } from 'react'
import { ReservaService } from '../../Services/reservarService';
import { useNavigate } from 'react-router-dom';
import { PDFDownloadLink } from '@react-pdf/renderer';
import FacturaPdf from '../FacturaPdf';
import { GlobalContext } from '../../Context/State';

const OptionsReserva = ({data}) => {

    const navigate = useNavigate();

    const {user,cancha} = GlobalContext();
    console.log('Datos de la reserva:', {data, user, cancha});

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successful, setSuccessful] = useState(null);
    
    const pagarYReservar = async () => {
        setIsLoading(true);

        const reservar = await ReservaService.createReserva(data)
        if (reservar.response?.data?.error) {
            console.log(reservar.response.data.error, 'error al reservar');
            setError(reservar.response.data.error);
            setIsLoading(false);
            return;
        }
        if (reservar.message) {
            setSuccessful(reservar.message);
            setIsLoading(false);
            return;
            
        }
        console.log(reservar, 'algo salio mal')
    }

    const navigateToReservas = () => {
        navigate('/user/reservas');
    }

    const resetState = () => {
        setIsLoading(false);
        setError(null);
        setSuccessful(null);
    }

  return (
    <div className='flex gap-4 flex-col items-center justify-center relative'>
        <h3 className='font-bold text-[20px]'>Selecciona una opción:</h3>
        <p className='text-gray-600 mb-[40px]'>Debes generar el pago para reservar y descargar la factura.</p>
        {isLoading ? (
                <div className='loader'></div>
        )  : error ? (
            <>
                <button className='' onClick={resetState}> Volver </button>
                <div className='text-red-500 font-bold'>{error}</div>
            </>
            
        ) : successful ? (
            <>
                <div className='text-green-500 font-bold'>
                    {successful}
                </div>
                <button className='text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 
                focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg 
                text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 
                dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2' 
                onClick={resetState}> Volver </button>
                                    <PDFDownloadLink
                    document={<FacturaPdf usuario={user} cancha={cancha} reserva={data} />}
                    fileName="factura_reserva.pdf"
                    className='bg-yellow-500 text-white px-4 py-2 rounded-[17px]'
                >
                    {({loading}) => (loading ? 'Cargando factura...' : 'Descargar Factura')}
                </PDFDownloadLink>
            </>
            
        ) : (
            <div className='flex gap-4'>
                <button
                    onClick={pagarYReservar}
                    className='bg-blue-500 text-white px-4 py-2 rounded-[17px]'
                    >Pagar y reservar
                </button>
                <button className=' text-black px-4 outline-[1px] rounded-[17px] outline-blacke' onClick={navigateToReservas}>Ver Reservas</button>
            </div>
        )}
    </div>
  )
}

export default OptionsReserva

