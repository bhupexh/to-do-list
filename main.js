"use strict";
(self["webpackChunktodo"] = self["webpackChunktodo"] || []).push([["main"],{

/***/ "./src/index.css":
/*!***********************!*\
  !*** ./src/index.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/addNote.js":
/*!************************!*\
  !*** ./src/addNote.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _createNote__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createNote */ "./src/createNote.js");


const openDialogBtn = document.getElementById('openDialog');
const closeDialogBtn = document.getElementById('closeDialog');
const taskDialog = document.getElementById('taskDialog');
const form = document.querySelector('form');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  const formData = new FormData(this);
  (0,_createNote__WEBPACK_IMPORTED_MODULE_0__.handleForm)(formData.get("title"), formData.get("description"), formData.get("dueDate"), formData.get("priority"));
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



/***/ }),

/***/ "./src/createNote.js":
/*!***************************!*\
  !*** ./src/createNote.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createNote: () => (/* binding */ createNote),
/* harmony export */   displayNote: () => (/* binding */ displayNote)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/dom.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index */ "./src/index.js");



const noteContainer = document.querySelector('.note-container');

function createNote(title, description, dueDate, priority) {
  const noteId = _index__WEBPACK_IMPORTED_MODULE_1__.project.setItem(title, description, dueDate, priority);
  localStorage.setItem('project', _index__WEBPACK_IMPORTED_MODULE_1__.project.toJSON()); 
  displayNote(title, description, dueDate, priority, noteId)
};

function displayNote(title, description, dueDate, priority, noteId) {
  const newNote = noteContainer.cloneNode(true);
  newNote.dataset.taskId = noteId;
  
  const headerClass = newNote.querySelector('.header').classList;
  newNote.querySelector('#check').id = `check${noteId}`;
  newNote.querySelector('.label').htmlFor = `check${noteId}`;
  newNote.querySelector('.delete').id = `delete${noteId}`;
  newNote.querySelector('.label').textContent = title;
  
  
  headerClass.add(getLabelColor(priority));
  newNote.querySelector('.expand-more').addEventListener('click', _dom__WEBPACK_IMPORTED_MODULE_0__.expandNote);
  newNote.querySelector('.delete').addEventListener('click', _dom__WEBPACK_IMPORTED_MODULE_0__.removeNote);
  
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


/***/ }),

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   removeNote: () => (/* binding */ removeNote)
/* harmony export */ });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ "./src/index.js");
/* harmony import */ var _addNote__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./addNote */ "./src/addNote.js");
/* harmony import */ var _expandContent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./expandContent */ "./src/expandContent.js");





var modebtn = document.getElementById('modebtn');
var mode = document.getElementById('mode');
var deleteNote = document.getElementsByClassName('delete');

Array.from(deleteNote).forEach(element => {
  element.addEventListener('click', removeNote);
});

function removeNote(event) {
  console.log(event.target.id);
  const note = this.parentNode.parentNode;
  const noteID = note.dataset.taskId - 1;
  document.getElementById('notes-container').removeChild(note);
  ___WEBPACK_IMPORTED_MODULE_0__.project.removeItem(noteID);
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
    icon.addEventListener("click", _expandContent__WEBPACK_IMPORTED_MODULE_2__.expandNote);
  });
});

/***/ }),

/***/ "./src/editBtn.js":
/*!************************!*\
  !*** ./src/editBtn.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createEditBtn: () => (/* binding */ createEditBtn)
/* harmony export */ });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ "./src/index.js");


function createEditBtn() {
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

  ___WEBPACK_IMPORTED_MODULE_0__.project.updateItem(id, field, value);
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

/***/ }),

/***/ "./src/expandContent.js":
/*!******************************!*\
  !*** ./src/expandContent.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   expandNote: () => (/* binding */ expandNote)
/* harmony export */ });
/* harmony import */ var _editBtn__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./editBtn */ "./src/editBtn.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index */ "./src/index.js");



