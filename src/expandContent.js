import { createEditBtn } from './editBtn';
import { project } from './index';

export function expandNote() {
  const note = this.parentElement.parentElement;
  const taskId = note.dataset.taskId;
  const task = getTaskById(taskId);
  if (task) {
    expandNoteUtil(task, note);
  } else {
    console.log('Task not found');
  }
}

function expandNoteUtil(task, note) {
  if (note.classList.contains('expanded')) {
    const contentDiv = note.querySelector('.content');
    contentDiv.classList.add('hidden');
    note.classList.remove('expanded');
    while (contentDiv.firstChild) {
      contentDiv.removeChild(contentDiv.firstChild);
    }
    return;
  }

  const noteExpand = createExpandContainer(task, note);
  const contentDiv = note.querySelector('.content');
  contentDiv.appendChild(noteExpand);
  note.classList.add('expanded');
  contentDiv.classList.remove('hidden');
}

function createExpandContainer(task, note) {
  const fragment = document.createDocumentFragment();

  let count = 0;
  for (let taskData in task) {
    if (count === 1) {
      fragment.appendChild(createEditBtn());
    }

    const label = document.createElement('label');
    const noteItem = document.createElement('input');
    const noteItemDiv = document.createElement('div');

    noteItem.setAttribute('readonly', 'true');
    noteItem.id = `${taskData}${note.dataset.taskId}`;
    label.textContent = taskData;
    label.htmlFor = `${taskData}${note.dataset.taskId}`;
    noteItem.value = task[taskData];

    noteItem.classList.add('bg-slate-700', 'p-2');
    noteItemDiv.classList.add('flex', 'justify-center', 'flex-col', 'gap-2');
    noteItemDiv.appendChild(label);
    noteItemDiv.appendChild(noteItem);
    fragment.appendChild(noteItemDiv);

    count++;
  }
  return fragment;
}

function getTaskById(taskId) {
  for (let taskKey in project.toDo) {
    let task = project.toDo[taskKey];
    if (task.id == taskId) {
      return task;
    }
  }
}

