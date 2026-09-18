import ChecklistItemRow from './ChecklistItemRow';
import type { ChecklistNoteCardProps } from '../types';

function ChecklistNoteCard({ note, onDelete, onToggleItem }: ChecklistNoteCardProps) {
  return (
    <article className="border-l-4 border-emerald-500 bg-emerald-50 p-4">
      <div className="flex items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Checklist</p>
          <h2 className="font-semibold text-slate-900">{note.title}</h2>
        </div>
        <button
          aria-label={`Verwijder ${note.title}`}
          className="ml-auto rounded bg-blue-400 p-3 text-white hover:bg-blue-700 transform transition-all duration-200 ease-in-out hover:scale-105 active:scale-95"
          onClick={() => onDelete(note.id)}
          type="button"
        >
          Delete
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