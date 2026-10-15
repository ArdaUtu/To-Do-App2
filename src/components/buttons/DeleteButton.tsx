import TrashIcon from "../icons/TrashIcon";

interface DeleteButtonProps {
  onClick: () => void;
  variant: "icon" | "menu";
  ariaLabel?: string;
}

function DeleteButton({ onClick, variant, ariaLabel }: DeleteButtonProps) {
  if (variant === "menu") {
    return (
      <button
        className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm font-semibold text-rose-700 transition hover:bg-rose-50"
        onClick={onClick}
        type="button"
      >
        <TrashIcon className="size-4 object-contain" />
        <span>Delete</span>
      </button>
    );
  }

  return (
    <button
      aria-label={ariaLabel}
      className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white text-rose-700 shadow-sm transition hover:border-rose-200 hover:bg-rose-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-rose-100"
      onClick={onClick}
      title="Delete"
      type="button"
    >
      <TrashIcon className="size-4 object-contain" />
    </button>
  );
}

export default DeleteButton;