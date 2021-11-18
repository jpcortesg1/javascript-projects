"use strict";

// All notes
const notes = JSON.parse(localStorage.getItem("notes")) || {};
// Where save all notes
const navFiles = document.getElementById("nav_files");
// Where you see the entire note alone.
const content = document.querySelector(".content");
// Where you see the title and description of each note
const contentTile = document.getElementById("content_title");
const contentdescription = document.getElementById("content_description");
// Button for create new note
const buttonNew = document.getElementById("button_new");
// Button for save changes
const buttonSave = document.getElementById("button_save");
// For manage all id
let id = 1;
if (Object.entries(notes).length > 0)
  id = notes[Object.keys(notes)[Object.keys(notes).length - 1]].id + 1;

// To create new note
buttonNew.addEventListener("click", function () {
  const newNote = new Note(id);
  notes[id] = newNote;
  const html = newNote.getHtml();
  navFiles.appendChild(html);
  showInfo(id);
  id += 1;
  saveNotes();
});

// To save info of note
buttonSave.addEventListener("click", function () {
  const file = currentNote();
  const note = notes[file.id.split(" ")[1]];
  note.setTitle(contentTile.innerText);
  note.setDescription(contentdescription.innerText);
  saveNotes();
});

function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

// Know which note is active
function currentNote() {
  const children = navFiles.children;
  for (const file of children) {
    if (file.classList.contains("nav_files_buttons--active")) {
      return file;
    }
  }
}

// Delete the class so that only one note appears as active
function removeClass() {
  const children = navFiles.children;
  for (const note of children) {
    note.classList.remove("nav_files_buttons--active");
  }
}

// Show selected note
function showInfo(id) {
  removeClass();
  const note = notes[id];
  const file = document.getElementById(`file ${note.getId()}`);
  file.classList.add("nav_files_buttons--active");
  content.classList.add("content--visible");
  contentTile.innerText = note.getTitle();
  contentdescription.innerText = note.getDescription();
}

// Delete note
function deleteNote(id) {
  // buttonSave.click();
  content.classList.remove("content--visible");
  let note = notes[id];
  navFiles.removeChild(note.getHtml());
  delete notes[id];
  note = null;
  saveNotes();
}

function hola() {
  if (id > 1) {
    for (const key in notes) {
      const { id, title, description } = notes[key];
      const newNote = new Note(id, title, description);
      notes[key] = newNote;
      const html = newNote.getHtml();
      navFiles.appendChild(html);
    }
  }
}

hola();
