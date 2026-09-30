import ChecklistNoteCard from './ChecklistNoteCard';
import TextNoteCard from './TextNoteCard';
import type { NoteCardProps } from '../types';

function NoteCard({ note, onAddItem, onDelete, onToggleItem, onDeleteItem, onEditItem, onUpdateNote }: NoteCardProps) {
  if (note.type === 'checklist') {
    return <ChecklistNoteCard note={note} onAddItem={onAddItem} onDelete={onDelete} onToggleItem={onToggleItem} onDeleteItem={onDeleteItem} onEditItem={onEditItem} onUpdate={(noteId, updates) => onUpdateNote(noteId, updates)} />;
  }

  return <TextNoteCard note={note} onDelete={onDelete} onUpdate={(noteId, updates) => onUpdateNote(noteId, updates)} />;
}

export default NoteCard;