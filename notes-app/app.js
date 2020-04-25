const chalk = require('chalk');
const yargs = require('yargs');
const validator = require('validator');
const notes = require('./notes');

// customize the yargs version
yargs.version('1.1.0');

// create add command
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  // builder is for adding and deleting by title
  builder: {
    title: {
      describe: 'Note title',
      // with this option, it is a required field to add title
      demandOption: true,
      // this is option is to get title as a string
      // empty title would return a boolean value
      type: 'string',
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string',
    },
  },
  //   argv argument is to add title after the console.log
  handler(argv) {
    notes.addNote(argv.title, argv.body);
  },
});

// create remove command
yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    notes.removeNote(argv.title);
  },
});

// list command
yargs.command({
  command: 'list',
  describe: 'List notes',
  handler() {
    notes.listNotes();
  },
});

// read command
yargs.command({
  command: 'read',
  describe: 'Read notes',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    notes.readNotes(argv.title);
  },
});

yargs.parse();
