document.addEventListener('DOMContentLoaded', () => {
    const noteForm = document.getElementById('noteForm');
    const notesContainer = document.getElementById('notesContainer');

    noteForm.addEventListener('submit', event => {
        event.preventDefault();
        addNote();
    });

    const addNote = () => {
        const note = {
            title: document.getElementById('title').value,
            content: document.getElementById('content').value,
            color: document.getElementById('color').value,
            pin: document.getElementById('pin').checked,
            date: new Date().toLocaleString()
        };

        const notes = getNotes();
        notes.push(note);
        saveNotes(notes);

        displayNotes();
        noteForm.reset();
    };

    const getNotes = () => JSON.parse(localStorage.getItem('notes')) || [];
    const saveNotes = (notes) => localStorage.setItem('notes', JSON.stringify(notes));

    const displayNotes = () => {
        notesContainer.innerHTML = '';
        const notes = getNotes().sort((a, b) => b.pin - a.pin);
        notes.forEach(note => {
            const noteElement = document.createElement('div');
            noteElement.className = 'note';
            noteElement.style.backgroundColor = note.color;
            noteElement.innerHTML = `
                <h2>${note.title}</h2>
                <p>${note.content}</p>
                <small>${note.date}</small>
                <button onclick="deleteNote('${note.title}')">Delete</button>
            `;
            notesContainer.appendChild(noteElement);
        });
    };

    window.deleteNote = (title) => {
        const notes = getNotes().filter(note => note.title !== title);
        saveNotes(notes);
        displayNotes();
    };

    displayNotes();
});