import { ArrowRight, UserRoundPlus } from 'lucide-react';
import { Button } from '../../../components/button';

interface InviteGuestStepProps {
  openGuestModal: () => void;
  openConfirmTripModal: () => void;
  emailsToInvite: string[];
}

export function InviteGuestStep({ emailsToInvite, openConfirmTripModal, openGuestModal }: InviteGuestStepProps) {
  return (
    <div className="flex items-center h-16 gap-3 px-4 rounded-xl bg-zinc-900 shadow-shape">
      <button type="button" onClick={openGuestModal} className="flex items-center flex-1 gap-2 text-left">
        <UserRoundPlus className="size-5 text-zinc-400" />
        {emailsToInvite.length > 0 ? (
          <span className="font-semibold text-zinc-100">{emailsToInvite.length} pessoa(s) convidada(s</span>
        ) : (
          <span className="flex-1 text-lg text-zinc-400">Quem estará na viagem ?</span>
        )}
      </button>

      <Button onClick={openConfirmTripModal} variant="primary" size="default">
        Confirmar viagem <ArrowRight className="size-5" />
      </Button>
    </div>
  );
}
