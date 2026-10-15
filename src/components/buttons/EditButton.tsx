import EditIcon from "../icons/EditIcon";

interface EditButtonProps {
  onClick: () => void;
  variant: "icon" | "menu";
  ariaLabel?: string;
}

function EditButton({ onClick, variant, ariaLabel }: EditButtonProps) {
  if (variant === "menu") {
    return (
      <button
        className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
        onClick={onClick}
        type="button"
      >
        <EditIcon className="size-4 object-contain" />
        <span>Edit</span>
      </button>
    );
  }

  return (
    <button
      aria-label={ariaLabel}
      className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-200"
      onClick={onClick}
      title="Edit"
      type="button"
    >
      <EditIcon className="size-4 object-contain" />
    </button>
  );
}

export default EditButton;