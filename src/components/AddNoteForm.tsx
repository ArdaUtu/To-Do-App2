import type { AddNoteFormProps, NoteType } from '../types';
import React from 'react';

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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
  if (event.key === 'Enter') {
    event.preventDefault();
  }
};

  return (
    <form
      className="mb-6 flex flex-col gap-3 "
      onSubmit={(event) => {
        event.preventDefault();
        onAdd();
      }}
    >
      {noteType === 'text' && (
        <input
          aria-label="Note title"
          className="w-full rounded border border-slate-400 bg-white px-3 py-5"
          onChange={(event) => onTitleChange(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Title of your note"
          type="text"
          value={title}
        />
      )}

      {noteType === 'checklist' && (
        <textarea
          aria-label="Description of checklist"
          className="w-full rounded border border-slate-400 bg-white px-3 py-5"
          onChange={(event) => onDescriptionChange(event.target.value)}
          placeholder="Description of your checklist"
          rows={3}
          value={description}
        />
      )}

      {noteType === 'text' && (
        <textarea
          aria-label="Text of the note"
          className="w-full rounded border border-slate-400 bg-white px-3 py-5"
          onChange={(event) => onBodyChange(event.target.value)}
          placeholder="Write your note"
          rows={1}
          value={body}
        />
      )}

      <select
        aria-label="Note type"
        className="rounded border border-slate-400 bg-white px-3 py-3"
        onChange={(event) => onNoteTypeChange(event.target.value as NoteType)}
        value={noteType}
      >
        <option value="text">Text note</option>
        <option value="checklist">Checklist</option>
      </select>
      <button
        className="rounded bg-blue-400 px-4 py-3 font-semibold text-white hover:bg-blue-700 transform transition-all duration-200 ease-in-out hover:scale-105 active:scale-95"
        type="submit"
      >
        Add
      </button>
      {errorMessage && (
        <p className="text-sm font-semibold text-red-700 flex items-start" role="alert">{errorMessage}</p>
      )}
    </form>
  );
}

export default AddNoteForm;
