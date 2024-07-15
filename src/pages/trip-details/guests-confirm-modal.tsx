import { Mail, User, X } from 'lucide-react';
import { Button } from '../../components/button';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../../lib/axios';

interface GuestsConfirmProps {
  closeGuestsModal: () => void;
}

interface Participant {
  id: string;
  name: string | null;
  email: string;
  is_confirmed: boolean;
}

export function GuestsConfirm({ closeGuestsModal }: GuestsConfirmProps) {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const { tripId } = useParams<{ tripId: string }>();

  useEffect(() => {
    api.get(`/trips/${tripId}/participants`).then((response) => {
      setParticipants(response.data.participants);
    });
  }, [tripId]);

  const confirmParticipant = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;

    let participantId: string | undefined;

    const participant = participants.find((participant) => participant.name === name || participant.email === email);
    if (participant) {
      participantId = participant.id;
    } else {
      console.error('Participante não encontrado.');
      return;
    }

    try {
      const response = await api.patch(`/participants/${participantId}/confirm`, {
        name,
        email,
        is_confirmed: false,
      });
      console.log('Confirmação realizada com sucesso:', response.data);
    } catch (error) {
      console.error('Erro ao confirmar participante:', error);
    }
    window.document.location.reload();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold">Confirmar participação</p>
            <button onClick={closeGuestsModal}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Você foi convidado(a) para participar de uma viagem para Florianópolis, Brasil nas datas de 16 a 27 de
            Agosto de 2024.
          </p>
          <p className="text-sm text-zinc-400">Para confirmar sua presença na viagem, preencha os dados abaixo:</p>
        </div>

        <form onSubmit={confirmParticipant} className="space-y-3">
          <div className="flex items-center gap-2 px-4 rounded-lg h-14 bg-zinc-950 border-zinc-800">
            <User className="text-zinc-400 size-5" />
            <input
              type="text"
              name="name"
              placeholder="Seu nome completo"
              className="flex-1 text-lg bg-transparent outline-none placeholder-zinc-400"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center flex-1 gap-2 px-4 rounded-lg h-14 bg-zinc-950 border-zinc-800">
              <Mail className="text-zinc-400 size-5" />
              <input
                type="email"
                name="email"
                required
                placeholder="Seu e-mail"
                className="flex-1 text-lg bg-transparent outline-none placeholder-zinc-400"
              />
            </div>
          </div>

          <Button type="submit" variant="primary" size="full">
            Confirmar participação
          </Button>
        </form>
      </div>
    </div>
  );
}
