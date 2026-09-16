import { useState } from 'react';
import AddNoteForm from './components/AddNoteForm';
import NoteList from './components/NoteList';
import type { Note } from './types';

const App = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  const addNote = (note: Note) => {
    setNotes((currentNotes) => [...currentNotes, note]);
  };

  const deleteNote = (noteId: string) => {
    setNotes((currentNotes) => currentNotes.filter((note) => note.id !== noteId));
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
        <AddNoteForm onAdd={addNote} />
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
