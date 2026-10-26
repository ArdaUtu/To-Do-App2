import { useState } from "react";
import type { NoteUpdate, TextNote } from "../Types/types";
import DeleteConfirmation from "./DeleteConfirmation";
import TextNoteEditForm from "./TextNoteEditForm";
import ActionMenu from "./ActionMenu";

interface TextNoteCardProps {
  note: TextNote;
  onDelete: (noteId: string) => void;
  onUpdate: (noteId: string, updates: NoteUpdate) => void;
}

function TextNoteCard({ note, onDelete, onUpdate }: TextNoteCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const dateString = new Date(note.createdAt).toLocaleString("nl-NL");

  const startEditing = () => {
    setIsEditing(true);
  };

  const saveChanges = (title: string, body: string) => {
    onUpdate(note.id, { title, body });
    setIsEditing(false);
  };

  return (
    <article className="rounded-xl border border-sky-100 border-l-4 border-l-sky-400 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-widest text-sky-700">Text note</p>
        {!isEditing && (
          <ActionMenu
            label={note.title}
            color="sky"
            onDelete={() => setIsDeleteConfirmationOpen(true)}
            onEdit={startEditing}
          />
        )}
      </div>
      <div className="min-w-0 flex-1">
        {isEditing ? (
          <TextNoteEditForm
            note={note}
            onSave={saveChanges}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <>
            <p className="wrap-break-word text-lg font-bold text-slate-900">
              {note.title}
            </p>
            <p className="whitespace-pre-wrap wrap-anywhere text-sm leading-6 text-slate-600">
              {note.body}
            </p>
          </>
        )}
        <p className="mt-4 text-xs text-slate-400">{dateString}</p>
      </div>
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

export default TextNoteCard;
