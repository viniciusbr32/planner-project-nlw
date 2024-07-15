import { Link2, Tag, X } from 'lucide-react';
import { Button } from '../../components/button';
import { FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../lib/axios';

interface CreateImportantLinksModalProps {
  closeCreateImportantLinks: () => void;
}

export function CreateImportantLinksModal({ closeCreateImportantLinks }: CreateImportantLinksModalProps) {
  const { tripId } = useParams();

  async function createImportantLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const title = data.get('title')?.toString();
    const url = data.get('url')?.toString();

    await api.post(`/trips/${tripId}/links`, {
      title,
      url,
    });

    window.document.location.reload();
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 ">
      <div className="w-[640px]  rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold">Cadastrar Links Importantes</p>
            <button onClick={closeCreateImportantLinks}>
              <X className="size-5 text-zinc-400" />{' '}
            </button>
          </div>
          <p className="text-sm text-zinc-400">Todos convidados podem ver os links.</p>
        </div>

        <form onSubmit={createImportantLink} className="space-y-3">
          <div className="flex items-center gap-2 px-4 rounded-lg h-14 bg-zinc-950 border-zinc-800">
            <Tag className="text-zinc-400 size-5" />
            <input
              type="text"
              name="title"
              placeholder="Título do link"
              className="flex-1 text-lg bg-transparent outline-none placeholder-zinc-400"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center flex-1 gap-2 px-4 rounded-lg h-14 bg-zinc-950 border-zinc-800">
              <Link2 className="text-zinc-400 size-5" />
              <input
                type="url"
                name="url"
                required
                placeholder="url : https://www.example.com"
                className="flex-1 text-lg bg-transparent outline-none placeholder-zinc-400"
              />
            </div>
          </div>

          <Button type="submit" variant="primary" size="full">
            Salvar Link
          </Button>
        </form>
      </div>
    </div>
  );
}
