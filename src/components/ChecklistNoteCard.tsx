import { useRef, useState } from "react";
import type { ChecklistNote, NoteUpdate } from "../Types/types";
import useClickOutside from "../hooks/useClickOutside";
import ChecklistEditForm from "./ChecklistEditForm";
import ChecklistItemForm from "./ChecklistItemForm";
import ChecklistProgress from "./ChecklistProgress";
import DeleteConfirmation from "./DeleteConfirmation";
import DeleteButton from "./buttons/DeleteButton";
import DotsButton from "./buttons/DotsButton";
import EditButton from "./buttons/EditButton";

interface ChecklistNoteCardProps {
  note: ChecklistNote;
  onAddItem: (noteId: string, text: string) => void;
  onDelete: (noteId: string) => void;
  onToggleItem: (noteId: string, itemId: string) => void;
  onDeleteItem: (noteId: string, itemId: string) => void;
  onEditItem: (noteId: string, itemId: string, text: string) => void;
  onUpdate: (noteId: string, updates: NoteUpdate) => void;
}

function ChecklistNoteCard({
  note,
  onAddItem,
  onDelete,
  onToggleItem,
  onDeleteItem,
  onEditItem,
  onUpdate,
}: ChecklistNoteCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const displayDescription = note.description.trim();
  const dateString = new Date(note.createdAt).toLocaleString("nl-NL");

  useClickOutside(menuRef, () => setIsMenuOpen(false), isMenuOpen);

  const saveChanges = (title: string, description: string) => {
    onUpdate(note.id, { title, description });
    setIsEditing(false);
  };

  return (
    <article className="rounded-xl border border-emerald-100 border-l-4 border-l-lime-400 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-emerald-700">
            Checklist
          </p>
          {isEditing ? (
            <ChecklistEditForm
              note={note}
              onCancel={() => setIsEditing(false)}
              onSave={saveChanges}
            />
          ) : (
            <p className="wrap-break-word text-lg font-bold text-slate-900">
              {note.title}
            </p>
          )}
        </div>
        {!isEditing && (
          <div className="relative shrink-0" ref={menuRef}>
            <DotsButton
              isExpanded={isMenuOpen}
              noteTitle={note.title}
              onClick={() => setIsMenuOpen((open) => !open)}
              variant="checklist"
            />
            {isMenuOpen && (
              <div className="absolute right-0 z-20 mt-2 w-32 rounded-xl border border-slate-200 bg-white p-1 shadow-lg">
                <EditButton
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsEditing(true);
                  }}
                  variant="menu"
                />
                <DeleteButton
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsDeleteConfirmationOpen(true);
                  }}
                  variant="menu"
                />
              </div>
            )}
          </div>
        )}
      </div>
      {!isEditing && displayDescription && (
        <p className="mt-2 wrap-break-word whitespace-pre-wrap text-sm leading-6 text-slate-600">
          {displayDescription}
        </p>
      )}
      <p className="mt-3 text-xs text-slate-400">{dateString}</p>
      <ChecklistProgress
        items={note.items}
        onDeleteItem={(itemId) => onDeleteItem(note.id, itemId)}
        onEditItem={(itemId, text) => onEditItem(note.id, itemId, text)}
        onToggleItem={(itemId) => onToggleItem(note.id, itemId)}
      />
      <ChecklistItemForm
        noteTitle={note.title}
        onAdd={(text) => onAddItem(note.id, text)}
      />
      {isDeleteConfirmationOpen && (
        <DeleteConfirmation
          itemLabel={note.title}
          onCancel={() => setIsDeleteConfirmationOpen(false)}
          onConfirm={() => onDelete(note.id)}
        />
      )}
    </article>
  );
}

export default ChecklistNoteCard;
