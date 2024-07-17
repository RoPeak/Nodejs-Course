const fs = require('fs');
const chalk = require('chalk');

const saveNotes = (notes) => {
    // Save notes JSON to file
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    try {
        // Read files, convert to JSON and return
        const buffer = fs.readFileSync('notes.json');
        const data = buffer.toString();
        return JSON.parse(data);    
    } catch (e) {
        // notes.json does not exist i.e. no notes yet 
        return [];
    }
}

const getNotes = () => {
    return "Your notes...";
}

const addNote = (title, body) => {
    const notes = loadNotes();

    // Ensure that the new note does not match any existing note
    // (find will stop iteration once duplicate found)
    const duplicateNote = notes.find((note) => note.title === title);


    // If no duplicates found, add note
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        });
    
        saveNotes(notes);
        console.log(chalk.green('New note (' + chalk.bold(title) + ') added!'));
    } else {
        console.log(chalk.red('Unable to add new note - ' + chalk.bold('title taken.')));
    }
}

const removeNote = (title) => {
    const notes = loadNotes();

    // Filter out the note we want to remove
    const notesToKeep = notes.filter((note) => note.title !== title);

    saveNotes(notesToKeep);

    if (notesToKeep.length < notes.length) {
        console.log(chalk.green('Successfully removed ' + chalk.bold(title)));
    } else {
        console.log(chalk.red('Note not found with title: ' + chalk.bold(title)));
    }
}

const readNote = (title) => {
    const notes = loadNotes();
    
    const noteToFind = notes.find((note) => note.title === title);

    if (noteToFind) {
        console.log(chalk.green.inverse("Note found!\n") + chalk.green(noteToFind.title) + " - " + noteToFind.body);
    } else {
        console.log(chalk.red("Note not found with title - " + chalk.bold(title)));
    }
}

const listNotes = () => {
    const notes = loadNotes();
    let i = 1;

    console.log(chalk.inverse.green("Your notes:"));

    notes.forEach((note) => {
        console.log(i + ") " + chalk.bold(note.title) + " - " + note.body);
        i++;
    });
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    readNote: readNote,
    listNotes: listNotes
}