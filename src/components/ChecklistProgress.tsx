import type { ChecklistItem } from "../Types/types";
import ChecklistItemRow from "./ChecklistItemRow";

interface ChecklistProgressProps {
  items: ChecklistItem[];
  onToggleItem: (itemId: string) => void;
  onDeleteItem: (itemId: string) => void;
  onEditItem: (itemId: string, text: string) => void;
}

function ChecklistProgress({ items, onToggleItem, onDeleteItem, onEditItem }: ChecklistProgressProps) {
  const completedItems = items.filter((item) => item.done).length;

  return (
    <>
      <div className="mt-4">
        <div className="mb-2 flex justify-between text-xs font-bold text-slate-600">
          <span>Progress</span>
          <span>{completedItems} / {items.length} Done</span>
        </div>
        <div
          aria-label={`${completedItems} of ${items.length} checklist items complete`}
          aria-valuemax={items.length}
          aria-valuemin={0}
          aria-valuenow={completedItems}
          className="h-2 w-full rounded-full bg-slate-100"
          role="progressbar"
        >
          <div
            className="h-2 rounded-full bg-lime-400 transition-all"
            style={{ width: items.length ? `${(completedItems / items.length) * 100}%` : "0%" }}
          />
        </div>
      </div>
      <ul className="mt-3 divide-y divide-slate-100">
        {items.map((item) => (
          <ChecklistItemRow
            item={item}
            key={item.id}
            onDelete={() => onDeleteItem(item.id)}
            onEdit={(text) => onEditItem(item.id, text)}
            onToggle={() => onToggleItem(item.id)}
          />
        ))}
      </ul>
      {items.length === 0 && (
        <p className="mt-3 rounded-lg bg-slate-50 px-3 py-4 text-sm text-slate-500">
          No checklist items yet.
        </p>
      )}
    </>
  );
}

export default ChecklistProgress;
