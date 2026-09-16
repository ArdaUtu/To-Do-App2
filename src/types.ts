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