import { Plus } from 'lucide-react';
import { useState } from 'react';
import { CreateActivyModal } from './create-activy-modal';
import { ImportantLinks } from './important-links';
import { Guests } from './guest';
import { Activities } from './activities';
import { DestinationAndDateHeader } from './destionation-and-date-header';

export function TripDetailsPage() {
  const [isCreateActivyModalOpen, setIsCreateActivyModalOpen] = useState(false);

  function openCreateActivyModal() {
    setIsCreateActivyModalOpen(true);
  }

  function closeCreateActivyModal() {
    setIsCreateActivyModalOpen(false);
  }

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <DestinationAndDateHeader />
      <main className="flex gap-16 px-4 ">
        <div className="flex-1 space-y-6 ">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Atividades</h2>
            <button
              onClick={openCreateActivyModal}
              className="flex items-center gap-2 px-5 py-2 text-lg font-medium rounded-lg bg-lime-300 text-lime-950 hover:bg-lime-400"
            >
              <Plus className="size-5" /> Cadastrar Atividade
            </button>
          </div>
          <Activities />
        </div>

        <div className="space-y-6 w-80">
          <ImportantLinks />
          <div className="w-full h-px bg-zinc-800" />
          <Guests />
        </div>
      </main>

      {isCreateActivyModalOpen && <CreateActivyModal closeCreateActivyModal={closeCreateActivyModal} />}
    </div>
  );
}
