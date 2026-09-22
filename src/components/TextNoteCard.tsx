import type { TextNoteCardProps } from '../types';

function TextNoteCard({ note, onDelete }: TextNoteCardProps) {
  const dateString = new Date(note.createdAt).toLocaleString('nl-NL');

  return (
    <article className="flex items-center border-l-4 border-blue-500 bg-blue-50 p-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">Text note</p>
        <p className="text-black">{note.title}</p>
        <p className="whitespace-pre-wrap font-semibold text-black">{note.body}</p>
        <p>{dateString}</p>
      </div>
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