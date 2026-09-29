import NoteCard from './NoteCard';
import type { NoteListProps } from '../types';

function NoteList({ notes, onAddItem, onDelete, onToggleItem, onDeleteItem }: NoteListProps) {
  if (notes.length === 0) {
    return <p className="text-center text-slate-500">No notes yet.</p>;
  }

  return (
    <ul className="w-full space-y-7
    ">
      {notes.map((note) => (
        <li key={note.id}>
          <NoteCard
            note={note}
            onAddItem={onAddItem}
            onDelete={onDelete}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        </li>
      ))}
    </ul>
  );
}

export default NoteList;