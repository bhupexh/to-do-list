import { longFormatters } from 'date-fns';
import './addNote.js';
import { project } from './index.js';

var modebtn = document.getElementById('modebtn');
var mode = document.getElementById('mode');
var deleteNote = document.getElementsByClassName('delete');

Array.from(deleteNote).forEach(element => {
  element.addEventListener('click', e => {
    document.getElementById('main-side').removeChild(document.getElementById(e.target.id).parentNode.parentNode);
  })
});

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
    icon.addEventListener("click", function() {
      const note = this.parentElement.parentElement;
      const taskId = note.dataset.taskId;
      const task = getTaskById(taskId);
      if (task) {
        expandNote(task, note);
      } else {
        console.log("Task not found");
      }
    });
  });
});

function expandNote(task, note) {
 const noteExpand = (()=>{
    const fragment = document.createDocumentFragment();
    for(let taskData in task){
      const noteItem = document.createElement('div');
      noteItem.textContent = task[taskData];
      fragment.appendChild(noteItem);
    }
    return fragment;
  })(); 
  note.querySelector('.content').appendChild(noteExpand);
}

function getTaskById(taskId) {
  for(let taskKey in project.toDo){
    let task = project.toDo[taskKey];
    if(task.id == taskId){
      return task;
    }
  }
}