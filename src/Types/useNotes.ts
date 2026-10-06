import { useState } from "react";
import {
  addChecklistItem as addItem,
  createNote,
  deleteChecklistItem as removeItem,
  deleteNote as removeNote,
  editChecklistItem as updateItem,
  toggleChecklistItem as toggleItem,
  updateNote as updateNoteInList,
} from "./noteUtils";
import type { Note, NoteDraft, NoteUpdate } from "./types";

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);

  const addNote = (draft: NoteDraft) => setNotes((current) => createNote(current, draft));
  const deleteNote = (noteId: string) => setNotes((current) => removeNote(current, noteId));
  const updateNote = (noteId: string, updates: NoteUpdate) =>
    setNotes((current) => updateNoteInList(current, noteId, updates));
  const addChecklistItem = (noteId: string, text: string) =>
    setNotes((current) => addItem(current, noteId, text));
  const toggleChecklistItem = (noteId: string, itemId: string) =>
    setNotes((current) => toggleItem(current, noteId, itemId));
  const deleteChecklistItem = (noteId: string, itemId: string) =>
    setNotes((current) => removeItem(current, noteId, itemId));
  const editChecklistItem = (noteId: string, itemId: string, text: string) =>
    setNotes((current) => updateItem(current, noteId, itemId, text));

  return {
    notes,
    addNote,
    deleteNote,
    updateNote,
    addChecklistItem,
    toggleChecklistItem,
    deleteChecklistItem,
    editChecklistItem,
  };
}
