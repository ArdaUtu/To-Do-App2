import { useState } from "react";
import TrashIcon from "../images/Trash.png";
import type { TextNoteCardProps } from "../types";

function TextNoteCard({ note, onDelete, onUpdate }: TextNoteCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const dateString = new Date(note.createdAt).toLocaleString("nl-NL");

  const startEditing = () => {
    // note.title en note.body zijn altijd strings (zie types.ts), dus ?? '' doet niets. Vertrouw op je types. Zo'n check is alleen nodig als je met externe data werkt (API, localStorage, etc.).
    setTitle(note.title ?? "");
    setBody(note.body ?? "");
    setIsEditing(true);
  };

  // geen controle, dus je kunt een lege titel opslaan. Trim en blokkeer lege titels met een melding, voeg ht ook in AddNoteForm.
  // (Ook: bij toevoegen is tekst verplicht, maar bij bewerken kun je hem leegmaken. Kies een regel.)
  const saveChanges = () => {
    onUpdate(note.id, { title, body });
    setIsEditing(false);
  };

  // Fix op een telefoon van 360px staan Change + Delete naast de tekst en drukken die samen tot ~50px breed. Zet de knoppen in een rij bovenaan (zoals ChecklistNoteCard) of stapel ze op mobiel. (or better yet wat ik zei gebruik alleen een <form> en laat Enter opslaan en use icons voor delete en edit, dan is het allemaal veel compacter en mobielvriendelijker)
  // FIX tekst- en checklistkaarten hebben dezelfde kleuren (border-l-lime-400). Fase 3 wil dat ze er per type anders uitzien, bijv. border-l-sky-400 hier.
  return (
    <article className="flex items-start gap-4 rounded-xl border border-emerald-100 border-l-4 border-l-lime-400 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="min-w-0 flex-1">
        <p className="mb-2 text-xs font-bold uppercase tracking-widest text-emerald-700">
          Text note
        </p>
        {/* zet de bewerkvelden in een <form onSubmit> zoals bij ChecklistNoteCard, dan slaat Enter op en werken beide kaarten hetzelfde. */}
        {isEditing ? (
          <div className="flex flex-col gap-3">
            <input
              aria-label="Titel notitie"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              onChange={(event) => setTitle(event.target.value)}
              type="text"
              value={title}
            />

            <textarea
              aria-label="Tekst notitie"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              onChange={(event) => setBody(event.target.value)}
              rows={3}
              value={body}
            />
            <div className="mt-1 flex flex-row items-center gap-2">
              <button
                className="rounded-lg bg-emerald-800 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-900 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
                onClick={saveChanges}
                type="button"
              >
                Save
              </button>
              <button
                className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-200"
                onClick={() => setIsEditing(false)}
                type="button"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* hier wrap-anywhere, in de checklist wrap-break-word. Zoek het verschil op (en truncate) en kies bewust een. */}
            <p className="wrap-anywhere text-lg font-bold text-slate-900">
              {note.title}
            </p>
            <p className="whitespace-pre-wrap wrap-anywhere text-sm leading-6 text-slate-600">
              {note.body}
            </p>
          </>
        )}
        <p className="mt-4 text-xs text-slate-400">{dateString}</p>
      </div>
      {/* deze knoppen zijn ~32-38px hoog. Fase 6 vraagt minimaal 44x44px: voeg min-h-11 min-w-11 toe. */}
      {!isEditing && (
        <button
          className="rounded-lg border border-emerald-200 bg-white px-3 py-2 text-sm font-semibold text-emerald-800 transition hover:border-emerald-300 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-100"
          onClick={startEditing}
          type="button"
        >
          Change
        </button>
      )}
      <button
        aria-label={`Verwijder ${note.title}`}
        className="ml-auto rounded-lg bg-rose-50 px-3 py-2 text-xs font-bold text-rose-700 transition hover:bg-rose-100 active:scale-95"
        onClick={() => onDelete(note.id)}
        type="button"
      >
        <img
          alt=""
          aria-hidden="true"
          className="mr-1 inline-block size-4 object-contain align-middle"
          src={TrashIcon}
        />
        Delete
      </button>
    </article>
  );
}

export default TextNoteCard;
