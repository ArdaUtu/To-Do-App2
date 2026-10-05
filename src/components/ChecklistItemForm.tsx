import { useState } from "react";
import PlusIcon from "../images/Plus.png";

interface ChecklistItemFormProps {
  noteTitle: string;
  onAdd: (text: string) => void;
}

function ChecklistItemForm({ noteTitle, onAdd }: ChecklistItemFormProps) {
  const [text, setText] = useState("");

  const submit = () => {
    const trimmedText = text.trim();
    if (!trimmedText) return;
    onAdd(trimmedText);
    setText("");
  };

  return (
    <form
      className="mt-4 flex gap-2 rounded-xl bg-slate-50 p-2"
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
    >
      <input
        aria-label={`Add item to ${noteTitle}`}
        className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
        onChange={(event) => setText(event.target.value)}
        placeholder="New checklist item"
        type="text"
        value={text}
      />
      <button
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-emerald-800 px-4 py-2 text-sm font-bold text-white transition hover:bg-emerald-900"
        type="submit"
      >
        <img alt="" aria-hidden="true" className="size-4 object-contain" src={PlusIcon} />
        Add
      </button>
    </form>
  );
}

export default ChecklistItemForm;
