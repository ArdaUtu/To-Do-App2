import type { DotsButtonProps } from "../../Types/types";
import DotsIcon from "../icons/DotsIcon";

function DotsButton({ noteTitle, color, isExpanded, onClick }: DotsButtonProps) {
  const colorClasses = {
    sky: "border-sky-200 text-sky-800 hover:border-sky-300 hover:bg-sky-50 focus-visible:ring-sky-100",
    emerald:
      "border-emerald-200 text-emerald-800 hover:border-emerald-300 hover:bg-emerald-50 focus-visible:ring-emerald-100",
  };

  return (
    <button
      aria-label={`More actions for ${noteTitle}`}
      aria-expanded={isExpanded}
      aria-haspopup="menu"
      className={`flex h-8 w-8 items-center justify-center rounded-md border bg-white shadow-sm transition focus-visible:outline-none focus-visible:ring-4 ${colorClasses[color]}`}
      onClick={onClick}
      type="button"
    >
      <DotsIcon className="size-4 object-contain opacity-80" />
    </button>
  );
}

export default DotsButton;