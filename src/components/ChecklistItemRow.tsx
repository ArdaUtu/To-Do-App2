import type { ChecklistItemRowProps } from '../types';

function ChecklistItemRow({ item, onToggle }: ChecklistItemRowProps) {
  return (
    <li className="flex items-center gap-2">
      <input checked={item.done} onChange={onToggle} type="checkbox" />
      <span className={item.done ? 'text-slate-400 line-through' : ''}>{item.text}</span>
    </li>
  );
}

export default ChecklistItemRow;