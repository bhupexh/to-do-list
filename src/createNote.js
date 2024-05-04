import { removeNote } from './dom';
import { expandNote } from './expandContent';
import { project } from './index';

const noteContainer = document.querySelector('.note-container');

export function createNote(title, description, dueDate, priority) {
  const noteId = project.setItem(title, description, dueDate, priority);
  localStorage.setItem('project', project.toJSON()); 
  displayNote(title, description, dueDate, priority, noteId)
};

export function displayNote(title, description, dueDate, priority, noteId) {
  const newNote = noteContainer.cloneNode(true);
  newNote.dataset.taskId = noteId;
  
  const headerClass = newNote.querySelector('.header').classList;
  newNote.querySelector('#check').id = `check${noteId}`;
  newNote.querySelector('.label').htmlFor = `check${noteId}`;
  newNote.querySelector('.delete').id = `delete${noteId}`;
  newNote.querySelector('.label').textContent = title;
  
  
  headerClass.add(getLabelColor(priority));
  newNote.querySelector('.expand-more').addEventListener('click', expandNote);
  newNote.querySelector('.delete').addEventListener('click', removeNote);
  newNote.classList.remove('hidden');
  document.getElementById('notes-container').appendChild(newNote);
}

function getLabelColor(priority){
  switch(priority){
    case '1': return 'border-l-red-600';
    case '2': return 'border-l-yellow-600';
    case '3': return 'border-l-green-600';
  }
}
