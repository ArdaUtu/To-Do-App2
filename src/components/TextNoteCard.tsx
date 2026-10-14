import { useRef, useState } from "react";
import DotsIcon from "../images/Dots.png";
import EditIcon from "../images/Edit.png";
import TrashIcon from "../images/Trash.png";
import type { NoteUpdate, TextNote } from "../Types/types";
import useClickOutside from "../hooks/useClickOutside";
import TextNoteEditForm from "./TextNoteEditForm";

interface TextNoteCardProps {
  note: TextNote;
  onDelete: (noteId: string) => void;
  onUpdate: (noteId: string, updates: NoteUpdate) => void;
}

function TextNoteCard({ note, onDelete, onUpdate }: TextNoteCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const dateString = new Date(note.createdAt).toLocaleString("nl-NL");

  useClickOutside(menuRef, () => setIsMenuOpen(false), isMenuOpen);

  const menuDotsIcon = (
    <img
      alt="Options"
      className="size-4 object-contain opacity-80"
      src={DotsIcon}
    />
  );

  const startEditing = () => {
    setIsEditing(true);
  };

  const saveChanges = (title: string, body: string) => {
    onUpdate(note.id, { title, body });
    setIsEditing(false);
  };

  return (
    <article className="rounded-xl border border-sky-100 border-l-4 border-l-sky-400 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-widest text-sky-700">Text note</p>
        {!isEditing && (
          <div className="relative shrink-0" ref={menuRef}>
            <button
              aria-label={`More actions for ${note.title}`}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-sky-200 bg-white text-sky-800 shadow-sm transition hover:border-sky-300 hover:bg-sky-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-100"
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
                    startEditing();
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
    </article>
  );
}

export default TextNoteCard;
