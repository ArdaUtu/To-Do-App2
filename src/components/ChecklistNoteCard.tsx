import { useState } from 'react';
import ChecklistItemRow from './ChecklistItemRow';
import type { ChecklistNoteCardProps } from '../types';
import PlusIcon from '../images/Plus.png';
import TrashIcon from '../images/Trash.png';

function ChecklistNoteCard({ note, onAddItem, onDelete, onToggleItem, onDeleteItem, onEditItem, onUpdate }: ChecklistNoteCardProps) {
  const [itemText, setItemText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const description = note.description.trim();
  const dateString = new Date(note.createdAt).toLocaleString('nl-NL');
  const completedItems = note.items.filter((item) => item.done).length;

  const addItem = () => {
    if (!itemText.trim()) return;
    onAddItem(note.id, itemText);
    setItemText('');
  };

  const saveTitle = () => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;
    onUpdate(note.id, { title: trimmedTitle });
    setIsEditing(false);
  };

  return (
    <article className="rounded-xl border border-emerald-100 border-l-4 border-l-lime-400 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-emerald-700">Checklist</p>
          {isEditing ? (
            <form id={`checklist-title-form-${note.id}`} className="flex flex-wrap gap-2" onSubmit={(event) => { event.preventDefault(); saveTitle(); }}>
              <input
                aria-label="Titel checklist"
                className="min-w-0 flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                onChange={(event) => setTitle(event.target.value)}
                type="text"
                value={title}
              />
            </form>
          ) : (
            <p className="wrap-break-word text-lg font-bold text-slate-900">{note.title}</p>
          )}
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          {isEditing ? (
            <>
              <button className="rounded-lg bg-emerald-800 px-3 py-2 text-xs font-bold text-white" form={`checklist-title-form-${note.id}`} type="submit">Save</button>
              <button className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600" onClick={() => { setTitle(note.title); setIsEditing(false); }} type="button">Cancel</button>
            </>
          ) : (
            <button
              className="rounded-lg border border-emerald-200 bg-white px-3 py-2 text-sm font-semibold text-emerald-800 transition hover:border-emerald-300 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-100"
              onClick={() => { setTitle(note.title); setIsEditing(true); }}
              type="button"
            >
              Change
            </button>
          )}
          <button
            aria-label={`Verwijder ${note.title}`}
            className="rounded-lg bg-rose-50 px-3 py-2 text-xs font-bold text-rose-700 transition hover:bg-rose-100 active:scale-95"
            onClick={() => onDelete(note.id)}
            type="button"
          >
            <img alt="" aria-hidden="true" className="mr-1 inline-block size-4 object-contain align-middle" src={TrashIcon} />
            Delete
          </button>
        </div>
      </div>
      {description && (
        description.includes('\n') ? (
          <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-600">{description} </p>
        ) : (
          <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
        )
      )}
      <p className="mt-3 text-xs text-slate-400">{dateString}</p>
      <form
        className="mt-4 flex gap-2 rounded-xl bg-slate-50 p-2"
        onSubmit={(event) => {
          event.preventDefault();
          addItem();
        }}
      >
        <input
          aria-label={`Voeg item toe aan ${note.title}`}
          className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
          onChange={(event) => setItemText(event.target.value)}
          placeholder="New checklist-item"
          type="text"
          value={itemText}
        />
        <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-800 px-4 py-2 text-sm font-bold text-white transition hover:bg-emerald-900" type="submit">
          <img alt="" aria-hidden="true" className="size-4 object-contain" src={PlusIcon} />
          Add
        </button>
      </form>
      <div className="mt-4">
        <div className="mb-2 flex justify-between text-xs font-bold text-slate-600">
          <span>Progress</span>
          <span>{completedItems} / {note.items.length} Done</span>
        </div>
        <div
          aria-label={`${completedItems} van ${note.items.length} items gedaan`}
          aria-valuemax={note.items.length}
          aria-valuemin={0}
          aria-valuenow={completedItems}
          className="h-2 w-full rounded-full bg-slate-100"
          role="progressbar"
        >
          
          <div
            className="h-2 rounded-full bg-lime-400 transition-all"
            style={{ width: note.items.length ? `${(completedItems / note.items.length) * 100}%` : '0%' }}
          />
        </div>
      </div>
      <ul className="mt-3 divide-y divide-slate-100">
        {note.items.map((item) => (
          <ChecklistItemRow
            item={item}
            key={item.id}
            onDelete={() => onDeleteItem(note.id, item.id)}
            onEdit={(text) => onEditItem(note.id, item.id, text)}
            onToggle={() => onToggleItem(note.id, item.id)}
          />
        ))}
      </ul>
      {note.items.length === 0 && (
        <p className="mt-3 rounded-lg bg-slate-50 px-3 py-4 text-sm text-slate-500">No checklist items yet.</p>
      )}
    </article>
  );
}

export default ChecklistNoteCard;