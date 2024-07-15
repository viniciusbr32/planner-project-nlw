import { ArrowRight, Calendar, MapPin, Settings2, X } from 'lucide-react';
import { Button } from '../../../components/button';
import { useState } from 'react';
import { format } from 'date-fns';
import { DateRange, DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

interface DestinationAndDateStepProps {
  isGuestInputOpen: boolean;
  closeGuestInput: () => void;
  openGuestInput: () => void;
  setDestination: (destionation: string) => void;
  setEventStartAndEndDates: (dates: DateRange | undefined) => void;
  eventStartAndEndDates: DateRange | undefined;
}

export function DestinationAndDateStep({
  isGuestInputOpen,
  closeGuestInput,
  openGuestInput,
  setDestination,
  setEventStartAndEndDates,
  eventStartAndEndDates,
}: DestinationAndDateStepProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  function openDatePicker() {
    setIsDatePickerOpen(true);
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false);
  }

  const displayedDate =
    eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to
      ? format(eventStartAndEndDates.from, "d 'de ' LLL ")
          .concat('até ')
          .concat(format(eventStartAndEndDates.to, "d' de ' LLL"))
      : null;
  return (
    <div className="flex items-center h-16 gap-3 px-4 rounded-xl bg-zinc-900 shadow-shape">
      <div className="flex items-center flex-1 gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <input
          type="text"
          placeholder="Para onde voce vai ?"
          className="text-lg bg-transparent outline-none placeholder-zinc-400"
          disabled={isGuestInputOpen}
          onChange={(event) => setDestination(event.target.value)}
        />
      </div>
      <button onClick={openDatePicker} disabled={isGuestInputOpen} className="flex items-center gap-2 w-[200px]">
        <Calendar className="size-5 text-zinc-400 " />
        <span className="flex-1 w-40 text-left text-zinc-400">{displayedDate || 'Quando'}</span>
      </button>

      {isDatePickerOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 ">
          <div className="px-6 py-5 space-y-5 rounded-xl shadow-shape bg-zinc-900">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Selecione a data</h2>
                <button onClick={closeDatePicker}>
                  <X className="size-5 text-zinc-400" />{' '}
                </button>
              </div>
            </div>
            <DayPicker mode="range" selected={eventStartAndEndDates} onSelect={setEventStartAndEndDates} />
          </div>
        </div>
      )}

      <div className="w-px h-6 bg-zinc-800" />
      {isGuestInputOpen ? (
        <Button onClick={closeGuestInput} variant="secondary" size="default">
          Alterar local/data
          <Settings2 className="size-5 text-zinc-400" />
        </Button>
      ) : (
        <Button onClick={openGuestInput} variant="primary">
          Continuar <ArrowRight className="size-5" />
        </Button>
      )}
    </div>
  );
}
