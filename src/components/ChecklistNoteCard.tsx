import ChecklistItemRow from './ChecklistItemRow';
import type { ChecklistNoteCardProps } from '../types';

function ChecklistNoteCard({ note, onDelete, onToggleItem }: ChecklistNoteCardProps) {
  const description = note.description.trim();
  const dateString = new Date(note.createdAt).toLocaleString('nl-NL');

  return (
    <article className="border-l-4 border-emerald-500 bg-emerald-50 p-4">
      <div className="flex items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Checklist</p>
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
      {description && (
        description.includes('\n') ? (
          <p className="mt-1 whitespace-pre-wrap text-sm text-slate-600">{description} </p>
        ) : (
          <p className="mt-1 text-sm text-slate-600">{description}</p>
        )
      )}
      <p className="">{dateString}</p>
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
        <p className="mt-3 text-slate-500">No checklist items yet.</p>
      )}
    </article>
  );
}

export default ChecklistNoteCard;