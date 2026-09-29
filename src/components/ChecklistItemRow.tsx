import type { ChecklistItemRowProps } from '../types';

function ChecklistItemRow({ item, onToggle, onDelete }: ChecklistItemRowProps) {
  return (
    <li className="flex items-center gap-2">
      <input checked={item.done} onChange={onToggle} type="checkbox" />
      <span className={item.done ? 'text-slate-400 line-through' : ''}>{item.text}</span>
      <button
        aria-label={`Verwijder checklist-item ${item.text}`}
        className="ml-auto rounded bg-red-500 px-2 py-1 text-sm text-white hover:bg-red-700"
        onClick={onDelete}
        type="button"
      >
        Delete
      </button>
    </li>
  );
}

export default ChecklistItemRow;