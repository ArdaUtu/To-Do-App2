import { useState } from 'react';
import AddNoteForm from './AddNoteForm';
import NoteList from './NoteList';
import { deleteNote as removeNote } from '../deleteNote';
import type { Note, NoteType } from '../types';


const nodeFunctions = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [description, setDescription] = useState('');
  const [noteType, setNoteType] = useState<NoteType>('text');
  const [errorMessage, setErrorMessage] = useState('');

  const addNote = () => {
    const trimmedTitle = title.trim();
    const trimmedBody = body.trim();
    const trimmedDescription = description.trim();

    if (noteType === 'text' && !trimmedTitle) {
      setErrorMessage('Enter a title first.');
      return;
    }

    if (noteType === 'text' && !trimmedBody) {
      setErrorMessage('Enter your note first.');
      return;
    }

    if (noteType === 'checklist' && !trimmedTitle) {
      setErrorMessage('Enter a checklist title first.');
      return;
    }

    const finalTitle = trimmedTitle;

    const baseNote = {
      id: crypto.randomUUID(),
      title: finalTitle,
      createdAt: Date.now(),
    };

    const newNote: Note = noteType === 'checklist'
      ? { ...baseNote, type: 'checklist', description: trimmedDescription, items: [] }
      : { ...baseNote, type: 'text', body: trimmedBody };

    setNotes((currentNotes) => [...currentNotes, newNote]);
    setTitle('');
    setBody('');
    setDescription('');
    setErrorMessage('');
  };

  const deleteNote = (noteId: string) => {
    setNotes((currentNotes) => removeNote(currentNotes, noteId));
  };

  const updateNote = (noteId: string, updates: { title: string; body?: string }) => {
    setNotes((currentNotes) => currentNotes.map((note) => {
      if (note.id !== noteId) return note;

      if (note.type === 'text') {
        return { ...note, title: updates.title, body: updates.body ?? '' };
      }

      return { ...note, title: updates.title };
    }));
  };

  const addChecklistItem = (noteId: string, text: string) => {
    const trimmedText = text.trim();
    if (!trimmedText) return;

    setNotes((currentNotes) => currentNotes.map((note) => {
      if (note.id !== noteId || note.type !== 'checklist') return note;

      return {
        ...note,
        items: [
          ...note.items,
          { id: crypto.randomUUID(), text: trimmedText, done: false },
        ],
      };
    }));
  };

  const toggleChecklistItem = (noteId: string, itemId: string) => {
    setNotes((currentNotes) => currentNotes.map((note) => {
      if (note.id !== noteId || note.type !== 'checklist') return note;

      return {
        ...note,
        items: note.items.map((item) => (
          item.id === itemId ? { ...item, done: !item.done } : item
        )),
      };
    }));
  };

  const deleteChecklistItem = (noteId: string, itemId: string) => {
    setNotes((currentNotes) => currentNotes.map((note) => {
      if (note.id !== noteId || note.type !== 'checklist') return note;

      return {
        ...note,
        items: note.items.filter((item) => item.id !== itemId),
      };
    }));
  };

  const editChecklistItem = (noteId: string, itemId: string, text: string) => {
    setNotes((currentNotes) => currentNotes.map((note) => {
      if (note.id !== noteId || note.type !== 'checklist') return note;

      return {
        ...note,
        items: note.items.map((item) => (
          item.id === itemId ? { ...item, text } : item
        )),
      };
    }));
  };

  return (
    <div className="min-h-screen w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-100 via-slate-50 to-lime-50 p-4 text-slate-800 sm:p-8">
      <section className="mx-auto min-h-[calc(100vh-2rem)] max-w-5xl rounded-2xl border border-white/80 bg-white/90 p-5 shadow-xl shadow-emerald-950/10 backdrop-blur sm:min-h-[calc(100vh-4rem)] sm:p-10">
      <h1 className="mb-8 text-center text-4xl font-extrabold tracking-tight text-emerald-900 sm:mb-10 sm:text-5xl">To-Do-App</h1>
      
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

export default nodeFunctions;