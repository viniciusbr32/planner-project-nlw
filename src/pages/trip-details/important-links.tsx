import { Link2, Plus } from 'lucide-react';
import { Button } from '../../components/button';
import { CreateImportantLinksModal } from './create-important-links-modal';
import { useEffect, useState } from 'react';
import { api } from '../../lib/axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

interface ImportantLinksProps {
  title: string;
  url: string;
  id: string;
}

export function ImportantLinks() {
  const [isCreateImportantLinks, setIsCreateImportantLinks] = useState(false);
  const [links, setLinks] = useState<ImportantLinksProps[]>([]);

  const { tripId } = useParams();

  useEffect(() => {
    api.get(`/trips/${tripId}/links`).then((response) => setLinks(response.data.links));
  }, [tripId]);

  const addLinks = async (title: string, url: string) => {
    try {
      const response = await api.post(`/trips/${tripId}/links`, {
        title,
        url,
      });
      if (response.status === 200) {
        setLinks((prevLinks) => [...prevLinks, { id: response.data.id, title, url }]);
        toast.success('Link cadastrado com sucesso');
      }
    } catch (error) {
      toast.error('Erro ao cadastrar o link');
    }
  };

  function openCreateImportantLinks() {
    setIsCreateImportantLinks(true);
  }

  function closeCreateImportantLinks() {
    setIsCreateImportantLinks(false);
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Links Importantes</h2>

      <div className="space-y-5">
        {links.length > 0 ? (
          <div className="space-y-5">
            {links.map((link, index) => (
              <div key={index} className="flex items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <span className="block font-medium text-zinc-100">{link.title}</span>
                  <a
                    target="_blank"
                    href={link.url}
                    className="block text-xs truncate text-zinc-400 hover:text-zinc-200"
                  >
                    {link.url}
                  </a>
                </div>
                <Link2 className="text-zinc-400 size-5 shrink-0" />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-zinc-500">Nenhuma atividade cadastrada nessa data.</p>
        )}
      </div>

      {isCreateImportantLinks && (
        <CreateImportantLinksModal addLinks={addLinks} closeCreateImportantLinks={closeCreateImportantLinks} />
      )}

      <Button onClick={openCreateImportantLinks} variant="secondary" size="full">
        <Plus className="size-5 text-zinc-400" />
        Cadastrar novo Link
      </Button>
    </div>
  );
}
