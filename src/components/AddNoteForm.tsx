import { useState } from 'react';
import type { Note } from '../types';

type AddNoteFormProps = {
  onAdd: (note: Note) => void;
};

type NoteType = Note['type'];

function AddNoteForm({ onAdd }: AddNoteFormProps) {
  const [title, setTitle] = useState('');
  const [noteType, setNoteType] = useState<NoteType>('text');

  const submitNote = () => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    const id = crypto.randomUUID();
    if (noteType === 'checklist') {
      onAdd({ id, title: trimmedTitle, createdAt: Date.now(), type: 'checklist', items: [] });
    } else {
      onAdd({ id, title: trimmedTitle, createdAt: Date.now(), type: 'text', body: trimmedTitle });
    }

    setTitle('');
  };

  return (
    <form
      className="mb-6 flex flex-col gap-3 sm:flex-row"
      onSubmit={(event) => {
        event.preventDefault();
        submitNote();
      }}
    >
      <input
        aria-label="Notitietitel"
        className="w-full rounded border border-slate-400 px-3 py-3"
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Titel van je notitie"
        type="text"
        value={title}
      />
      <select
        aria-label="Notitietype"
        className="rounded border border-slate-400 bg-white px-3 py-3"
        onChange={(event) => setNoteType(event.target.value as NoteType)}
        value={noteType}
      >
        <option value="text">Tekstnotitie</option>
        <option value="checklist">Checklist</option>
      </select>
      <button
        className="rounded bg-blue-400 px-4 py-2 font-semibold text-white hover:bg-blue-700"
        type="submit"
      >
        Toevoegen
      </button>
    </form>
  );
}

export default AddNoteForm;