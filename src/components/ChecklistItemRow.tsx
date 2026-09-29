import { useState } from 'react';
import type { ChecklistItemRowProps } from '../types';

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
    <li className="flex items-center gap-2">
      <input checked={item.done} onChange={onToggle} type="checkbox" />
      {isEditing ? (
        <>
          <input aria-label="Checklist-itemtekst" onChange={(event) => setText(event.target.value)} type="text" value={text} />
          <button onClick={saveChanges} type="button">Opslaan</button>
          <button onClick={() => setIsEditing(false)} type="button">Annuleren</button>
        </>
      ) : (
        <>
          <span className={item.done ? 'text-slate-400 line-through' : ''} onDoubleClick={startEditing}>{item.text}</span>
          <button aria-label={`Bewerk checklist-item ${item.text}`} onClick={startEditing} type="button">Bewerken</button>
        </>
      )}
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