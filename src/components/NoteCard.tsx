import type { Note, NoteUpdate } from "../types";

interface NoteCardProps {
  note: Note;
  onDelete: (noteId: string) => void;
  onUpdateNote: (noteId: string, updates: NoteUpdate) => void;
  onAddItem: (noteId: string, text: string) => void;
  onToggleItem: (noteId: string, itemId: string) => void;
  onDeleteItem: (noteId: string, itemId: string) => void;
  onEditItem: (noteId: string, itemId: string, text: string) => void;
}
import ChecklistNoteCard from "./ChecklistNoteCard";
import TextNoteCard from "./TextNoteCard";

function NoteCard({
  note,
  onAddItem,
  onDelete,
  onToggleItem,
  onDeleteItem,
  onEditItem,
  onUpdateNote,
}: NoteCardProps) {
  if (note.type === "checklist") {
    return (
      <ChecklistNoteCard
        note={note}
        onAddItem={onAddItem}
        onDelete={onDelete}
        onToggleItem={onToggleItem}
        onDeleteItem={onDeleteItem}
        onEditItem={onEditItem}
        onUpdate={onUpdateNote}
      />
    );
  }

  return (
    <TextNoteCard
      note={note}
      onDelete={onDelete}
      onUpdate={onUpdateNote}
    />
  );
}

export default NoteCard;
