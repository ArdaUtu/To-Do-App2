import { useState } from "react";
import type { ChecklistItem } from "../Types/types";
import DeleteConfirmation from "./DeleteConfirmation";
import ChecklistItemRowEditForm from "./ChecklistItemRowEditForm";
import DeleteButton from "./buttons/DeleteButton";
import EditButton from "./buttons/EditButton";

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

  const startEditing = () => {
    setIsEditing(true);
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
        <ChecklistItemRowEditForm
          initialText={item.text}
          onCancel={() => setIsEditing(false)}
          onSave={(text) => {
            onEdit(text);
            setIsEditing(false);
          }}
        />
      ) : (
        <>
          <span
            className={`min-w-0 flex-1 wrap-break-word text-sm ${item.done ? "text-slate-400 line-through" : "text-slate-700"}`}
            onDoubleClick={startEditing}
          >
            {item.text}
          </span>
          <div className="ml-auto flex shrink-0 items-center gap-1">
            <EditButton 
              ariaLabel={`Edit ${item.text}`} 
              onClick={startEditing} 
              variant="icon" 
              />
            <DeleteButton
              ariaLabel={`Delete ${item.text}`}
              onClick={() => setIsDeleteConfirmationOpen(true)}
              variant="icon"
            />
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
