import type { AddNoteFormProps, NoteType } from '../types';

function AddNoteForm({
  title,
  body,
  noteType,
  errorMessage,
  onTitleChange,
  onBodyChange,
  onNoteTypeChange,
  onAdd,
}: AddNoteFormProps) {
  return (
    <form
      className="mb-6 flex flex-col gap-3 sm:flex-row"
      onSubmit={(event) => {
        event.preventDefault();
        onAdd();
      }}
    >
      <input
        aria-label="Note title"
        className="w-full rounded border  border-slate-400 bg-white px-3 py-5"
        onChange={(event) => onTitleChange(event.target.value)}
        placeholder={noteType === 'checklist' ? 'Description of your checklist' : 'Title of your note'}
        type="text"
        value={title}
      />
      {noteType === 'text' && (
        <textarea
          aria-label="Text of the note"
          className="w-full rounded border  border-slate-400 bg-white px-3 py-5"
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
      {errorMessage && (
        <p className="text-sm font-semibold text-red-700" role="alert">{errorMessage}</p>
      )}
      <button
        className="rounded bg-blue-400 px-4 py-3 font-semibold text-white hover:bg-blue-700"
        type="submit"
      >
        Add
      </button>
    </form>
  );
}

export default AddNoteForm;
