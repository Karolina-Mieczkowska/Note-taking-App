const footerDate = document.querySelector('.footer__date');
const textArea = document.querySelector('.create__note--textarea');
const btnAdd = document.querySelector('.btn__add');
const btnSave = document.querySelector('.btn__save');
const mainCreateNote = document.querySelector('.main__create-note');
const mainNoteBoard = document.querySelector('.main__note-board');
const noteBoard = document.querySelector('.note__board');

// const openNoeteArea = function() {
//     mainCreateNote.style.display = 'block';
// }

// const closeNoteArea = function() {
//     mainNoteBoard.style.display = 'block';
// }

// const openNoteBoard = function() {
//     mainNoteBoard.style.display = 'none';
// }

// const closeNoteBoard = function() {
//     mainNoteBoard.style.display = 'none';
// }

noteBoard.innerHTML = '';
const notes = [];

let noteEdited = false;
let editedNoteIndex;

const editNote = function(index) {
    console.log(`Edit note nr ${index}`)

    // Close note board
    mainNoteBoard.style.display = 'none';
    // Open note area
    mainCreateNote.style.display = 'block';

    textArea.value = notes[index]

    noteEdited = true;
}

const updateUI = function(content) {
    const newNote = `
            <div class="note">
                <p class="note__paragraph">${content}</p>
            </div>
        `
    noteBoard.insertAdjacentHTML('beforeend', newNote);
}

const pinEditedNote = function(editedContent) {
    console.log(editedContent);
    notes[editedNoteIndex] = editedContent;
    
    // Delete edited note

    // Pin new note

    // update UI
    notes = ['Ptak', 'Gąska', 'Lisek']
    updateUI()
}

let noteContent;

btnAdd.addEventListener('click', function() {
    // Close note board
    mainNoteBoard.style.display = 'none';
    // Open note area
    mainCreateNote.style.display = 'block';
})

btnSave.addEventListener('click', function(ev) {
    ev.preventDefault();

    // Add note
    noteContent = textArea.value;
    notes.push(noteContent);

    // Pin note to the board

    if (!noteEdited) {
        updateUI(noteContent);
    } else {
        pinEditedNote(noteContent);
    }

    const pinnedNotes = document.querySelectorAll('.note');

    pinnedNotes.forEach(function(pinnedNote, ind) {
        pinnedNote.addEventListener('click', function() {
            editNote(ind);
            editedNoteIndex = ind;
        })
    })

    // Clear text area
    textArea.value = '';

    // Close note area
    mainCreateNote.style.display = 'none';
    // Open note board
    mainNoteBoard.style.display = 'block';
})

footerDate.textContent = new Date().getFullYear();

// Update UI musi się odbywać za pomocą całej tablicy (ona musi być callbackiem), tak żeby potem można było zrobić update wpisać nowe notes i masz nowy UI