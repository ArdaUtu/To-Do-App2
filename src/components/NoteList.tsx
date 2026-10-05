import type { NoteListProps } from "../types";
import NoteCard from "./NoteCard";

function NoteList({
  notes,
  onAddItem,
  onDelete,
  onToggleItem,
  onDeleteItem,
  onEditItem,
  onUpdateNote,
}: NoteListProps) {
  // maak de lege staat vriendelijker :D, bijv. "Nog geen notities. Voeg hierboven je eerste toe!"
  if (notes.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center text-slate-500">
        No notes yet.
      </p>
    );
  }

  // Fix Fase 6 vraagt 3 kolommen vanaf lg: voeg lg:grid-cols-3 toe (en maak max-w-4xl in Nodefunctions(zou moeten Notefunctions zijn) misschien breder zodat 3 kaarten passen).
  return (
    <ul className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
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
