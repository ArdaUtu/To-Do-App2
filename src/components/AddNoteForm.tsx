import React from "react";
import PlusIcon from "../images/Plus.png";
import type { AddNoteFormProps, NoteType } from "../types";

function AddNoteForm({
  title,
  body,
  description,
  noteType,
  errorMessage,
  onTitleChange,
  onBodyChange,
  onDescriptionChange,
  onNoteTypeChange,
  onAdd,
}: AddNoteFormProps) {
  // dit voorkomt dat Enter de notitie toevoegt. Gebruikers verwachten meestal dat Enter verstuurt. Is dit bewust? Zorg dat je kunt uitleggen waarom.
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  return (
    <form
      className="mb-8 grid grid-cols-1 gap-3 rounded-2xl border border-emerald-100 bg-slate-50 p-4 shadow-sm sm:grid-cols-[minmax(0,1fr)_auto] sm:p-5"
      onSubmit={(event) => {
        event.preventDefault();
        onAdd();
      }}
    >
      {/* deze lange input-class staat er 4x. Zet hem in een const inputClass bovenaan, dan is een stijlwijziging ook een aanpassing in plaats van 4 keer hetzelfde te typen. */}
      {noteType === "text" && (
        <input
          aria-label="Note title"
          className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 sm:col-span-2"
          onChange={(event) => onTitleChange(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Title of your note"
          type="text"
          value={title}
        />
      )}

      {/* FIX: een titel is een regel, dus gebruik een <input> zoals bij de tekstnotitie. Dan kun je een titelveld voor beide types tonen. */}
      {noteType === "checklist" && (
        <textarea
          aria-label="Title checklist"
          className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 sm:col-span-2"
          onChange={(event) => onTitleChange(event.target.value)}
          placeholder="Title of your checklist"
          rows={3}
          value={title}
        />
      )}

      {noteType === "checklist" && (
        <textarea
          aria-label="Checklist description"
          className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 sm:col-span-2"
          onChange={(event) => onDescriptionChange(event.target.value)}
          placeholder="Description (optional)"
          rows={2}
          value={description}
        />
      )}

      {noteType === "text" && (
        <textarea
          aria-label="Text of the note"
          className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 sm:col-span-2"
          onChange={(event) => onBodyChange(event.target.value)}
          placeholder="Write your note"
          rows={1}
          value={body}
        />
      )}

      {/* zet deze select bovenaan: "kies type, vul titel in" is de logische volgorde. Denk aan eindgebruikeer en de verwachtingen die hierbij horen. */}
      {/* "as NoteType" zet de typecontrole uit. Veiliger: value === 'checklist' ? 'checklist' : 'text'. */}
      <select
        aria-label="Note type"
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 font-medium text-slate-700 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
        onChange={(event) => onNoteTypeChange(event.target.value as NoteType)}
        value={noteType}
      >
        <option value="text">Text note</option>
        <option value="checklist">Checklist</option>
      </select>
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
