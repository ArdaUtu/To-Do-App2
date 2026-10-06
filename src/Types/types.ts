export type NoteBase = {
	id: string;
	title: string;
	createdAt: Date;
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
	description: string;
	items: ChecklistItem[];
};

export type Note = TextNote | ChecklistNote;

export type NoteType = Note['type'];

export type NoteDraft =
	| { type: 'text'; title: string; body: string }
	| { type: 'checklist'; title: string; description: string };

export type NoteUpdate = {
	title: string;
	body?: string;
	description?: string;
};
