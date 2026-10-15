import { useState } from "react";
import EditIcon from "../images/Edit.png";
import TrashIcon from "../images/Trash.png";
import type { ChecklistItem } from "../Types/types";
import DeleteConfirmation from "./DeleteConfirmation";

interface ChecklistItemRowProps {
  item: ChecklistItem;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: (text: string) => void;
}

function ChecklistItemRow({
  item,
  onToggle,
  onDelete,
  onEdit,
}: ChecklistItemRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [text, setText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const startEditing = () => {
    setText(item.text);
    setErrorMessage("");
    setIsEditing(true);
  };

  const saveChanges = () => {
    const trimmedText = text.trim();
    if (!trimmedText) {
      setErrorMessage("Enter checklist item text first.");
      return;
    }

    onEdit(trimmedText);
    setIsEditing(false);
  };

  return (
    <li
      className={`flex flex-wrap items-center gap-3 py-2 ${isEditing ? "items-start" : ""}`}
    >
      <label className="flex min-h-11 min-w-11 shrink-0 cursor-pointer items-center justify-center p-3">
        <input
          aria-label={`Mark ${item.text} ${item.done ? "incomplete" : "complete"}`}
          className="size-4 accent-emerald-700"
          checked={item.done}
          onChange={onToggle}
          type="checkbox"
        />
      </label>
      {isEditing ? (
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
            <p
              className="w-full text-sm font-semibold text-rose-700"
              role="alert"
            >
              {errorMessage}
            </p>
          )}
          <div className="flex justify-end gap-2">
            <button
              className="min-h-11 min-w-11 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-200"
              onClick={() => {
                setText(item.text);
                setErrorMessage("");
                setIsEditing(false);
              }}
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
      ) : (
        <>
          <span
            className={`min-w-0 flex-1 wrap-break-word text-sm ${item.done ? "text-slate-400 line-through" : "text-slate-700"}`}
            onDoubleClick={startEditing}
          >
            {item.text}
          </span>
          <div className="ml-auto flex shrink-0 items-center gap-1">
            <button
              aria-label={`Edit ${item.text}`}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-200"
              onClick={startEditing}
              title="Edit"
              type="button"
            >
              <img alt="" className="size-4 object-contain" src={EditIcon} />
            </button>
            <button
              aria-label={`Delete ${item.text}`}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white text-rose-700 shadow-sm transition hover:border-rose-200 hover:bg-rose-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-rose-100"
              onClick={() => setIsDeleteConfirmationOpen(true)}
              title="Delete"
              type="button"
            >
              <img alt="" className="size-4 object-contain" src={TrashIcon} />
            </button>
          </div>
        </>
      )}
      {isDeleteConfirmationOpen && (
        <DeleteConfirmation
          itemLabel={item.text}
          onCancel={() => setIsDeleteConfirmationOpen(false)}
          onConfirm={onDelete}
        />
      )}
    </li>
  );
}

export default ChecklistItemRow;
