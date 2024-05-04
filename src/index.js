import './index.css';
import createProjectObject from './project';
import './dom';
import { displayNote} from './createNote';

export const project = createProjectObject();

if(localStorage.getItem('project')){
  project.toDo = JSON.parse(localStorage.getItem('project'));
  for(const todo in project.toDo){
    const note = project.toDo[todo];
    displayNote(note.title, note.description, note.dueDate, note.priority, parseInt(todo) + 1);
  }
}

// project.setItem('Movie Night', 'Big Day', '2024-05-10', '1', '1');
// localStorage.setItem('project', project.toJSON()); 
