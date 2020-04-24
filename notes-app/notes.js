const fs = require("fs");
const chalk = require("chalk");

const success = chalk.bgGreen;
const error = chalk.bgRed;

const addNote = (title, body) => {
  const notes = loadNotes();
  //   if notes array have same title with the added notes title
  // then there will be a duplicate
  // if there is a duplicate, then we wont be able to add
  // const duplicateNotes = notes.filter((note) => note.title === title);
  const duplicateNote = notes.find((note) => note.title === title);

  debugger

  // find method will find a duplicate
  // if there is no duplicate, we add new note
  // if there is, we dont add
  if (!duplicateNote) {
    notes.push({
      title,
      body,
    });
    saveNotes(notes);

    console.log(success("New note added"));
  } else {
    console.log(error("Note title taken"));
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter((note) => note.title !== title);

  if (notes.length > notesToKeep.length) {
    console.log(success("Note removed"));
  } else {
    console.log(error("No note found!"));
  }

  saveNotes(notesToKeep);
};

const listNotes = (title) => {
  const notes = loadNotes();
  console.log(success(`Your notes are:`));

  notes.forEach((note) => {
    console.log(note.title);
  });
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  try {
    //   in here we get the file from notes.JSON
    // read it and then make it a string because it was binary
    // then parse it as JSON
    // if that file doesnt exist, we return an empty array
    // to add notes into
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    return [];
  }
};

const readNotes = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);

  if (note) {
    console.log(success(note.title));
    console.log(note.body);
  } else {
    console.log(error("Note not found"));
  }
};

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNotes: readNotes,
};