function expandNote() {
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
      fragment.appendChild((0,_editBtn__WEBPACK_IMPORTED_MODULE_0__.createEditBtn)());
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
  for (let taskKey in _index__WEBPACK_IMPORTED_MODULE_1__.project.toDo) {
    let task = _index__WEBPACK_IMPORTED_MODULE_1__.project.toDo[taskKey];
    if (task.id == taskId) {
      return task;
    }
  }
}



/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   project: () => (/* binding */ project)
/* harmony export */ });
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.css */ "./src/index.css");
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project */ "./src/project.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dom */ "./src/dom.js");
/* harmony import */ var _createNote__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./createNote */ "./src/createNote.js");





const project = (0,_project__WEBPACK_IMPORTED_MODULE_1__["default"])();

if(localStorage.getItem('project')){
  project.toDo = JSON.parse(localStorage.getItem('project'));
  for(const todo in project.toDo){
    const note = project.toDo[todo];
    (0,_createNote__WEBPACK_IMPORTED_MODULE_3__.displayNote)(note.title, note.description, note.dueDate, note.priority, parseInt(todo) + 1);
  }
}

// project.setItem('Movie Night', 'Big Day', '2024-05-10', '1', '1');
// localStorage.setItem('project', project.toJSON()); 


/***/ }),

