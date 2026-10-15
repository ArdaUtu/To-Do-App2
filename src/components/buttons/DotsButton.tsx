import DotsIcon from "../icons/DotsIcon";

interface DotsButtonProps {
  noteTitle: string;
  variant: "checklist" | "text";
  isExpanded: boolean;
  onClick: () => void;
}

function DotsButton({ noteTitle, variant, isExpanded, onClick }: DotsButtonProps) {
  const buttonColors =
    variant === "checklist"
      ? "border-emerald-200 text-emerald-800 hover:border-emerald-300 hover:bg-emerald-50 focus-visible:ring-emerald-100"
      : "border-sky-200 text-sky-800 hover:border-sky-300 hover:bg-sky-50 focus-visible:ring-sky-100";

  return (
    <button
      aria-label={`More actions for ${noteTitle}`}
      aria-expanded={isExpanded}
      className={`flex h-8 w-8 items-center justify-center rounded-md border bg-white shadow-sm transition focus-visible:outline-none focus-visible:ring-4 ${buttonColors}`}
      onClick={onClick}
      type="button"
    >
      <DotsIcon className="size-4 object-contain opacity-80" />
    </button>
  );
}

export default DotsButton;