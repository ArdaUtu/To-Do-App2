import { useState } from 'react';
import AddNoteForm from './components/AddNoteForm';
import NoteList from './components/NoteList';
import { deleteNote as removeNote } from './deleteNote';
import type { Note, NoteType } from './types';

const App = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [noteType, setNoteType] = useState<NoteType>('text');
  const [errorMessage, setErrorMessage] = useState('');

  const addNote = () => {
  const trimmedTitle = title.trim();
  const trimmedBody = body.trim();

  if (!trimmedTitle) {
    setErrorMessage('Vul eerst een titel in.');
    return;
  }

  if (noteType === 'text' && !trimmedBody) {
    setErrorMessage('Vul eerst je note in.');
    return;
  }
  
    const baseNote = { id: crypto.randomUUID(), title: trimmedTitle, createdAt: Date.now() };
    const newNote: Note = noteType === 'checklist'
      ? { ...baseNote, type: 'checklist', items: [] }
      : { ...baseNote, type: 'text', body: body.trim() };

    setNotes((currentNotes) => [...currentNotes, newNote]);
    setTitle('');
    setBody('');
    setErrorMessage('');
  };

  const deleteNote = (noteId: string) => {
    setNotes((currentNotes) => removeNote(currentNotes, noteId));
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

  return (
    <div className="text-black bg-gradient-to-r from-[rgba(42,123,155,1)] from-0% via-[rgba(87,199,133,1)] via-50% to-[rgba(237,221,83,1)] to-100% min-w-45 p-8 min-h-screen w-full">
      <section className='bg-gradient-to-b from-[#70a5b9] to-white border-[#1d5b74] border-2 p-5'>
      <h1 className='text-center text-white text-3xl'>To-DoApp</h1>
      
      <div className="flex-1 p-5 mb-5 ">
        <AddNoteForm
          body={body}
          errorMessage={errorMessage}
          noteType={noteType}
          onAdd={addNote}
          onBodyChange={setBody}
          onNoteTypeChange={setNoteType}
          onTitleChange={setTitle}
          title={title}
        />
        <NoteList
          notes={notes}
          onDelete={deleteNote}
          onToggleItem={toggleChecklistItem}
        />
      </div>
      </section>
    </div>
  );
};

export default App;