/***/ "./src/project.js":
/*!************************!*\
  !*** ./src/project.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });


function createProjectObject(){
  return {
    toDo: [],
    setItem : function (title, description, due, priority){
      // due = differenceInDays(parseISO(due), new Date());
      this.toDo.push({ 
        id: this.toDo.length + 1,
        title,
        description,
        due,
        priority
      });
      return this.toDo.length;
    },
    getItem: function(index){
      if (index >= 0 && index < this.toDo.length) {
        return this.toDo[index];
      } else {
        return null; 
      }
    },
    removeItem: function(index){
      if (index >= 0 && index < this.toDo.length) {
        this.toDo.splice(index, 1);
        localStorage.setItem('project', this.toJSON()); 
        console.log(this.toDo);
      }
    },
    updateItem: function(id, field, value){
      this.getItem(id)[field] = value;
      localStorage.setItem('project', this.toJSON()); 
    },
    toJSON: function() {;
      return JSON.stringify(this.toDo);
    }
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createProjectObject);

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlLG1CQUFtQiIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8vLi9zcmMvaW5kZXguY3NzPzlmYWMiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9hZGROb3RlLmpzIiwid2VicGFjazovL3RvZG8vLi9zcmMvY3JlYXRlTm90ZS5qcyIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL2VkaXRCdG4uanMiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9leHBhbmRDb250ZW50LmpzIiwid2VicGFjazovL3RvZG8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9wcm9qZWN0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImltcG9ydCB7IGhhbmRsZUZvcm0gfSBmcm9tICcuL2NyZWF0ZU5vdGUnO1xuXG5jb25zdCBvcGVuRGlhbG9nQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ29wZW5EaWFsb2cnKTtcbmNvbnN0IGNsb3NlRGlhbG9nQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nsb3NlRGlhbG9nJyk7XG5jb25zdCB0YXNrRGlhbG9nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2tEaWFsb2cnKTtcbmNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdmb3JtJyk7XG5cbmZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEodGhpcyk7XG4gIGhhbmRsZUZvcm0oZm9ybURhdGEuZ2V0KFwidGl0bGVcIiksIGZvcm1EYXRhLmdldChcImRlc2NyaXB0aW9uXCIpLCBmb3JtRGF0YS5nZXQoXCJkdWVEYXRlXCIpLCBmb3JtRGF0YS5nZXQoXCJwcmlvcml0eVwiKSk7XG4gIHRoaXMucmVzZXQoKTtcbiAgYWxlcnQoJ1RoZSBmb3JtIHdhcyBzdWJtaXR0ZWQhJyk7XG4gIHRhc2tEaWFsb2cuY2xvc2UoKTtcbn0pO1xuXG5vcGVuRGlhbG9nQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICB0YXNrRGlhbG9nLnNob3dNb2RhbCgpO1xufSk7XG5cbmNsb3NlRGlhbG9nQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICB0YXNrRGlhbG9nLmNsb3NlKCk7XG59KTtcblxuIiwiaW1wb3J0IHsgZXhwYW5kTm90ZSwgcmVtb3ZlTm90ZSB9IGZyb20gJy4vZG9tJztcbmltcG9ydCB7IHByb2plY3QgfSBmcm9tICcuL2luZGV4JztcblxuY29uc3Qgbm90ZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ub3RlLWNvbnRhaW5lcicpO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTm90ZSh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5KSB7XG4gIGNvbnN0IG5vdGVJZCA9IHByb2plY3Quc2V0SXRlbSh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5KTtcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2plY3QnLCBwcm9qZWN0LnRvSlNPTigpKTsgXG4gIGRpc3BsYXlOb3RlKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIG5vdGVJZClcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXNwbGF5Tm90ZSh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBub3RlSWQpIHtcbiAgY29uc3QgbmV3Tm90ZSA9IG5vdGVDb250YWluZXIuY2xvbmVOb2RlKHRydWUpO1xuICBuZXdOb3RlLmRhdGFzZXQudGFza0lkID0gbm90ZUlkO1xuICBcbiAgY29uc3QgaGVhZGVyQ2xhc3MgPSBuZXdOb3RlLnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXInKS5jbGFzc0xpc3Q7XG4gIG5ld05vdGUucXVlcnlTZWxlY3RvcignI2NoZWNrJykuaWQgPSBgY2hlY2ske25vdGVJZH1gO1xuICBuZXdOb3RlLnF1ZXJ5U2VsZWN0b3IoJy5sYWJlbCcpLmh0bWxGb3IgPSBgY2hlY2ske25vdGVJZH1gO1xuICBuZXdOb3RlLnF1ZXJ5U2VsZWN0b3IoJy5kZWxldGUnKS5pZCA9IGBkZWxldGUke25vdGVJZH1gO1xuICBuZXdOb3RlLnF1ZXJ5U2VsZWN0b3IoJy5sYWJlbCcpLnRleHRDb250ZW50ID0gdGl0bGU7XG4gIFxuICBcbiAgaGVhZGVyQ2xhc3MuYWRkKGdldExhYmVsQ29sb3IocHJpb3JpdHkpKTtcbiAgbmV3Tm90ZS5xdWVyeVNlbGVjdG9yKCcuZXhwYW5kLW1vcmUnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV4cGFuZE5vdGUpO1xuICBuZXdOb3RlLnF1ZXJ5U2VsZWN0b3IoJy5kZWxldGUnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJlbW92ZU5vdGUpO1xuICBcbiAgbmV3Tm90ZS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25vdGVzLWNvbnRhaW5lcicpLmFwcGVuZENoaWxkKG5ld05vdGUpO1xufVxuXG5mdW5jdGlvbiBnZXRMYWJlbENvbG9yKHByaW9yaXR5KXtcbiAgc3dpdGNoKHByaW9yaXR5KXtcbiAgICBjYXNlICcxJzogcmV0dXJuICdib3JkZXItbC1yZWQtNjAwJztcbiAgICBjYXNlICcyJzogcmV0dXJuICdib3JkZXItbC15ZWxsb3ctNjAwJztcbiAgICBjYXNlICczJzogcmV0dXJuICdib3JkZXItbC1ncmVlbi02MDAnO1xuICB9XG59XG4iLCJcbmltcG9ydCB7IHByb2plY3QgfSBmcm9tICcuJztcbmltcG9ydCAnLi9hZGROb3RlJztcbmltcG9ydCB7IGV4cGFuZE5vdGUgfSBmcm9tICcuL2V4cGFuZENvbnRlbnQnO1xuXG52YXIgbW9kZWJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RlYnRuJyk7XG52YXIgbW9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RlJyk7XG52YXIgZGVsZXRlTm90ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2RlbGV0ZScpO1xuXG5BcnJheS5mcm9tKGRlbGV0ZU5vdGUpLmZvckVhY2goZWxlbWVudCA9PiB7XG4gIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCByZW1vdmVOb3RlKTtcbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlTm90ZShldmVudCkge1xuICBjb25zb2xlLmxvZyhldmVudC50YXJnZXQuaWQpO1xuICBjb25zdCBub3RlID0gdGhpcy5wYXJlbnROb2RlLnBhcmVudE5vZGU7XG4gIGNvbnN0IG5vdGVJRCA9IG5vdGUuZGF0YXNldC50YXNrSWQgLSAxO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbm90ZXMtY29udGFpbmVyJykucmVtb3ZlQ2hpbGQobm90ZSk7XG4gIHByb2plY3QucmVtb3ZlSXRlbShub3RlSUQpO1xufVxuXG5tb2RlYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PntcbiAgaWYoIShtb2RlYnRuLmNsYXNzTGlzdC5jb250YWlucygnZGFyaycpKSl7XG4gICAgbW9kZWJ0bi50ZXh0Q29udGVudD0gXCJkYXJrX21vZGVcIjtcbiAgICBtb2RlYnRuLmNsYXNzTGlzdC5hZGQoJ2RhcmsnKTtcbiAgICBtb2RlLmNsYXNzTGlzdC5hZGQoJ2RhcmsnKTtcbiAgfVxuICBlbHNle1xuICAgIG1vZGVidG4udGV4dENvbnRlbnQ9IFwibGlnaHRfbW9kZVwiO1xuICAgIG1vZGVidG4uY2xhc3NMaXN0LnJlbW92ZSgnZGFyaycpO1xuICAgIG1vZGUuY2xhc3NMaXN0LnJlbW92ZSgnZGFyaycpO1xuICB9XG59KVxuXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKCkge1xuICBjb25zdCBleHBhbmRJY29ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZXhwYW5kLW1vcmVcIik7XG5cbiAgZXhwYW5kSWNvbnMuZm9yRWFjaChpY29uID0+IHtcbiAgICBpY29uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBleHBhbmROb3RlKTtcbiAgfSk7XG59KTsiLCJpbXBvcnQgeyBwcm9qZWN0IH0gZnJvbSBcIi5cIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUVkaXRCdG4oKSB7XG4gIGNvbnN0IGVkaXRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gIGNvbnN0IGVkaXRCdG5EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICBlZGl0QnRuLmlkID0gXCJlZGl0QnRuXCI7XG4gIGVkaXRCdG4udGV4dENvbnRlbnQgPSAnZWRpdCc7XG4gIGVkaXRCdG4uY2xhc3NMaXN0LmFkZChcbiAgICAnbWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCcsXG4gICAgJ21yLTQnLFxuICAgICdib3JkZXInLFxuICAgICdwLTInLFxuICAgICdyb3VuZGVkLW1kJyxcbiAgICAnY3Vyc29yLXBvaW50ZXInXG4gICk7XG4gIGVkaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVFZGl0QnRuKTtcbiAgZWRpdEJ0bkRpdi5jbGFzc0xpc3QuYWRkKFxuICAgICdib3JkZXItbm9uZScsXG4gICAgJ2ZsZXgnLFxuICAgICdqdXN0aWZ5LWVuZCcsXG4gICAgJ2l0ZW1zLXN0YXJ0J1xuICApO1xuICBlZGl0QnRuRGl2LmFwcGVuZENoaWxkKGVkaXRCdG4pO1xuXG4gIHJldHVybiBlZGl0QnRuRGl2O1xufVxuXG5mdW5jdGlvbiBoYW5kbGVFZGl0QnRuKGV2ZW50KSB7XG4gIGNvbnN0IGNvbnRlbnREaXYgPSBldmVudC50YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICBjb25zdCBpbnB1dEZpZWxkcyA9IGNvbnRlbnREaXYucXVlcnlTZWxlY3RvckFsbCgnaW5wdXQnKTtcbiAgaW5wdXRGaWVsZHMuZm9yRWFjaChpbnB1dCA9PiB7XG4gICAgbWFrZUVkaXRhYmxlKGlucHV0KTtcbiAgfSlcbiAgXG4gIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVDbGljayk7XG59XG5cbmZ1bmN0aW9uIG1ha2VFZGl0YWJsZShpbnB1dEZpZWxkKSB7XG4gIGlmIChpbnB1dEZpZWxkKSB7XG4gICAgaW5wdXRGaWVsZC5yZW1vdmVBdHRyaWJ1dGUoJ3JlYWRvbmx5Jyk7XG4gIH1cbiAgaW5wdXRGaWVsZC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGhhbmRsZUlucHV0Q2hhbmdlKTtcbn1cblxuZnVuY3Rpb24gbWFrZVJlYWRvbmx5KGlucHV0KSB7XG4gIGlucHV0LnNldEF0dHJpYnV0ZSgncmVhZG9ubHknLCAndHJ1ZScpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVJbnB1dENoYW5nZShldmVudCkge1xuICBjb25zdCBub3RlRGl2SUQgPSBldmVudC50YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuZGF0YXNldC50YXNrSWQ7XG4gIGNvbnN0IGlkID0gcGFyc2VJbnQobm90ZURpdklEKSAtIDE7XG4gIGNvbnN0IGZpZWxkID0gYCR7ZXZlbnQudGFyZ2V0LmlkfWAuc2xpY2UoMCwgLTEpO1xuICBjb25zdCB2YWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcblxuICBwcm9qZWN0LnVwZGF0ZUl0ZW0oaWQsIGZpZWxkLCB2YWx1ZSk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZUNsaWNrKGV2ZW50KSB7XG4gIGNvbnN0IGlucHV0RmllbGRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbnRlbnQ+ZGl2PmlucHV0Jyk7XG4gIGNvbnN0IGNsaWNrZWRPbkVkaXRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZWRpdEJ0bicpLmNvbnRhaW5zKGV2ZW50LnRhcmdldCk7XG5cbiAgY29uc3QgY2xpY2tlZEluc2lkZUlucHV0ID0gQXJyYXkuZnJvbShpbnB1dEZpZWxkcykuc29tZSgoaW5wdXQpID0+XG4gICAgaW5wdXQuY29udGFpbnMoZXZlbnQudGFyZ2V0KVxuICApO1xuICBpZiAoIWNsaWNrZWRJbnNpZGVJbnB1dCAmJiAhY2xpY2tlZE9uRWRpdEJ1dHRvbikge1xuICAgIGlucHV0RmllbGRzLmZvckVhY2goKGlucHV0KSA9PiBtYWtlUmVhZG9ubHkoaW5wdXQpKTtcbiAgICAvLyBSZW1vdmUgdGhlIGV2ZW50IGxpc3RlbmVyIGFmdGVyIG1ha2luZyBpbnB1dCBmaWVsZHMgcmVhZG9ubHlcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlQ2xpY2spO1xuICB9XG59IiwiaW1wb3J0IHsgY3JlYXRlRWRpdEJ0biB9IGZyb20gJy4vZWRpdEJ0bic7XG5pbXBvcnQgeyBwcm9qZWN0IH0gZnJvbSAnLi9pbmRleCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBleHBhbmROb3RlKCkge1xuICBjb25zdCBub3RlID0gdGhpcy5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gIGNvbnN0IHRhc2tJZCA9IG5vdGUuZGF0YXNldC50YXNrSWQ7XG4gIGNvbnN0IHRhc2sgPSBnZXRUYXNrQnlJZCh0YXNrSWQpO1xuICBpZiAodGFzaykge1xuICAgIGV4cGFuZE5vdGVVdGlsKHRhc2ssIG5vdGUpO1xuICB9IGVsc2Uge1xuICAgIGNvbnNvbGUubG9nKCdUYXNrIG5vdCBmb3VuZCcpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGV4cGFuZE5vdGVVdGlsKHRhc2ssIG5vdGUpIHtcbiAgaWYgKG5vdGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdleHBhbmRlZCcpKSB7XG4gICAgY29uc3QgY29udGVudERpdiA9IG5vdGUucXVlcnlTZWxlY3RvcignLmNvbnRlbnQnKTtcbiAgICBjb250ZW50RGl2LmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgIG5vdGUuY2xhc3NMaXN0LnJlbW92ZSgnZXhwYW5kZWQnKTtcbiAgICB3aGlsZSAoY29udGVudERpdi5maXJzdENoaWxkKSB7XG4gICAgICBjb250ZW50RGl2LnJlbW92ZUNoaWxkKGNvbnRlbnREaXYuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IG5vdGVFeHBhbmQgPSBjcmVhdGVFeHBhbmRDb250YWluZXIodGFzaywgbm90ZSk7XG4gIGNvbnN0IGNvbnRlbnREaXYgPSBub3RlLnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50Jyk7XG4gIGNvbnRlbnREaXYuYXBwZW5kQ2hpbGQobm90ZUV4cGFuZCk7XG4gIG5vdGUuY2xhc3NMaXN0LmFkZCgnZXhwYW5kZWQnKTtcbiAgY29udGVudERpdi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRXhwYW5kQ29udGFpbmVyKHRhc2ssIG5vdGUpIHtcbiAgY29uc3QgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cbiAgbGV0IGNvdW50ID0gMDtcbiAgZm9yIChsZXQgdGFza0RhdGEgaW4gdGFzaykge1xuICAgIGlmIChjb3VudCA9PT0gMSkge1xuICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoY3JlYXRlRWRpdEJ0bigpKTtcbiAgICB9XG5cbiAgICBjb25zdCBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgY29uc3Qgbm90ZUl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIGNvbnN0IG5vdGVJdGVtRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICBub3RlSXRlbS5zZXRBdHRyaWJ1dGUoJ3JlYWRvbmx5JywgJ3RydWUnKTtcbiAgICBub3RlSXRlbS5pZCA9IGAke3Rhc2tEYXRhfSR7bm90ZS5kYXRhc2V0LnRhc2tJZH1gO1xuICAgIGxhYmVsLnRleHRDb250ZW50ID0gdGFza0RhdGE7XG4gICAgbGFiZWwuaHRtbEZvciA9IGAke3Rhc2tEYXRhfSR7bm90ZS5kYXRhc2V0LnRhc2tJZH1gO1xuICAgIG5vdGVJdGVtLnZhbHVlID0gdGFza1t0YXNrRGF0YV07XG5cbiAgICBub3RlSXRlbS5jbGFzc0xpc3QuYWRkKCdiZy1zbGF0ZS03MDAnLCAncC0yJyk7XG4gICAgbm90ZUl0ZW1EaXYuY2xhc3NMaXN0LmFkZCgnZmxleCcsICdqdXN0aWZ5LWNlbnRlcicsICdmbGV4LWNvbCcsICdnYXAtMicpO1xuICAgIG5vdGVJdGVtRGl2LmFwcGVuZENoaWxkKGxhYmVsKTtcbiAgICBub3RlSXRlbURpdi5hcHBlbmRDaGlsZChub3RlSXRlbSk7XG4gICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQobm90ZUl0ZW1EaXYpO1xuXG4gICAgY291bnQrKztcbiAgfVxuICByZXR1cm4gZnJhZ21lbnQ7XG59XG5cbmZ1bmN0aW9uIGdldFRhc2tCeUlkKHRhc2tJZCkge1xuICBmb3IgKGxldCB0YXNrS2V5IGluIHByb2plY3QudG9Ebykge1xuICAgIGxldCB0YXNrID0gcHJvamVjdC50b0RvW3Rhc2tLZXldO1xuICAgIGlmICh0YXNrLmlkID09IHRhc2tJZCkge1xuICAgICAgcmV0dXJuIHRhc2s7XG4gICAgfVxuICB9XG59XG5cbiIsImltcG9ydCAnLi9pbmRleC5jc3MnO1xuaW1wb3J0IGNyZWF0ZVByb2plY3RPYmplY3QgZnJvbSAnLi9wcm9qZWN0JztcbmltcG9ydCAnLi9kb20nO1xuaW1wb3J0IHsgZGlzcGxheU5vdGV9IGZyb20gJy4vY3JlYXRlTm90ZSc7XG5cbmV4cG9ydCBjb25zdCBwcm9qZWN0ID0gY3JlYXRlUHJvamVjdE9iamVjdCgpO1xuXG5pZihsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvamVjdCcpKXtcbiAgcHJvamVjdC50b0RvID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvamVjdCcpKTtcbiAgZm9yKGNvbnN0IHRvZG8gaW4gcHJvamVjdC50b0RvKXtcbiAgICBjb25zdCBub3RlID0gcHJvamVjdC50b0RvW3RvZG9dO1xuICAgIGRpc3BsYXlOb3RlKG5vdGUudGl0bGUsIG5vdGUuZGVzY3JpcHRpb24sIG5vdGUuZHVlRGF0ZSwgbm90ZS5wcmlvcml0eSwgcGFyc2VJbnQodG9kbykgKyAxKTtcbiAgfVxufVxuXG4vLyBwcm9qZWN0LnNldEl0ZW0oJ01vdmllIE5pZ2h0JywgJ0JpZyBEYXknLCAnMjAyNC0wNS0xMCcsICcxJywgJzEnKTtcbi8vIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9qZWN0JywgcHJvamVjdC50b0pTT04oKSk7IFxuIiwiaW1wb3J0IHsgZGlmZmVyZW5jZUluRGF5cywgcGFyc2VJU08gfSBmcm9tIFwiZGF0ZS1mbnNcIjtcblxuZnVuY3Rpb24gY3JlYXRlUHJvamVjdE9iamVjdCgpe1xuICByZXR1cm4ge1xuICAgIHRvRG86IFtdLFxuICAgIHNldEl0ZW0gOiBmdW5jdGlvbiAodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWUsIHByaW9yaXR5KXtcbiAgICAgIC8vIGR1ZSA9IGRpZmZlcmVuY2VJbkRheXMocGFyc2VJU08oZHVlKSwgbmV3IERhdGUoKSk7XG4gICAgICB0aGlzLnRvRG8ucHVzaCh7IFxuICAgICAgICBpZDogdGhpcy50b0RvLmxlbmd0aCArIDEsXG4gICAgICAgIHRpdGxlLFxuICAgICAgICBkZXNjcmlwdGlvbixcbiAgICAgICAgZHVlLFxuICAgICAgICBwcmlvcml0eVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gdGhpcy50b0RvLmxlbmd0aDtcbiAgICB9LFxuICAgIGdldEl0ZW06IGZ1bmN0aW9uKGluZGV4KXtcbiAgICAgIGlmIChpbmRleCA+PSAwICYmIGluZGV4IDwgdGhpcy50b0RvLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gdGhpcy50b0RvW2luZGV4XTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBudWxsOyBcbiAgICAgIH1cbiAgICB9LFxuICAgIHJlbW92ZUl0ZW06IGZ1bmN0aW9uKGluZGV4KXtcbiAgICAgIGlmIChpbmRleCA+PSAwICYmIGluZGV4IDwgdGhpcy50b0RvLmxlbmd0aCkge1xuICAgICAgICB0aGlzLnRvRG8uc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2plY3QnLCB0aGlzLnRvSlNPTigpKTsgXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMudG9Ebyk7XG4gICAgICB9XG4gICAgfSxcbiAgICB1cGRhdGVJdGVtOiBmdW5jdGlvbihpZCwgZmllbGQsIHZhbHVlKXtcbiAgICAgIHRoaXMuZ2V0SXRlbShpZClbZmllbGRdID0gdmFsdWU7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJvamVjdCcsIHRoaXMudG9KU09OKCkpOyBcbiAgICB9LFxuICAgIHRvSlNPTjogZnVuY3Rpb24oKSB7O1xuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMudG9Ebyk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVByb2plY3RPYmplY3Q7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9