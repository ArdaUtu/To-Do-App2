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

    if (noteType === 'checklist' && !trimmedDescription) {
      setErrorMessage('Enter a description first.');
      return;
    }

    const finalTitle = noteType === 'checklist'
      ? 'Checklist'
      : trimmedTitle;

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
    <div className="text-black bg-gradient-to-r from-[rgba(42,123,155,1)] from-0% via-[rgba(87,199,133,1)] via-50% to-[rgba(237,221,83,1)] to-100% min-w-45 p-8 min-h-screen w-full">
      <section className='bg-gradient-to-b from-[#70a5b9] to-white border-[#1d5b74] border-2 p-5'>
      <h1 className='text-center text-white text-3xl'>To-Do-App</h1>
      
      <div className="flex-1 p-5 mb-5 ">
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