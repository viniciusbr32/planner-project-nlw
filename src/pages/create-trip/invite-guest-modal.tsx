import { AtSign, Plus, X } from 'lucide-react';
import { FormEvent } from 'react';
import { Button } from '../../components/button';

interface InviteGuestModalProps {
  closeGuestModal: () => void;
  emailsToInvite: string[];
  addNewemailToInvite: (event: FormEvent<HTMLFormElement>) => void;
  removeEmailFromInvites: (email: string) => void;
}

export function InviteGuestModal({
  addNewemailToInvite,
  closeGuestModal,
  emailsToInvite,
  removeEmailFromInvites,
}: InviteGuestModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 ">
      <div className="w-[640px]  rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold">Selecionar Convidados</p>
            <button onClick={closeGuestModal}>
              <X className="size-5 text-zinc-400" />{' '}
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Os convidados irão receber e-mails para confirmar a participação na viagem.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {emailsToInvite.map((email) => {
            return (
              <div key={email} className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2">
                <span className="text-zinc-300">{email}</span>
                <button type="button" onClick={() => removeEmailFromInvites(email)}>
                  <X className="size-4 text-zinc-400" />
                </button>
              </div>
            );
          })}
        </div>
        <div className="w-full h-px bg-zinc-800"></div>
        <form
          onSubmit={addNewemailToInvite}
          className="p-2.5 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2"
        >
          <div className="flex items-center flex-1 gap-2 px-2">
            <AtSign className="text-zinc-400 size-5" />
            <input
              type="email"
              name="email"
              placeholder="Digite o Email do convidado ?"
              className="flex-1 text-lg bg-transparent outline-none placeholder-zinc-400"
            />
          </div>
          <Button type="submit" variant="primary">
            Convidar <Plus className="size-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
