import { longFormatters } from 'date-fns';
import './addNote.js';
import { project } from './index.js';

var modebtn = document.getElementById('modebtn');
var mode = document.getElementById('mode');
var deleteNote = document.getElementsByClassName('delete');

Array.from(deleteNote).forEach(element => {
  element.addEventListener('click', (e) => {
  const id = element.parentNode.parentNode.dataset.taskId;
  removeNote(e, id);
  })
});

export function removeNote(e, id) {
  document.getElementById('main-side').removeChild(document.getElementById(`${e.target.id}`).parentNode.parentNode);
}

modebtn.addEventListener('click', ()=>{
  if(!(modebtn.classList.contains('dark'))){
    modebtn.textContent= "dark_mode";
    modebtn.classList.add('dark');
    mode.classList.add('dark');
  }
  else{
    modebtn.textContent= "light_mode";
    modebtn.classList.remove('dark');
    mode.classList.remove('dark');
  }
})


document.addEventListener("DOMContentLoaded", function() {
  const expandIcons = document.querySelectorAll(".expand-more");

  expandIcons.forEach(icon => {
    icon.addEventListener("click", expandNote);
  });
});

export function expandNote(){
  const note = this.parentElement.parentElement;
  const taskId = note.dataset.taskId;
  const task = getTaskById(taskId);
  if (task) {
    expandNoteUtil(task, note);
  } else {
    console.log("Task not found");
  }
}
function expandNoteUtil(task, note) {
  if(note.classList.contains('expanded')){
    const contentDiv = note.querySelector('.content');
    contentDiv.classList.add('hidden');
    note.classList.remove('expanded');
    while(contentDiv.firstChild){
      contentDiv.removeChild(contentDiv.firstChild);
    }
    return;
  }
 const noteExpand = (()=>{
    const fragment = document.createDocumentFragment();
    
    for(let taskData in task){
      const label = document.createElement('label');
      const noteItem = document.createElement('div');
      const noteItemDiv = document.createElement('div');

      label.textContent = taskData;
      noteItem.textContent = task[taskData];
      noteItemDiv.appendChild(label);
      noteItemDiv.appendChild(noteItem);
      fragment.appendChild(noteItemDiv);
    }
    return fragment;
  })(); 
  const contentDiv = note.querySelector('.content');
  contentDiv.appendChild(noteExpand);
  note.classList.add("expanded");
  contentDiv.classList.remove('hidden');
}

function getTaskById(taskId) {
  console.log(project.toDo);
  console.log(taskId);
  for(let taskKey in project.toDo){
    let task = project.toDo[taskKey];
    if(task.id == taskId){
      return task;
    }
  }
}