import { project } from './index.js';

const openDialogBtn = document.getElementById('openDialog');
const closeDialogBtn = document.getElementById('closeDialog');
const taskDialog = document.getElementById('taskDialog');
const form = document.querySelector('form');
const noteContainer = document.querySelector('.note-container');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  handleForm(new FormData(this));
  this.reset();
  alert('The form was submitted!');
  taskDialog.close();
});

openDialogBtn.addEventListener('click', () => {
  taskDialog.showModal();
});

closeDialogBtn.addEventListener('click', () => {
  taskDialog.close();
});

function handleForm(formData) {
  const noteId = project.setItem(formData.get("title"), formData.get("description"), formData.get("dueDate"), formData.get("priority"));
  localStorage.setItem("project", project.toJSON()); 
  console.log(project.toDo);
  const newNote = noteContainer.cloneNode(true);
  newNote.dataset.taskId = noteId;
  newNote.querySelector('.label').textContent = formData.get("title");
  document.getElementById('main-side').appendChild(newNote);
};