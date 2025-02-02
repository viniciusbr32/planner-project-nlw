import { Calendar, MapPin, Settings2, X } from 'lucide-react';
import { Button } from '../../components/button';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../../lib/axios';
import { format } from 'date-fns';
import { DateRange, DayPicker } from 'react-day-picker';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Trip {
  destination: string;
  starts_at: string;
  ends_at: string;
  is_confirmed: boolean;
}

export function DestinationAndDateHeader() {
  const { tripId } = useParams();

  const [trip, setTrip] = useState<Trip | undefined>();
  const [changeDateOpen, setChangeDateOpen] = useState(false);
  const [changeStartAndEndDates, setChangeStartAndEndDates] = useState<DateRange | undefined>();
  const [changeDestination, setChangeDestination] = useState('');

  useEffect(() => {
    api.get(`/trips/${tripId}`).then((response) => setTrip(response.data.trip));
  }, [tripId]);

  const displayedDate = trip
    ? format(new Date(trip.starts_at), "d 'de ' LLL ")
        .concat('até ')
        .concat(format(new Date(trip.ends_at), "d' de ' LLL"))
    : null;

  function openChangeDatePicker() {
    setChangeDateOpen(true);
  }

  function closeChangeDatePicker() {
    setChangeDateOpen(false);
  }

  async function updateData() {
    const response = await api.put(`/trips/${tripId}`, {
      starts_at: changeStartAndEndDates ? changeStartAndEndDates.from!.toISOString() : trip?.starts_at,
      ends_at: changeStartAndEndDates ? changeStartAndEndDates.to!.toISOString() : trip?.ends_at,
      destination: changeDestination ? changeDestination : trip?.destination,
    });
    if (response.status === 200 && trip) {
      setTrip({
        ...trip,
        starts_at: changeStartAndEndDates ? changeStartAndEndDates.from!.toISOString() : trip.starts_at,
        ends_at: changeStartAndEndDates ? changeStartAndEndDates.to!.toISOString() : trip.ends_at,
        destination: changeDestination ? changeDestination : trip.destination,
      });
      toast.success('Data e destino atualizados com sucesso!');
      closeChangeDatePicker();
    }
  }

  return (
    <div className="flex items-center justify-between h-16 px-4 rounded-xl bg-zinc-900 shadow-shape">
      <div className="flex items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <span className="text-lg text-zinc-100">{trip?.destination}</span>
      </div>
      <ToastContainer />
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-zinc-400" />
          <span className="text-lg text-zinc-100">{displayedDate}</span>
        </div>
        <div className="w-px h-6 bg-zinc-800"></div>
        <Button onClick={openChangeDatePicker} variant="secondary">
          Alterar local/data
          <Settings2 />
        </Button>
      </div>
      {changeDateOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 ">
          <div className="px-6 py-5 space-y-5 rounded-xl shadow-shape bg-zinc-900">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Selecione a data e Destino</h2>
                <button onClick={closeChangeDatePicker}>
                  <X className="size-5 text-zinc-400" />{' '}
                </button>
              </div>
            </div>
            <div>
              <DayPicker mode="range" selected={changeStartAndEndDates} onSelect={setChangeStartAndEndDates} />
              <label>Trocar Destino ? </label>
              <input placeholder="" onChange={(event) => setChangeDestination(event.target.value)} />
            </div>
            <button onClick={updateData}>Trocar Data</button>
          </div>
        </div>
      )}
    </div>
  );
}
