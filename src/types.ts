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
