import { project } from ".";

export function createEditBtn() {
  const editBtn = document.createElement('i');
  const editBtnDiv = document.createElement('div');

  editBtn.id = "editBtn";
  editBtn.textContent = 'edit';
  editBtn.classList.add(
    'material-symbols-outlined',
    'mr-4',
    'border',
    'p-2',
    'rounded-md',
    'cursor-pointer'
  );
  editBtn.addEventListener('click', handleEditBtn);
  editBtnDiv.classList.add(
    'border-none',
    'flex',
    'justify-end',
    'items-start'
  );
  editBtnDiv.appendChild(editBtn);

  return editBtnDiv;
}

function handleEditBtn(event) {
  const contentDiv = event.target.parentElement.parentElement;
  const inputFields = contentDiv.querySelectorAll('input');
  inputFields.forEach(input => {
    makeEditable(input);
  })
  
  document.body.addEventListener('click', handleClick);
}

function makeEditable(inputField) {
  if (inputField) {
    inputField.removeAttribute('readonly');
  }
  inputField.addEventListener('input', handleInputChange);
}

function makeReadonly(input) {
  input.setAttribute('readonly', 'true');
}

function handleInputChange(event) {
  const noteDivID = event.target.parentElement.parentElement.parentElement.dataset.taskId;
  const id = parseInt(noteDivID) - 1;
  const field = `${event.target.id}`.slice(0, -1);
  const value = event.target.value;

  project.updateItem(id, field, value);
}

function handleClick(event) {
  const inputFields = document.querySelectorAll('.content>div>input');
  const clickedOnEditButton = document.getElementById('editBtn').contains(event.target);

  const clickedInsideInput = Array.from(inputFields).some((input) =>
    input.contains(event.target)
  );
  if (!clickedInsideInput && !clickedOnEditButton) {
    inputFields.forEach((input) => makeReadonly(input));
    // Remove the event listener after making input fields readonly
    document.body.removeEventListener('click', handleClick);
  }
}