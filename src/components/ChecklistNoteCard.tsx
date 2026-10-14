import { useState } from "react";
import DotsIcon from "../images/Dots.png";
import EditIcon from "../images/Edit.png";
import TrashIcon from "../images/Trash.png";
import type { ChecklistNote, NoteUpdate } from "../Types/types";
import ChecklistEditForm from "./ChecklistEditForm";
import ChecklistItemForm from "./ChecklistItemForm";
import ChecklistProgress from "./ChecklistProgress";

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
  const displayDescription = note.description.trim();
  const dateString = new Date(note.createdAt).toLocaleString("nl-NL");

  const menuDotsIcon = (
    <img
      alt="Options"
      className="size-4 object-contain opacity-80"
      src={DotsIcon}
    />
  );

  const saveChanges = (title: string, description: string) => {
    onUpdate(note.id, { title, description });
    setIsEditing(false);
  };

  return (
    <article className="rounded-xl border border-emerald-100 border-l-4 border-l-lime-400 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
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
          <div className="relative shrink-0">
            <button
              aria-label={`More actions for ${note.title}`}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-emerald-200 bg-white text-emerald-800 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-100"
              onClick={() => setIsMenuOpen((open) => !open)}
              type="button"
            >
              {menuDotsIcon}
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 z-20 mt-2 w-32 rounded-xl border border-slate-200 bg-white p-1 shadow-lg">
                <button
                  className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                  onClick={() => {
                    setIsEditing(true);
                    setIsMenuOpen(false);
                  }}
                  type="button"
                >
                  <img alt="Edit" className="size-4 object-contain" src={EditIcon} />
                  <span>Edit</span>
                </button>
                <button
                  className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm font-semibold text-rose-700 transition hover:bg-rose-50"
                  onClick={() => {
                    onDelete(note.id);
                    setIsMenuOpen(false);
                  }}
                  type="button"
                >
                  <img alt="Delete" className="size-4 object-contain" src={TrashIcon} />
                  <span>Delete</span>
                </button>
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
    </article>
  );
}

export default ChecklistNoteCard;
