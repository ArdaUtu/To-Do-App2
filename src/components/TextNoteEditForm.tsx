interface TextNoteFormActionsProps {
  onCancel: () => void;
}

function TextNoteFormActions({ onCancel }: TextNoteFormActionsProps) {
  return (
    <div className="mt-1 flex flex-row items-center gap-2">
      <button
        className="min-h-11 min-w-11 rounded-lg bg-emerald-800 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-900 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
        type="submit"
      >
        Save
      </button>
      <button
        className="min-h-11 min-w-11 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-200"
        onClick={onCancel}
        type="button"
      >
        Cancel
      </button>
    </div>
  );
}

export default TextNoteFormActions;