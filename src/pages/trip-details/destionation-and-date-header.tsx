import { Calendar, MapPin, Settings2, X } from 'lucide-react';
import { Button } from '../../components/button';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../../lib/axios';
import { format } from 'date-fns';
import { DateRange, DayPicker } from 'react-day-picker';

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

  useEffect(() => {
    api.get(`/trips/${tripId}`).then((response) => setTrip(response.data.trip));
  }, [tripId]);

  const displayedDate = trip
    ? format(trip.starts_at, "d 'de ' LLL ").concat('até ').concat(format(trip.ends_at, "d' de ' LLL"))
    : null;

  function openChangeDatePicker() {
    setChangeDateOpen(true);
    console.log(changeDateOpen);
  }

  function closeChangeDatePicker() {
    setChangeDateOpen(false);
  }

 
  return (
    <div className="flex items-center justify-between h-16 px-4 rounded-xl bg-zinc-900 shadow-shape">
      <div className="flex items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <span className="text-lg text-zinc-100">{trip?.destination}</span>
      </div>

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
                <h2 className="text-lg font-semibold">Selecione a data</h2>
                <button onClick={closeChangeDatePicker}>
                  <X className="size-5 text-zinc-400" />{' '}
                </button>
              </div>
            </div>
            <DayPicker mode="range" selected={changeStartAndEndDates} onSelect={setChangeStartAndEndDates} />
          </div>
        </div>
      )}
    </div>
  );
}
