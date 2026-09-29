import ChecklistNoteCard from './ChecklistNoteCard';
import TextNoteCard from './TextNoteCard';
import type { NoteCardProps } from '../types';

function NoteCard({ note, onAddItem, onDelete, onToggleItem, onDeleteItem }: NoteCardProps) {
  if (note.type === 'checklist') {
    return <ChecklistNoteCard note={note} onAddItem={onAddItem} onDelete={onDelete} onToggleItem={onToggleItem} onDeleteItem={onDeleteItem} />;
  }

  return <TextNoteCard note={note} onDelete={onDelete} />;
}

export default NoteCard;