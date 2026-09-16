import type { Note } from './types';

export function deleteNote(notes: Note[], noteId: string): Note[] {
	return notes.filter((note) => note.id !== noteId);
}