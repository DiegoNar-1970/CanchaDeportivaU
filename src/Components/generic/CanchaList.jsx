
import { CanchaService } from '../../Services/User/CanchaService';
import CanchaCard from './CanchaCard';
const canchas = await CanchaService.getCanchas();

const CanchaList = () => {
  return (
    <section className="py-12 bg-white bg-cover bg-center rounded-[20px] ">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-black">Canchas Disponibles</h2>
        <p className="text-gray-700 mt-2">Explora nuestra selección de canchas deportivas y encuentra la perfecta para tu actividad</p>
      </div>
      <div className="flex justify-center gap-8 flex-wrap">
        {canchas.map((cancha) => (
          <CanchaCard key={cancha.id_cancha} cancha={cancha} />
        ))}
      </div>
    </section>
  );
};

export default CanchaList;