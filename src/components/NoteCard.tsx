import ChecklistNoteCard from './ChecklistNoteCard';
import TextNoteCard from './TextNoteCard';
import type { Note } from '../types';

type NoteCardProps = {
  note: Note;
  onDelete: (noteId: string) => void;
  onToggleItem: (noteId: string, itemId: string) => void;
};

function NoteCard({ note, onDelete, onToggleItem }: NoteCardProps) {
  if (note.type === 'checklist') {
    return <ChecklistNoteCard note={note} onDelete={onDelete} onToggleItem={onToggleItem} />;
  }

  return <TextNoteCard note={note} onDelete={onDelete} />;
}

export default NoteCard;