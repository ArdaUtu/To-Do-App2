import { useState } from "react";
import { deleteNote as removeNote } from "../deleteNote";
import type { Note, NoteType } from "../types";
import AddNoteForm from "./AddNoteForm";
import NoteList from "./NoteList";

// Fix : "Node" moet "Note" zijn. Dit is eigenlijk je App, en met ~157 regels zit je boven de grens van ~100. Zie de comment in App.tsx.
const NodeFunctions = () => {
  // volgende stap: bonus 1 (localStorage). Tip: useState(() => ...) om te laden, useEffect om op te slaan. Wat geeft localStorage.getItem terug de eerste keer?
  const [notes, setNotes] = useState<Note[]>([]);
  // deze 5 states worden alleen door het formulier gebruikt. Ze kunnen ook in AddNoteForm staan, dat dan onAdd(note) aanroept.
  // App houdt dan alleen notes[] en het formulier heeft 1 prop nodig in plaats van 10.
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [description, setDescription] = useState("");
  const [noteType, setNoteType] = useState<NoteType>("text");
  const [errorMessage, setErrorMessage] = useState("");

  const addNote = () => {
    const trimmedTitle = title.trim();
    const trimmedBody = body.trim();
    const trimmedDescription = description.trim();

    if (noteType === "text" && !trimmedTitle) {
      setErrorMessage("Enter a title first.");
      return;
    }

    if (noteType === "text" && !trimmedBody) {
      setErrorMessage("Enter your note first.");
      return;
    }

    if (noteType === "checklist" && !trimmedTitle) {
      setErrorMessage("Enter a checklist title first.");
      return;
    }

    const finalTitle = trimmedTitle;

    const baseNote = {
      id: crypto.randomUUID(),
      title: finalTitle,
      createdAt: new Date(),
    };

    const newNote: Note =
      noteType === "checklist"
        ? {
            ...baseNote,
            type: "checklist",
            description: trimmedDescription,
            items: [],
          }
        : { ...baseNote, type: "text", body: trimmedBody };

    setNotes((currentNotes) => [...currentNotes, newNote]);
    setTitle("");
    setBody("");
    setDescription("");
    setErrorMessage("");
  };

  const deleteNote = (noteId: string) => {
    setNotes((currentNotes) => removeNote(currentNotes, noteId));
  };

  const updateNote = (
    noteId: string,
    updates: { title: string; body?: string; description?: string },
  ) => {
    setNotes((currentNotes) =>
      currentNotes.map((note) => {
        if (note.id !== noteId) return note;

        if (note.type === "text") {
          // FIX als updates.body ontbreekt, wordt de tekst gewist. Gebruik updates.body ?? note.body, net als bij description hieronder. Het zou best dat dit niet mogelijk is in de UI, maar dan is het nog steeds een bug in de code.
          return { ...note, title: updates.title, body: updates.body ?? "" };
        }

        return {
          ...note,
          title: updates.title,
          description: updates.description ?? note.description,
        };
      }),
    );
  };

  const addChecklistItem = (noteId: string, text: string) => {
    const trimmedText = text.trim();
    if (!trimmedText) return;

    setNotes((currentNotes) =>
      currentNotes.map((note) => {
        if (note.id !== noteId || note.type !== "checklist") return note;

        return {
          ...note,
          items: [
            ...note.items,
            { id: crypto.randomUUID(), text: trimmedText, done: false },
          ],
        };
      }),
    );
  };

  // goed gedaan: nieuwe notes-array -> nieuwe items-array -> nieuw item-object. Geen mutatie, precies wat Fase 4 vraagt.
  const toggleChecklistItem = (noteId: string, itemId: string) => {
    setNotes((currentNotes) =>
      currentNotes.map((note) => {
        if (note.id !== noteId || note.type !== "checklist") return note;

        return {
          ...note,
          items: note.items.map((item) =>
            item.id === itemId ? { ...item, done: !item.done } : item,
          ),
        };
      }),
    );
  };

  const deleteChecklistItem = (noteId: string, itemId: string) => {
    setNotes((currentNotes) =>
      currentNotes.map((note) => {
        if (note.id !== noteId || note.type !== "checklist") return note;

        return {
          ...note,
          items: note.items.filter((item) => item.id !== itemId),
        };
      }),
    );
  };

  // text wordt niet getrimd of gecontroleerd, dus een item kan "" worden. Trim het en negeer lege tekst.
  const editChecklistItem = (noteId: string, itemId: string, text: string) => {
    setNotes((currentNotes) =>
      currentNotes.map((note) => {
        if (note.id !== noteId || note.type !== "checklist") return note;

        return {
          ...note,
          items: note.items.map((item) =>
            item.id === itemId ? { ...item, text } : item,
          ),
        };
      }),
    );
  };

  // RFIX from-/via-/to- doen in hun eentje niets. Voeg bg-linear-to-br toe aan de div hieronder om de gradient echt te zien.
  return (
    <div className="min-h-screen w-full from-emerald-100 via-slate-50 to-lime-50 p-4 text-slate-800 sm:p-8">
      <section className="mx-auto min-h-[calc(100vh-2rem)] max-w-5xl rounded-2xl border border-white/80 bg-white/90 p-5 shadow-xl shadow-emerald-950/10 backdrop-blur sm:min-h-[calc(100vh-4rem)] sm:p-10">
        {/* Fix Fase 6 vraagt een header met de naam van de app EN het aantal notities, bijv. "Notities (3)". Kan een eigen Header-component worden. */}
        <h1 className="mb-8 text-center text-4xl font-extrabold tracking-tight text-emerald-900 sm:mb-10 sm:text-5xl">
          To-Do-App
        </h1>

        <div className="mx-auto max-w-4xl">
          <AddNoteForm
            body={body}
            description={description}
            errorMessage={errorMessage}
            noteType={noteType}
            onAdd={addNote}
            onBodyChange={setBody}
            onDescriptionChange={setDescription}
            onNoteTypeChange={setNoteType}
            onTitleChange={setTitle}
            title={title}
          />
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
};

export default NodeFunctions;
