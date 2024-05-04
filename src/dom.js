
import { project } from '.';
import './addNote';
import { expandNote } from './expandContent';

var modebtn = document.getElementById('modebtn');
var mode = document.getElementById('mode');
var deleteNote = document.getElementsByClassName('delete');

Array.from(deleteNote).forEach(element => {
  element.addEventListener('click', removeNote);
});

export function removeNote(event) {
  console.log(event.target.id);
  const note = this.parentNode.parentNode;
  const noteID = note.dataset.taskId - 1;
  document.getElementById('notes-container').removeChild(note);
  project.removeItem(noteID);
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