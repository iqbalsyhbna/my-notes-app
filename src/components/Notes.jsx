// src/Notes.js
import { useState } from 'react';

function Notes() {
  const [notes, setNotes] = useState([]);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteDescription, setNewNoteDescription] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const maxCharacterCount = 50;

  const handleTitleChange = (e) => {
    const inputValue = e.target.value;

    if (inputValue.length <= maxCharacterCount) {
      setNewNoteTitle(inputValue);
    }
  };

  const addNote = () => {
    if (newNoteTitle && newNoteDescription) {
      const formattedDate = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(new Date());

      const newNote = {
        title: newNoteTitle,
        description: newNoteDescription,
        createdAt: formattedDate,
      };
      setNotes([...notes, newNote]);
      setNewNoteTitle('');
      setNewNoteDescription('');
    }
  };

  const deleteNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-1/2">
      <h2 className="text-2xl mb-4">Notes App</h2>
      <div className="flex justify-end py-2">
        <h3>
          Character count remaining: <strong>{maxCharacterCount - newNoteTitle.length}</strong>
        </h3>
      </div>
      <div className="mb-4 w-full">
        <input
          type="text"
          className="border p-2 w-full outline-none"
          value={newNoteTitle}
          onChange={handleTitleChange}
          placeholder="Enter note title"
        />
      </div>
      <div className="mb-4 w-full">
        <textarea
          rows={8}
          className="border p-2 w-full outline-none"
          value={newNoteDescription}
          onChange={(e) => setNewNoteDescription(e.target.value)}
          placeholder="Enter note description"
        />
      </div>
      <button className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-700" onClick={addNote}>
        Add Note
      </button>
      <div className="mt-4 mb-4 w-full">
        <input
          type="text"
          className="border p-2 w-full outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search notes"
        />
      </div>
      <ul className="w-full">
        {filteredNotes.map((note, index) => (
          <li key={index} className="border p-2 mb-2 flex justify-between items-center">
            <div className="flex flex-col">
              <h3 className="text-xl font-semibold">{note.title}</h3>
              <p className="text-sm text-gray-500 mb-2">Created at: {note.createdAt}</p>
              <p>{note.description}</p>
            </div>
            <div>
              <button className="bg-red-500 text-white p-2 rounded hover-bg-red-700" onClick={() => deleteNote(index)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notes;
