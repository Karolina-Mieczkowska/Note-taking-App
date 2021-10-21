const footerDate = document.querySelector('.footer__date');
const textArea = document.querySelector('.create__note--textarea');
const btnAdd = document.querySelector('.btn__add');
const btnSave = document.querySelector('.btn__save');
const mainCreateNote = document.querySelector('.main__create-note');
const mainNoteBoard = document.querySelector('.main__note-board');
const noteBoard = document.querySelector('.note__board');
const btnDelete = document.querySelector('.btn__delete');


noteBoard.innerHTML = '';
const notes = [];

let noteEdited = false;
let editedNoteIndex;

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
            console.log('click');
        })
    })
}

// STEP THREE

const editNote = function(index) {

    // Close note board
    mainNoteBoard.style.display = 'none';
    // Open note area
    mainCreateNote.style.display = 'block';
    // Show delete button
    btnDelete.style.visibility = 'visible';

    textArea.value = notes[index]

    noteEdited = true;
}

// STEP FOUR

const pinEditedNote = function(editedContent) {
    notes[editedNoteIndex] = editedContent;
    console.log(notes[editedNoteIndex]);
    
    // Delete edited note

    // Pin new note

    // update UI
    // notes = ['Ptak', 'Gąska', 'Lisek']
    // updateUI(notes)

    updateUI(notes);

    noteEdited = false;
}

// STEP ONE

let noteContent;

btnAdd.addEventListener('click', function() {
    // Close note board
    mainNoteBoard.style.display = 'none';
    // Open note area
    mainCreateNote.style.display = 'block';
    // Show delete button
    btnDelete.style.visibility = 'visible';
})

// STEP TWO

btnSave.addEventListener('click', function(ev) {
    ev.preventDefault();

    // Save note
    noteContent = textArea.value;

    // Pin note to the board

    // updateUI(notes);

    if (!noteEdited) {
        // Add note
        notes.push(noteContent);
        updateUI(notes);
    } else {
        pinEditedNote(noteContent);
    }

    // const pinnedNotes = document.querySelectorAll('.note');

    // pinnedNotes.forEach(function(pinnedNote, ind) {
    //     pinnedNote.addEventListener('click', function() {
    //         editNote(ind);
    //         editedNoteIndex = ind;
    //         console.log('click');
    //     })
    // })

    // Clear text area
    textArea.value = '';

    // Close note area
    mainCreateNote.style.display = 'none';
    // Open note board
    mainNoteBoard.style.display = 'block';
    // Hide delete button
    btnDelete.style.visibility = 'hidden';
})

btnDelete.addEventListener('click', function() {

    if (!noteEdited) {
        // Close note area
        mainCreateNote.style.display = 'none';
        // Open note board
        mainNoteBoard.style.display = 'block';
        // Hide delete button
        btnDelete.style.visibility = 'hidden';
    } else {
        notes.splice(editedNoteIndex, 1);
        updateUI(notes);
        noteEdited = false;
        // Close note area
        mainCreateNote.style.display = 'none';
        // Open note board
        mainNoteBoard.style.display = 'block';
        // Hide delete button
        btnDelete.style.visibility = 'hidden';
    }
})

footerDate.textContent = new Date().getFullYear();

// Update UI musi się odbywać za pomocą całej tablicy (ona musi być callbackiem), tak żeby potem można było zrobić update wpisać nowe notes i masz nowy UI