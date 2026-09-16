import ChecklistItemRow from './ChecklistItemRow';
import type { ChecklistNote } from '../types';

type ChecklistNoteCardProps = {
  note: ChecklistNote;
  onDelete: (noteId: string) => void;
  onToggleItem: (noteId: string, itemId: string) => void;
};

function ChecklistNoteCard({ note, onDelete, onToggleItem }: ChecklistNoteCardProps) {
  return (
    <article className="border border-slate-200 bg-white p-4">
      <div className="flex items-center">
        <h2 className="font-semibold">{note.title}</h2>
        <button
          aria-label={`Verwijder ${note.title}`}
          className="ml-auto bg-blue-400 p-3 text-white hover:bg-blue-700"
          onClick={() => onDelete(note.id)}
          type="button"
        >
          Verwijderen
        </button>
      </div>
      <ul className="mt-3 space-y-2">
        {note.items.map((item) => (
          <ChecklistItemRow
            item={item}
            key={item.id}
            onToggle={() => onToggleItem(note.id, item.id)}
          />
        ))}
      </ul>
      {note.items.length === 0 && (
        <p className="mt-3 text-slate-500">Nog geen checklistitems.</p>
      )}
    </article>
  );
}

export default ChecklistNoteCard;