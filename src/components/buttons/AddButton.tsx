import type { AddButtonProps } from "../../Types/types";
import PlusIcon from "../icons/PlusIcon";

function AddButton({ variant }: AddButtonProps) {
  const className =
    variant === "note"
      ? "inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-800 px-6 py-3 font-bold text-white shadow-sm transition hover:bg-emerald-900 active:scale-[0.98]"
      : "inline-flex min-h-5 items-center justify-center gap-2 rounded-lg bg-emerald-800 px-4 py-2 text-sm font-bold text-white transition hover:bg-emerald-900";

  return (
    <button className={className} type="submit">
      <PlusIcon className="size-8 object-contain" />
      Add
    </button>
  );
}

export default AddButton;