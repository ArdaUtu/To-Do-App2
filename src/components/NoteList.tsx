import type { Note, NoteUpdate } from "../Types/types";
import NoteCard from "./NoteCard";

interface NoteListProps {
  notes: Note[];
  onDelete: (noteId: string) => void;
  onUpdateNote: (noteId: string, updates: NoteUpdate) => void;
  onAddItem: (noteId: string, text: string) => void;
  onToggleItem: (noteId: string, itemId: string) => void;
  onDeleteItem: (noteId: string, itemId: string) => void;
  onEditItem: (noteId: string, itemId: string, text: string) => void;
}

function NoteList({
  notes,
  onAddItem,
  onDelete,
  onToggleItem,
  onDeleteItem,
  onEditItem,
  onUpdateNote,
}: NoteListProps) {
  if (notes.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center text-slate-500">
        No notes yet. Add your first note above.
      </p>
    );
  }

  return (
    <ul className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {notes.map((note) => (
        <li key={note.id}>
          <NoteCard
            note={note}
            onAddItem={onAddItem}
            onDelete={onDelete}
            onDeleteItem={onDeleteItem}
            onEditItem={onEditItem}
            onToggleItem={onToggleItem}
            onUpdateNote={onUpdateNote}
          />
        </li>
      ))}
    </ul>
  );
}

export default NoteList;
