import { useState } from 'react';
import type { TextNoteCardProps } from '../types';

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
    <article className="flex items-center border-l-4 border-blue-500 bg-blue-50 p-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">Text note</p>
        {isEditing ? (
          <div>
            <input aria-label="Titel notitie" onChange={(event) => setTitle(event.target.value)} type="text" value={title} />
            <textarea aria-label="Tekst notitie" onChange={(event) => setBody(event.target.value)} rows={3} value={body} />
            <button onClick={saveChanges} type="button">Opslaan</button>
            <button onClick={() => setIsEditing(false)} type="button">Annuleren</button>
          </div>
        ) : (
          <>
            <p className="text-black">{note.title}</p>
            <p className="whitespace-pre-wrap font-semibold text-black">{note.body}</p>
          </>
        )}
        <p>{dateString}</p>
      </div>
      {!isEditing && <button onClick={startEditing} type="button">Bewerken</button>}
      <button
        aria-label={`Verwijder ${note.title}`}
        className="ml-auto rounded bg-blue-400 p-3 text-white hover:bg-blue-700 transform transition-all duration-200 ease-in-out hover:scale-105 active:scale-95"
        onClick={() => onDelete(note.id)}
        type="button"
      >
        Delete
      </button>
    </article>
  );
}

export default TextNoteCard;