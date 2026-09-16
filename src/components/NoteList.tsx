import NoteCard from './NoteCard';
import type { Note } from '../types';

type NoteListProps = {
  notes: Note[];
  onDelete: (noteId: string) => void;
  onToggleItem: (noteId: string, itemId: string) => void;
};

function NoteList({ notes, onDelete, onToggleItem }: NoteListProps) {
  if (notes.length === 0) {
    return <p className="text-center text-slate-500">Nog geen notities.</p>;
  }

  return (
    <ul className="w-full space-y-3">
      {notes.map((note) => (
        <li key={note.id}>
          <NoteCard
            note={note}
            onDelete={onDelete}
            onToggleItem={onToggleItem}
          />
        </li>
      ))}
    </ul>
  );
}

export default NoteList;