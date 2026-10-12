import { useState } from "react";
import TrashIcon from "../images/Trash.png";
import type { NoteUpdate, TextNote } from "../Types/types";

interface TextNoteCardProps {
  note: TextNote;
  onDelete: (noteId: string) => void;
  onUpdate: (noteId: string, updates: NoteUpdate) => void;
}

function TextNoteCard({ note, onDelete, onUpdate }: TextNoteCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dateString = new Date(note.createdAt).toLocaleString("nl-NL");

  const startEditing = () => {
    setTitle(note.title);
    setBody(note.body);
    setErrorMessage("");
    setIsEditing(true);
  };

  const saveChanges = () => {
    const trimmedTitle = title.trim();
    const trimmedBody = body.trim();
    if (!trimmedTitle || !trimmedBody) {
      setErrorMessage("Enter a title and note text first.");
      return;
    }

    onUpdate(note.id, { title: trimmedTitle, body: trimmedBody });
    setIsEditing(false);
  };

  return (
    <article className="rounded-xl border border-sky-100 border-l-4 border-l-sky-400 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-widest text-sky-700">Text note</p>
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          {!isEditing && (
            <button
              className="min-h-11 min-w-11 rounded-lg border border-sky-200 bg-white px-3 py-2 text-sm font-semibold text-sky-800 transition hover:border-sky-300 hover:bg-sky-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-100"
              onClick={startEditing}
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
      <div className="min-w-0 flex-1">
        {isEditing ? (
          <form
            className="flex flex-col gap-3"
            onSubmit={(event) => {
              event.preventDefault();
              saveChanges();
            }}
          >
            <input
              aria-label="Note title"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              onChange={(event) => setTitle(event.target.value)}
              type="text"
              value={title}
            />

            <textarea
              aria-label="Note text"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              onChange={(event) => setBody(event.target.value)}
              rows={3}
              value={body}
            />
            {errorMessage && (
              <p className="text-sm font-semibold text-rose-700" role="alert">
                {errorMessage}
              </p>
            )}
            <div className="mt-1 flex flex-row items-center gap-2">
              <button
                className="min-h-11 min-w-11 rounded-lg bg-emerald-800 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-900 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
                type="submit"
              >
                Save
              </button>
              <button
                className="min-h-11 min-w-11 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-200"
                onClick={() => {
                  setTitle(note.title);
                  setBody(note.body);
                  setErrorMessage("");
                  setIsEditing(false);
                }}
                type="button"
              >
                Cancel
              </button>
            </div>
          </form>
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
