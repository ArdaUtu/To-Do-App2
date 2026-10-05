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
	// extra veld ten opzichte van de opdracht. Prima, maar zorg dat je kunt uitleggen waarom je het hebt toegevoegd.
	description: string;
	items: ChecklistItem[];
};

export type Note = TextNote | ChecklistNote;

// goed gedaan! Omdat je dit afleidt van Note, past het zich vanzelf aan als je een nieuw notitietype toevoegt.
export type NoteType = Note['type'];

// De spelregels zeggen "props getypt met een interface". Zet elk Props-type in het bestand van het eigen component en schrijf het als interface.
export type AddNoteFormProps = {
	title: string;
	body: string;
	description: string;
	noteType: NoteType;
	errorMessage: string;
	onTitleChange: (title: string) => void;
	onBodyChange: (body: string) => void;
	onDescriptionChange: (description: string) => void;
	onNoteTypeChange: (noteType: NoteType) => void;
	onAdd: () => void;
};

export type NoteListProps = {
	notes: Note[];
	onDelete: (noteId: string) => void;
	// deze updates vorm staat er 3x (ook in Nodefunctions). Geef het één keer een naam, bijv. type NoteUpdates = {...}. We zijn lui en willen niet 3x hetzelfde typen. Dan is het ook makkelijker om de vorm van updates aan te passen ;P
	onUpdateNote: (noteId: string, updates: { title: string; body?: string; description?: string }) => void;
	onAddItem: (noteId: string, text: string) => void;
	onToggleItem: (noteId: string, itemId: string) => void;
	onDeleteItem: (noteId: string, itemId: string) => void;
	onEditItem: (noteId: string, itemId: string, text: string) => void;
};

export type NoteCardProps = {
	note: Note;
	onDelete: (noteId: string) => void;
	onUpdateNote: (noteId: string, updates: { title: string; body?: string; description?: string }) => void;
	onAddItem: (noteId: string, text: string) => void;
	onToggleItem: (noteId: string, itemId: string) => void;
	onDeleteItem: (noteId: string, itemId: string) => void;
	onEditItem: (noteId: string, itemId: string, text: string) => void;
};

export type TextNoteCardProps = {
	note: TextNote;
	onDelete: (noteId: string) => void;
	onUpdate: (noteId: string, updates: { title: string; body: string }) => void;
};

export type ChecklistNoteCardProps = {
	note: ChecklistNote;
	onDelete: (noteId: string) => void;
	onUpdate: (noteId: string, updates: { title: string; description: string }) => void;
	onAddItem: (noteId: string, text: string) => void;
	onToggleItem: (noteId: string, itemId: string) => void;
	onDeleteItem: (noteId: string, itemId: string) => void;
	onEditItem: (noteId: string, itemId: string, text: string) => void;
};

export type ChecklistItemRowProps = {
	item: ChecklistItem;
	onToggle: () => void;
	onDelete: () => void;
	onEdit: (text: string) => void;
};
