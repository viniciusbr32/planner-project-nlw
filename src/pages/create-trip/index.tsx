import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InviteGuestModal } from './invite-guest-modal';
import { ConfirmTripModal } from './confirm-trip-modal';
import { DestinationAndDateStep } from './staps/destination-and-date-step';
import { InviteGuestStep } from './staps/invite-guest-step';
import { api } from '../../lib/axios';
import { DateRange } from 'react-day-picker';

export function CreateTripPage() {
  const navigate = useNavigate();

  const [isGuestInputOpen, setIsGuestInputOpen] = useState(false);
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);

  const [destination, setDestination] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange | undefined>();

  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([]);
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);

  function openGuestInput() {
    setIsGuestInputOpen(true);
  }

  function closeGuestInput() {
    setIsGuestInputOpen(false);
  }

  function openGuestModal() {
    setIsGuestModalOpen(true);
  }
  function closeGuestModal() {
    setIsGuestModalOpen(false);
  }

  function openConfirmTripModal() {
    setIsConfirmTripModalOpen(true);
  }
  function closeConfirmTripModal() {
    setIsConfirmTripModalOpen(false);
  }

  function addNewemailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get('email')?.toString();

    if (!email) {
      return;
    }

    if (emailsToInvite.includes(email)) {
      return;
    }

    setEmailsToInvite([...emailsToInvite, email]);
    event.currentTarget.reset();
  }

  function removeFromEmailInvites(emailToRemove: string) {
    const newEmaillist = emailsToInvite.filter((email) => email !== emailToRemove);
    setEmailsToInvite(newEmaillist);
  }

  async function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!destination) {
      return;
    }

    if (!eventStartAndEndDates?.from || !eventStartAndEndDates?.to) {
      return;
    }

    if (emailsToInvite.length === 0) {
      return;
    }

    if (!ownerName || !ownerEmail) {
      return;
    }

    const response = await api.post('/trips', {
      destination,
      starts_at: eventStartAndEndDates.from,
      ends_at: eventStartAndEndDates.to,
      emails_to_invite: emailsToInvite,
      owner_name: ownerName,
      owner_email: ownerEmail,
    });

    const { tripId } = response.data;

    navigate(`/trips/${tripId}`);
  }

  return (
    <div className="flex items-center justify-center h-screen bg-center bg-no-repeat bg-patterns ">
      <div className="w-full max-w-3xl px-6 space-y-10 text-center">
        <div className="flex flex-col items-center gap-3">
          <img src="src/assets/logo.svg" alt="logo" />
          <p className="lg text- text-zinc-300">Convide seus amigos e planeje sua próxima viagem!</p>
        </div>
        <div className="space-y-4">
          <DestinationAndDateStep
            closeGuestInput={closeGuestInput}
            isGuestInputOpen={isGuestInputOpen}
            openGuestInput={openGuestInput}
            setDestination={setDestination}
            eventStartAndEndDates={eventStartAndEndDates}
            setEventStartAndEndDates={setEventStartAndEndDates}
          />

          {isGuestInputOpen && (
            <InviteGuestStep
              emailsToInvite={emailsToInvite}
              openConfirmTripModal={openConfirmTripModal}
              openGuestModal={openGuestModal}
            />
          )}
        </div>

        <p className="text-sm text-zinc-500 ">
          Ao planejar sua viagem pela plann.er você automaticamente concorda
          <br /> com nossos{' '}
          <a className="underline text-zinc-300" href="#">
            termos de uso
          </a>{' '}
          e{' '}
          <a className="underline text-zinc-300" href="#">
            políticas de privacidade.
          </a>
        </p>
      </div>
      {isGuestModalOpen && (
        <InviteGuestModal
          emailsToInvite={emailsToInvite}
          addNewemailToInvite={addNewemailToInvite}
          closeGuestModal={closeGuestModal}
          removeEmailFromInvites={removeFromEmailInvites}
        />
      )}

      {isConfirmTripModalOpen && (
        <ConfirmTripModal
          closeConfirmTripModal={closeConfirmTripModal}
          createTrip={createTrip}
          setOwnerName={setOwnerName}
          setOwnerEmail={setOwnerEmail}
        />
      )}
    </div>
  );
}
