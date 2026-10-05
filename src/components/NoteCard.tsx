import type { NoteCardProps } from "../types";
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
  // goed gebruik van de discriminated union. Hover over "note" binnen deze if en eronder: TS weet precies welk type het is.
  if (note.type === "checklist") {
    return (
      <ChecklistNoteCard
        note={note}
        onAddItem={onAddItem}
        onDelete={onDelete}
        onToggleItem={onToggleItem}
        onDeleteItem={onDeleteItem}
        onEditItem={onEditItem}
        onUpdate={(noteId, updates) => onUpdateNote(noteId, updates)}
      />
    );
  }

  // review deze lijn, de arrow-functies eromheen zijn niet nodig: onUpdate={onUpdateNote} werkt direct (hier en bij de checklist-return).
  return (
    <TextNoteCard
      note={note}
      onDelete={onDelete}
      onUpdate={(noteId, updates) => onUpdateNote(noteId, updates)}
    />
  );
}

export default NoteCard;
