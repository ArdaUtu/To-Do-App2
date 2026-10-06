import { useState } from "react";
import type { ChecklistNote } from "../Types/types";

interface ChecklistEditFormProps {
  note: ChecklistNote;
  onSave: (title: string, description: string) => void;
  onCancel: () => void;
}

function ChecklistEditForm({ note, onSave, onCancel }: ChecklistEditFormProps) {
  const [title, setTitle] = useState(note.title);
  const [description, setDescription] = useState(note.description);
  const [errorMessage, setErrorMessage] = useState("");

  const submit = () => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setErrorMessage("Enter a checklist title first.");
      return;
    }
    onSave(trimmedTitle, description.trim());
  };

  return (
    <form
      className="w-full"
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
    >
      <div className="flex flex-col gap-3">
        <input
          aria-label="Checklist title"
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
          onChange={(event) => {
            setTitle(event.target.value);
            setErrorMessage("");
          }}
          type="text"
          value={title}
        />
        <textarea
          aria-label="Checklist description"
          className="w-full  rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Description (optional)"
          rows={2}
          value={description}
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
      </div>
    </form>
  );
}

export default ChecklistEditForm;
