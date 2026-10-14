import { useState } from "react";
import type { TextNote } from "../Types/types";

interface TextNoteEditFormProps {
  note: TextNote;
  onSave: (title: string, body: string) => void;
  onCancel: () => void;
}

function TextNoteEditForm({ note, onSave, onCancel }: TextNoteEditFormProps) {
  const [title, setTitle] = useState(note.title);
  const [body, setBody] = useState(note.body);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedTitle = title.trim();
    const trimmedBody = body.trim();

    if (!trimmedTitle || !trimmedBody) {
      setErrorMessage("Enter a title and note text first.");
      return;
    }

    onSave(trimmedTitle, trimmedBody);
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <input
        aria-label="Note title"
        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
        onChange={(event) => {
          setTitle(event.target.value);
          setErrorMessage("");
        }}
        type="text"
        value={title}
      />
      <textarea
        aria-label="Note text"
        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
        onChange={(event) => {
          setBody(event.target.value);
          setErrorMessage("");
        }}
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
          onClick={onCancel}
          type="button"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default TextNoteEditForm;