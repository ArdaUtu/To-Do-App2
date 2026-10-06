import type { Note, NoteDraft, NoteUpdate } from "./types";

export function createNote(notes: Note[], draft: NoteDraft): Note[] {
  const baseNote = {
    id: crypto.randomUUID(),
    title: draft.title,
    createdAt: new Date(),
  };

  const note: Note =
    draft.type === "checklist"
      ? { ...baseNote, type: "checklist", description: draft.description, items: [] }
      : { ...baseNote, type: "text", body: draft.body };

  return [...notes, note];
}

export function deleteNote(notes: Note[], noteId: string): Note[] {
  return notes.filter((note) => note.id !== noteId);
}

export function updateNote(notes: Note[], noteId: string, updates: NoteUpdate): Note[] {
  return notes.map((note) => {
    if (note.id !== noteId) return note;
    if (note.type === "text") {
      return { ...note, title: updates.title, body: updates.body ?? note.body };
    }
    return {
      ...note,
      title: updates.title,
      description: updates.description ?? note.description,
    };
  });
}

export function addChecklistItem(notes: Note[], noteId: string, text: string): Note[] {
  const trimmedText = text.trim();
  if (!trimmedText) return notes;

  return notes.map((note) =>
    note.id === noteId && note.type === "checklist"
      ? {
          ...note,
          items: [...note.items, { id: crypto.randomUUID(), text: trimmedText, done: false }],
        }
      : note,
  );
}

export function toggleChecklistItem(notes: Note[], noteId: string, itemId: string): Note[] {
  return notes.map((note) =>
    note.id === noteId && note.type === "checklist"
      ? {
          ...note,
          items: note.items.map((item) =>
            item.id === itemId ? { ...item, done: !item.done } : item,
          ),
        }
      : note,
  );
}

export function deleteChecklistItem(notes: Note[], noteId: string, itemId: string): Note[] {
  return notes.map((note) =>
    note.id === noteId && note.type === "checklist"
      ? { ...note, items: note.items.filter((item) => item.id !== itemId) }
      : note,
  );
}

export function editChecklistItem(
  notes: Note[],
  noteId: string,
  itemId: string,
  text: string,
): Note[] {
  const trimmedText = text.trim();
  if (!trimmedText) return notes;

  return notes.map((note) =>
    note.id === noteId && note.type === "checklist"
      ? {
          ...note,
          items: note.items.map((item) =>
            item.id === itemId ? { ...item, text: trimmedText } : item,
          ),
        }
      : note,
  );
}
