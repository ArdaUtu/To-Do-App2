import AddNoteForm from "./components/AddNoteForm";
import NoteList from "./components/NoteList";
import { useNotes } from "./useNotes";

function App() {
  const {
    notes,
    addNote,
    deleteNote,
    updateNote,
    addChecklistItem,
    toggleChecklistItem,
    deleteChecklistItem,
    editChecklistItem,
  } = useNotes();

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-emerald-100 via-slate-50 to-lime-50 p-4 text-slate-800 sm:p-8">
      <section className="mx-auto min-h-[calc(100vh-2rem)] max-w-7xl rounded-2xl border border-white/80 bg-white/90 p-5 shadow-xl shadow-emerald-950/10 backdrop-blur sm:min-h-[calc(100vh-4rem)] sm:p-10">
        <header className="mb-8 flex flex-wrap items-baseline justify-between gap-3 sm:mb-10">
          <h1 className="text-3xl font-extrabold tracking-tight text-emerald-900 sm:text-4xl">
            To-Do-App
          </h1>
          <p aria-label={`${notes.length} notes`} className="text-sm font-semibold text-emerald-800">
            {notes.length} {notes.length === 1 ? "note" : "notes"}
          </p>
        </header>

        <div className="mx-auto max-w-6xl">
          <AddNoteForm onAdd={addNote} />
          <NoteList
            notes={notes}
            onAddItem={addChecklistItem}
            onDelete={deleteNote}
            onDeleteItem={deleteChecklistItem}
            onEditItem={editChecklistItem}
            onToggleItem={toggleChecklistItem}
            onUpdateNote={updateNote}
          />
        </div>
      </section>
    </div>
  );
}

export default App;
