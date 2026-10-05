import type { Note } from './types';

// mooie pure functie (geen state, zelfde input = zelfde output). Zet de logica voor afvinken/toevoegen/bewerken van items ook in zulke functies
// (bijv. in src/noteUtils.ts). Dan wordt Nodefunctions korter. Goed gedaan
export function deleteNote (notes: Note[], noteId: string): Note[] {
	return notes.filter((note) => note.id !== noteId);
}