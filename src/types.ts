import type { ChangeEvent, Dispatch, SetStateAction } from 'react';

export type NoteBase = {
	id: string;
	title: string;
	createdAt: number;
};

export type TextNote = NoteBase & {
	type: "text";
	body: string;
};

export type ChecklistItem = {
	id: string;
	text: string;
	done: boolean;
};

export type ChecklistNote = NoteBase & {
	type: "checklist";
	items: ChecklistItem[];
};

export type Note = TextNote | ChecklistNote;

export type NoteType = Note['type'];

export type AddNoteFormProps = {
	title: string;
	body: string;
	noteType: NoteType;
	errorMessage: string;
	onTitleChange: (title: string) => void;
	onBodyChange: (body: string) => void;
	onNoteTypeChange: (noteType: NoteType) => void;
	onAdd: () => void;
};

export type NoteListProps = {
	notes: Note[];
	onDelete: (noteId: string) => void;
	onToggleItem: (noteId: string, itemId: string) => void;
};

export type NoteCardProps = {
	note: Note;
	onDelete: (noteId: string) => void;
	onToggleItem: (noteId: string, itemId: string) => void;
};

export type TextNoteCardProps = {
	note: TextNote;
	onDelete: (noteId: string) => void;
};

export type ChecklistNoteCardProps = {
	note: ChecklistNote;
	onDelete: (noteId: string) => void;
	onToggleItem: (noteId: string, itemId: string) => void;
};

export type ChecklistItemRowProps = {
	item: ChecklistItem;
	onToggle: () => void;
};

export type Task = string;
export type Tasks = Task[];
export type InputChangeEvent = ChangeEvent<HTMLInputElement>;
export type AddTaskHandler = () => void;
export type RemoveTaskHandler = (index: number) => void;

export interface InputfieldProps {
	waarde: string;
	setWaarde: Dispatch<SetStateAction<string>>;
	onEnter: AddTaskHandler;
}

export interface Listprops {
	taken: Tasks;
	onVerwijderTaak: RemoveTaskHandler;
}

export interface VoegTaakToeProps {
	onToevoegen: AddTaskHandler;
}