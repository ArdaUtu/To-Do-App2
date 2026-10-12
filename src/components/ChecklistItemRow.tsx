import { useState } from "react";
import DotsIcon from "../images/Dots.png";
import EditIcon from "../images/Edit.png";
import TrashIcon from "../images/Trash.png";
import type { ChecklistItem } from "../Types/types";

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [text, setText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const menuDotsIcon = (
    <img
      alt="Options"
      className="size-4 object-contain opacity-80"
      src={DotsIcon}
    />
  );

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
          <div className="relative ml-auto">
            <button
              aria-label={`More actions for ${item.text}`}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-200"
              onClick={() => setIsMenuOpen((open) => !open)}
              type="button"
            >
              {menuDotsIcon}
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 z-20 mt-2 w-32 rounded-xl border border-slate-200 bg-white p-1 shadow-lg">
                <button
                  className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                  onClick={() => {
                    startEditing();
                    setIsMenuOpen(false);
                  }}
                  type="button"
                >
                  <img alt="Edit" className="size-4 object-contain" src={EditIcon} />
                  <span>Edit</span>
                </button>
                <button
                  className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm font-semibold text-rose-700 transition hover:bg-rose-50"
                  onClick={() => {
                    onDelete();
                    setIsMenuOpen(false);
                  }}
                  type="button"
                >
                  <img alt="Delete" className="size-4 object-contain" src={TrashIcon} />
                  <span>Delete</span>
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </li>
  );
}

export default ChecklistItemRow;
