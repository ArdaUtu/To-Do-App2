import { useState } from 'react';
import type { TextNoteCardProps } from '../types';
import TrashIcon from '../images/Trash.png';

function TextNoteCard({ note, onDelete, onUpdate }: TextNoteCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const dateString = new Date(note.createdAt).toLocaleString('nl-NL');

  const startEditing = () => {
    setTitle(note.title ?? '');
    setBody(note.body ?? '');
    setIsEditing(true);
  };

  const saveChanges = () => {
    onUpdate(note.id, { title, body });
    setIsEditing(false);
  };

  return (
    <article className="flex items-start gap-4 rounded-xl border border-emerald-100 border-l-4 border-l-lime-400 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="min-w-0 flex-1">
        <p className="mb-2 text-xs font-bold uppercase tracking-widest text-emerald-700">Text note</p>
        {isEditing ? (
          <div>
            <input aria-label="Titel notitie" onChange={(event) => setTitle(event.target.value)} type="text" value={title} />
            <textarea aria-label="Tekst notitie" onChange={(event) => setBody(event.target.value)} rows={3} value={body} />
            <div className="mt-3 flex flex-row items-center gap-2">
              <button className="rounded-lg bg-emerald-800 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-900 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200" onClick={saveChanges} type="button">Save</button>
              <button className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-200" onClick={() => setIsEditing(false)} type="button">Cancel</button>
            </div>
          </div>
        ) : (
          <>
            <p className="break-words text-lg font-bold text-slate-900">{note.title}</p>
              <p className="whitespace-pre-wrap break-words text-sm leading-6 text-slate-600">{note.body}</p>
          </>
        )}
        <p className="mt-4 text-xs text-slate-400">{dateString}</p>
      </div>
      {!isEditing && <button className="rounded-lg border border-emerald-200 bg-white px-3 py-2 text-sm font-semibold text-emerald-800 transition hover:border-emerald-300 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-100" onClick={startEditing} type="button">Change</button>}
      <button
        aria-label={`Verwijder ${note.title}`}
        className="ml-auto rounded-lg bg-rose-50 px-3 py-2 text-xs font-bold text-rose-700 transition hover:bg-rose-100 active:scale-95"
        onClick={() => onDelete(note.id)}
        type="button"
      >
        <img alt="" aria-hidden="true" className="mr-1 inline-block size-4 object-contain align-middle" src={TrashIcon} />
        Delete
      </button>
    </article>
  );
}

export default TextNoteCard;