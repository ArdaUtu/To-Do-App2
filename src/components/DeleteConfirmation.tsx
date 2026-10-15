import { useEffect } from "react";

interface DeleteConfirmationProps {
  itemLabel: string;
  onCancel: () => void;
  onConfirm: () => void;
}

function DeleteConfirmation({
  itemLabel,
  onCancel,
  onConfirm,
}: DeleteConfirmationProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCancel();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onCancel]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4"
      onClick={(event) => {
        if (event.target === event.currentTarget) onCancel();
      }}
    >
      <section
        aria-labelledby="delete-confirmation-title"
        aria-modal="true"
        className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-2xl"
        role="dialog"
      >
        <h2
          className="text-lg font-bold text-slate-900"
          id="delete-confirmation-title"
        >
          Are you sure you want to delete this?
        </h2>
        <p className="mt-2 wrap-break-word text-sm leading-6 text-slate-600">
          “{itemLabel}” will be permanently deleted. This action cannot be undone.
        </p>
        <div className="mt-6 flex justify-end gap-2">
          <button
            autoFocus
            className="min-h-11 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-200"
            onClick={onCancel}
            type="button"
          >
            Cancel
          </button>
          <button
            className="min-h-11 rounded-lg bg-rose-700 px-4 py-2 text-sm font-bold text-white transition hover:bg-rose-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-rose-200"
            onClick={onConfirm}
            type="button"
          >
            Delete
          </button>
        </div>
      </section>
    </div>
  );
}

export default DeleteConfirmation;