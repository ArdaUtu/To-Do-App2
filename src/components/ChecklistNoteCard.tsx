import { useState } from "react";
import TrashIcon from "../images/Trash.png";
import type { ChecklistNote, NoteUpdate } from "../types";
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
  const displayDescription = note.description.trim();
  const dateString = new Date(note.createdAt).toLocaleString("nl-NL");

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
        <div className="flex shrink-0 flex-wrap items-center gap-2 ">
          {!isEditing && (
            <button
              className="min-h-11 min-w-11 rounded-lg border border-emerald-200 bg-white px-3 py-2 text-sm font-semibold text-emerald-800 transition hover:border-emerald-300 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-100"
              onClick={() => setIsEditing(true)}
              type="button"
            >
              Edit
            </button>
          )}
          <button
            aria-label={`Delete ${note.title}`}
            className="min-h-11 min-w-11 rounded-lg bg-rose-50 px-3 py-2 text-xs font-bold text-rose-700 transition hover:bg-rose-100 active:scale-95"
            onClick={() => onDelete(note.id)}
            type="button"
          >
            <img
              alt=""
              aria-hidden="true"
              className="mr-1 inline-block size-4 object-contain align-middle"
              src={TrashIcon}
            />
            Delete
          </button>
        </div>
      </div>
      {!isEditing && displayDescription && (
        <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-600">
          {displayDescription}
        </p>
      )}
      <p className="mt-3 text-xs text-slate-400">{dateString}</p>
      <ChecklistItemForm
        noteTitle={note.title}
        onAdd={(text) => onAddItem(note.id, text)}
      />
      <ChecklistProgress
        items={note.items}
        onDeleteItem={(itemId) => onDeleteItem(note.id, itemId)}
        onEditItem={(itemId, text) => onEditItem(note.id, itemId, text)}
        onToggleItem={(itemId) => onToggleItem(note.id, itemId)}
      />
    </article>
  );
}

export default ChecklistNoteCard;
