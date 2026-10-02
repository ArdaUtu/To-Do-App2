import { useState } from 'react';
import type { ChecklistItemRowProps } from '../types';
import TrashIcon from '../images/Trash.png';

function ChecklistItemRow({ item, onToggle, onDelete, onEdit }: ChecklistItemRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState('');

  const startEditing = () => {
    setText(item.text ?? '');
    setIsEditing(true);
  };

  const saveChanges = () => {
    onEdit(text);
    setIsEditing(false);
  };

  return (
    <li className={`flex flex-wrap items-center gap-3 py-2 ${isEditing ? 'items-start' : ''}`}>
      <input className="size-4 shrink-0 accent-emerald-700" checked={item.done} onChange={onToggle} type="checkbox" />
      {isEditing ? (
        <form className="flex min-w-0 flex-1 flex-wrap items-center gap-2" onSubmit={(event) => { event.preventDefault(); saveChanges(); }}>
          <input className="min-w-0 flex-1 basis-40 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100" aria-label="Checklist-itemtekst" onChange={(event) => setText(event.target.value)} type="text" value={text} />
          <button className="rounded-lg bg-emerald-800 px-3 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-900 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"  type="submit">Save</button>
          <button className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-200" onClick={() => setIsEditing(false)} type="button">Cancel</button>
        </form>
      ) : (
        <>
          <span className={`min-w-0 flex-1 wrap-break-word text-sm ${item.done ? 'text-slate-400 line-through' : 'text-slate-700'}`} onDoubleClick={startEditing}>{item.text}</span>
          <button className="rounded-lg border border-emerald-200 bg-white px-3 py-2 text-xs font-semibold text-emerald-800 transition hover:border-emerald-300 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-100" aria-label={`Bewerk checklist-item ${item.text}`} onClick={startEditing} type="button">Change</button>
        </>
      )}
      <button
        aria-label={`Verwijder checklist-item ${item.text}`}
        className="rounded-lg bg-rose-50 px-3 py-2 text-xs font-bold text-rose-700 hover:bg-rose-100"
        onClick={onDelete}
        type="button"
      >
        <img alt="" aria-hidden="true" className="mr-1 inline-block size-4 object-contain align-middle" src={TrashIcon} />
        Delete
      </button>
    </li>
  );
}

export default ChecklistItemRow;