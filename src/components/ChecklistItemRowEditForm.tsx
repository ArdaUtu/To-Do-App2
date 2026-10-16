import { useState } from "react";

interface ChecklistItemRowEditFormProps {
  initialText: string;
  onSave: (text: string) => void;
  onCancel: () => void;
}

function ChecklistItemRowEditForm({
  initialText,
  onSave,
  onCancel,
}: ChecklistItemRowEditFormProps) {
  const [text, setText] = useState(initialText);
  const [errorMessage, setErrorMessage] = useState("");

  const saveChanges = () => {
    const trimmedText = text.trim();
    if (!trimmedText) {
      setErrorMessage("Enter checklist item text first.");
      return;
    }

    onSave(trimmedText);
  };

  return (
    <form
      className="flex min-w-0 flex-1 flex-col gap-2"
      onSubmit={(event) => {
        event.preventDefault();
        saveChanges();
      }}
    >
      <input
        className="min-w-0 flex-1 basis-20 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
        aria-label="Checklist item text"
        onChange={(event) => {
          setText(event.target.value);
          setErrorMessage("");
        }}
        type="text"
        value={text}
      />
      {errorMessage && (
        <p className="w-full text-sm font-semibold text-rose-700" role="alert">
          {errorMessage}
        </p>
      )}
      <div className="flex justify-end gap-2">
        <button
          className="min-h-11 min-w-11 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-200"
          onClick={onCancel}
          type="button"
        >
          Cancel
        </button>
        <button
          className="min-h-11 min-w-11 rounded-lg bg-emerald-800 px-3 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-900 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
          type="submit"
        >
          Save
        </button>
      </div>
    </form>
  );
}

export default ChecklistItemRowEditForm;