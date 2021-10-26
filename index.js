const textArea = document.querySelector('.create__note--textarea');
const noteBoard = document.querySelector('.note__board');
const noteAppBar = document.querySelector('.bottom__app-bar--note');

const mainCreateNote = document.querySelector('.main__create-note');
const mainNoteBoard = document.querySelector('.main__note-board');

const btnAdd = document.querySelector('.btn__add');
const btnSave = document.querySelector('.btn__save');
const btnDelete = document.querySelector('.btn__delete');
const btnCancel = document.querySelector('.btn__cancel');

const footerDate = document.querySelector('.footer__date');

noteBoard.innerHTML = '';
const notes = [];

// MOBILE KEYBOARD

if (screen.width > 992) {
    textArea.addEventListener('focus', function() {
        noteAppBar.style.display = 'block';
    })
}

let noteEdited = false;
let editedNoteIndex;

// FUNCTIONS

const openNoteArea = function() {
    // Close note board
    mainNoteBoard.style.display = 'none';
    // Open note area
    mainCreateNote.style.display = 'block';
    // Show delete button
    btnDelete.style.visibility = 'visible';
    // Show cancel button
    btnCancel.style.visibility = 'visible';
}

const closeNoteArea = function() {
    // Close note area
    mainCreateNote.style.display = 'none';
    // Open note board
    mainNoteBoard.style.display = 'block';
    // Hide delete button
    btnDelete.style.visibility = 'hidden';
    // Hide cancel button 
    btnCancel.style.visibility = 'hidden';
}

const updateUI = function(allNotes) {

    noteBoard.innerHTML = '';

    const newNote = allNotes.map(function(note) {

        return `
                <div class="note">
                    <p class="note__paragraph">${note}</p>
                </div>
            `
    }).join('');

    noteBoard.insertAdjacentHTML('beforeend', newNote);

    const pinnedNotes = document.querySelectorAll('.note');

    pinnedNotes.forEach(function(pinnedNote, ind) {
        pinnedNote.addEventListener('click', function() {
            editNote(ind);
            editedNoteIndex = ind;
        })
    })
}

const editNote = function(index) {

    openNoteArea();

    textArea.value = notes[index]

    noteEdited = true;
}

const pinEditedNote = function(editedContent) {
    
    notes[editedNoteIndex] = editedContent;

    updateUI(notes);

    noteEdited = false;
}

let noteContent;

// BUTTONS

btnAdd.addEventListener('click', function() {
    openNoteArea();
})

btnSave.addEventListener('click', function(ev) {
    ev.preventDefault();

    // Save note
    noteContent = textArea.value;

    // Pin note to the board
    if (!noteEdited) {
        // Add note
        notes.push(noteContent);
        updateUI(notes);
    } else {
        pinEditedNote(noteContent);
    }

    // Clear text area
    textArea.value = '';

    closeNoteArea();
})

btnDelete.addEventListener('click', function() {

    if (noteEdited) {
        notes.splice(editedNoteIndex, 1);
        updateUI(notes);
        noteEdited = false;
    }

    closeNoteArea();
    // Clear text area
    textArea.value = '';
})

btnCancel.addEventListener('click', function() {

    closeNoteArea();
})

footerDate.textContent = new Date().getFullYear();

