const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes.js');

// Add, remove, read, list notes
yargs.version('1.1.0');

// Add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note description',
            demandOption: true,
            type: 'string'
        }
    },
    handler (argv) {
        notes.addNote(argv.title, argv.body);
    }
});

// Remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler (argv) {
        notes.removeNote(argv.title);
    }
});

// Read command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true, 
            type: 'string'
        }
    },
    handler (argv) {
        notes.readNote(argv.title);
    }
});

// List command
yargs.command({
    command: 'list',
    describe: 'List all notes',
    handler () {
        notes.listNotes();    
    }
});

yargs.parse();