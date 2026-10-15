import { useRef, useState } from "react";
import type { NoteUpdate, TextNote } from "../Types/types";
import useClickOutside from "../hooks/useClickOutside";
import DeleteConfirmation from "./DeleteConfirmation";
import TextNoteEditForm from "./TextNoteEditForm";
import DeleteButton from "./buttons/DeleteButton";
import DotsButton from "./buttons/DotsButton";
import EditButton from "./buttons/EditButton";

interface TextNoteCardProps {
  note: TextNote;
  onDelete: (noteId: string) => void;
  onUpdate: (noteId: string, updates: NoteUpdate) => void;
}

function TextNoteCard({ note, onDelete, onUpdate }: TextNoteCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const dateString = new Date(note.createdAt).toLocaleString("nl-NL");

  useClickOutside(menuRef, () => setIsMenuOpen(false), isMenuOpen);

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
          <div className="relative shrink-0" ref={menuRef}>
            <DotsButton
              isExpanded={isMenuOpen}
              noteTitle={note.title}
              onClick={() => setIsMenuOpen((open) => !open)}
              variant="text"
            />
            {isMenuOpen && (
              <div className="absolute right-0 z-20 mt-2 w-32 rounded-xl border border-slate-200 bg-white p-1 shadow-lg">
                <EditButton
                  onClick={() => {
                    setIsMenuOpen(false);
                    startEditing();
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
