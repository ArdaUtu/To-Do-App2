import { useRef, useState } from "react";
import type { ActionMenuProps } from "../Types/types";
import { useEscapeKey } from "../hooks/useClickOutside";
import useClickOutside from "../hooks/useClickOutside";
import DeleteButton from "./buttons/DeleteButton";
import DotsButton from "./buttons/DotsButton";
import EditButton from "./buttons/EditButton";

function ActionMenu({ label, color, onEdit, onDelete }: ActionMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useClickOutside(menuRef, () => setIsMenuOpen(false), isMenuOpen);
  useEscapeKey(() => setIsMenuOpen(false), isMenuOpen);

  const runMenuAction = (action: () => void) => {
    setIsMenuOpen(false);
    action();
  };

  return (
    <div className="relative shrink-0" ref={menuRef}>
      <DotsButton
        isExpanded={isMenuOpen}
        noteTitle={label}
        onClick={() => setIsMenuOpen((open) => !open)}
        color={color}
      />
      {isMenuOpen && (
        <div
          aria-label={`${label} actions`}
          className="absolute right-0 z-20 mt-2 w-32 rounded-xl border border-slate-200 bg-white p-1 shadow-lg"
          role="menu"
        >
          <EditButton
            onClick={() => runMenuAction(onEdit)}
            variant="menu"
          />
          <DeleteButton
            onClick={() => runMenuAction(onDelete)}
            variant="menu"
          />
        </div>
      )}
    </div>
  );
}

export default ActionMenu;