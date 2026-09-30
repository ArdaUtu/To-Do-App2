import { useState } from 'react';
import ChecklistItemRow from './ChecklistItemRow';
import type { ChecklistNoteCardProps } from '../types';

function ChecklistNoteCard({ note, onAddItem, onDelete, onToggleItem, onDeleteItem, onEditItem, onUpdate }: ChecklistNoteCardProps) {
  const [itemText, setItemText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const description = note.description.trim();
  const dateString = new Date(note.createdAt).toLocaleString('nl-NL');
  const completedItems = note.items.filter((item) => item.done).length;

  const addItem = () => {
    if (!itemText.trim()) return;
    onAddItem(note.id, itemText);
    setItemText('');
  };

  const startEditing = () => {
    setTitle(note.title ?? '');
    setIsEditing(true);
  };

  const saveChanges = () => {
    onUpdate(note.id, { title });
    setIsEditing(false);
  };

  return (
    <article className="border-l-4 border-emerald-500 bg-emerald-50 p-4">
      <div className="flex items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Checklist</p>
          {isEditing ? (
            <div>
              <input aria-label="Titel checklist" onChange={(event) => setTitle(event.target.value)} type="text" value={title} />
              <button onClick={saveChanges} type="button">Opslaan</button>
              <button onClick={() => setIsEditing(false)} type="button">Annuleren</button>
            </div>
          ) : (
            <p>{note.title}</p>
          )}
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
      </div>
      {description && (
        description.includes('\n') ? (
          <p className="mt-1 whitespace-pre-wrap text-sm text-slate-600">{description} </p>
        ) : (
          <p className="mt-1 text-sm text-slate-600">{description}</p>
        )
      )}
      <p className="">{dateString}</p>
      <form
        className="mt-4 flex gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          addItem();
        }}
      >
        <input
          aria-label={`Voeg item toe aan ${note.title}`}
          className="min-w-0 flex-1 rounded border border-slate-300 bg-white px-3 py-2"
          onChange={(event) => setItemText(event.target.value)}
          placeholder="New checklist-item"
          type="text"
          value={itemText}
        />
        <button className="rounded bg-emerald-600 px-3 py-2 font-semibold text-white hover:bg-emerald-700" type="submit">
          Add
        </button>
      </form>
      <div className="mt-4">
        <div className="mb-1 flex justify-between text-sm font-semibold text-slate-700">
          <span>Progress</span>
          <span>{completedItems} / {note.items.length} Done</span>
        </div>
        <div
          aria-label={`${completedItems} van ${note.items.length} items gedaan`}
          aria-valuemax={note.items.length}
          aria-valuemin={0}
          aria-valuenow={completedItems}
          className="h-2 w-full rounded-full bg-slate-200"
          role="progressbar"
        >
          
          <div
            className="h-2 rounded-full bg-emerald-600 transition-all"
            style={{ width: note.items.length ? `${(completedItems / note.items.length) * 100}%` : '0%' }}
          />
        </div>
      </div>
      <ul className="mt-3 space-y-2">
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
        <p className="mt-3 text-slate-500">No checklist items yet.</p>
      )}
    </article>
  );
}

export default ChecklistNoteCard;