import { handleForm } from './createNote';

const openDialogBtn = document.getElementById('openDialog');
const closeDialogBtn = document.getElementById('closeDialog');
const taskDialog = document.getElementById('taskDialog');
const form = document.querySelector('form');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  const formData = new FormData(this);
  handleForm(formData.get("title"), formData.get("description"), formData.get("dueDate"), formData.get("priority"));
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

