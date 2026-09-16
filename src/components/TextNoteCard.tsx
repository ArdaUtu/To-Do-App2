import type { TextNote } from '../types';

type TextNoteCardProps = {
  note: TextNote;
  onDelete: (noteId: string) => void;
};

function TextNoteCard({ note, onDelete }: TextNoteCardProps) {
  return (
    <article className="flex items-center border border-slate-200 bg-white p-4">
      <div>
        <h2 className="font-semibold">{note.title}</h2>
        <p className="text-slate-600">{note.body}</p>
      </div>
      <button
        aria-label={`Verwijder ${note.title}`}
        className="ml-auto bg-blue-400 p-3 text-white hover:bg-blue-700"
        onClick={() => onDelete(note.id)}
        type="button"
      >
        Verwijderen
      </button>
    </article>
  );
}

export default TextNoteCard;