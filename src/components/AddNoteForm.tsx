import PlusIcon from "../images/Plus.png";
import { useState } from "react";
import type { NoteDraft, NoteType } from "../types";

interface AddNoteFormProps {
  onAdd: (note: NoteDraft) => void;
}

function AddNoteForm({ onAdd }: AddNoteFormProps) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [description, setDescription] = useState("");
  const [noteType, setNoteType] = useState<NoteType>("text");
  const [errorMessage, setErrorMessage] = useState("");
  const inputClass =
    "w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 sm:col-span-2";

  const addNote = () => {
    const trimmedTitle = title.trim();
    const trimmedBody = body.trim();

    if (!trimmedTitle) {
      setErrorMessage(noteType === "checklist" ? "Enter a checklist title first." : "Enter a title first.");
      return;
    }

    if (noteType === "text" && !trimmedBody) {
      setErrorMessage("Enter your note first.");
      return;
    }

    onAdd(
      noteType === "checklist"
        ? { type: "checklist", title: trimmedTitle, description: description.trim() }
        : { type: "text", title: trimmedTitle, body: trimmedBody },
    );
    setTitle("");
    setBody("");
    setDescription("");
    setErrorMessage("");
  };

  return (
    <form
      className="mb-8 grid grid-cols-1 gap-3 rounded-2xl border border-emerald-100 bg-slate-50 p-4 shadow-sm sm:grid-cols-[minmax(0,1fr)_auto] sm:p-5"
      onSubmit={(event) => {
        event.preventDefault();
        addNote();
      }}
    >
      <select
        aria-label="Note type"
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 font-medium text-slate-700 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
        onChange={(event) =>
          setNoteType(event.target.value === "checklist" ? "checklist" : "text")
        }
        value={noteType}
      >
        <option value="text">Text note</option>
        <option value="checklist">Checklist</option>
      </select>

      <input
        aria-label={noteType === "checklist" ? "Checklist title" : "Note title"}
        className={inputClass}
        onChange={(event) => setTitle(event.target.value)}
        placeholder={noteType === "checklist" ? "Title of your checklist" : "Title of your note"}
        type="text"
        value={title}
      />

      {noteType === "checklist" && (
        <textarea
          aria-label="Checklist description"
          className={inputClass}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Description (optional)"
          rows={2}
          value={description}
        />
      )}

      {noteType === "text" && (
        <textarea
          aria-label="Text of the note"
          className={inputClass}
          onChange={(event) => setBody(event.target.value)}
          placeholder="Write your note"
          rows={1}
          value={body}
        />
      )}

      <button
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-800 px-6 py-3 font-bold text-white shadow-sm transition hover:bg-emerald-900 active:scale-[0.98]"
        type="submit"
      >
        <img
          alt=""
          aria-hidden="true"
          className="size-4 object-contain"
          src={PlusIcon}
        />
        Add
      </button>
      {errorMessage && (
        <p
          className="flex items-start text-sm font-semibold text-rose-700 sm:col-span-2"
          role="alert"
        >
          {errorMessage}
        </p>
      )}
    </form>
  );
}

export default AddNoteForm;
