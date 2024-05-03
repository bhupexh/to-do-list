import { expandNote, removeNote } from './dom.js';
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
  const newNote = noteContainer.cloneNode(true);
  newNote.dataset.taskId = noteId;

  const headerClass = newNote.querySelector('.header').classList;
  headerClass.add(getLabelColor(formData.get("priority")));
  headerClass.remove("border-l-red-600");

  newNote.querySelector(".expand-more").addEventListener("click", expandNote);
  newNote.querySelector(".delete").addEventListener("click", (e) => {
    const id = element.parentElement.parentElement.dataset.taskId;
    removeNote(e, id)
  });
  newNote.querySelector('.label').textContent = formData.get("title");
  document.getElementById('main-side').appendChild(newNote);
};

function getLabelColor(priority){
  switch(priority){
    case "1": return "border-l-red-600";
    case "2": return "border-l-yellow-600";
    case "3": return "border-l-green-600";
  }
}