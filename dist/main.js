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
  (0,_createNote__WEBPACK_IMPORTED_MODULE_0__.createNote)(formData.get("title"), formData.get("description"), formData.get("dueDate"), formData.get("priority"));
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
/* harmony import */ var _expandContent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./expandContent */ "./src/expandContent.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index */ "./src/index.js");




const noteContainer = document.querySelector('.note-container');

function createNote(title, description, dueDate, priority) {
  const noteId = _index__WEBPACK_IMPORTED_MODULE_2__.project.setItem(title, description, dueDate, priority);
  localStorage.setItem('project', _index__WEBPACK_IMPORTED_MODULE_2__.project.toJSON()); 
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
  newNote.querySelector('.expand-more').addEventListener('click', _expandContent__WEBPACK_IMPORTED_MODULE_1__.expandNote);
  console.log(_expandContent__WEBPACK_IMPORTED_MODULE_1__.expandNote);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsbUJBQW1CIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9pbmRleC5jc3M/OWZhYyIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL2FkZE5vdGUuanMiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9jcmVhdGVOb3RlLmpzIiwid2VicGFjazovL3RvZG8vLi9zcmMvZG9tLmpzIiwid2VicGFjazovL3RvZG8vLi9zcmMvZWRpdEJ0bi5qcyIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL2V4cGFuZENvbnRlbnQuanMiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL3Byb2plY3QuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiaW1wb3J0IHsgY3JlYXRlTm90ZSB9IGZyb20gJy4vY3JlYXRlTm90ZSc7XG5cbmNvbnN0IG9wZW5EaWFsb2dCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3BlbkRpYWxvZycpO1xuY29uc3QgY2xvc2VEaWFsb2dCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xvc2VEaWFsb2cnKTtcbmNvbnN0IHRhc2tEaWFsb2cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFza0RpYWxvZycpO1xuY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Zvcm0nKTtcblxuZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBmdW5jdGlvbihldmVudCkge1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSh0aGlzKTtcbiAgY3JlYXRlTm90ZShmb3JtRGF0YS5nZXQoXCJ0aXRsZVwiKSwgZm9ybURhdGEuZ2V0KFwiZGVzY3JpcHRpb25cIiksIGZvcm1EYXRhLmdldChcImR1ZURhdGVcIiksIGZvcm1EYXRhLmdldChcInByaW9yaXR5XCIpKTtcbiAgdGhpcy5yZXNldCgpO1xuICBhbGVydCgnVGhlIGZvcm0gd2FzIHN1Ym1pdHRlZCEnKTtcbiAgdGFza0RpYWxvZy5jbG9zZSgpO1xufSk7XG5cbm9wZW5EaWFsb2dCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIHRhc2tEaWFsb2cuc2hvd01vZGFsKCk7XG59KTtcblxuY2xvc2VEaWFsb2dCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIHRhc2tEaWFsb2cuY2xvc2UoKTtcbn0pO1xuXG4iLCJpbXBvcnQgeyByZW1vdmVOb3RlIH0gZnJvbSAnLi9kb20nO1xuaW1wb3J0IHsgZXhwYW5kTm90ZSB9IGZyb20gJy4vZXhwYW5kQ29udGVudCc7XG5pbXBvcnQgeyBwcm9qZWN0IH0gZnJvbSAnLi9pbmRleCc7XG5cbmNvbnN0IG5vdGVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubm90ZS1jb250YWluZXInKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU5vdGUodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSkge1xuICBjb25zdCBub3RlSWQgPSBwcm9qZWN0LnNldEl0ZW0odGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSk7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9qZWN0JywgcHJvamVjdC50b0pTT04oKSk7IFxuICBkaXNwbGF5Tm90ZSh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBub3RlSWQpXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZGlzcGxheU5vdGUodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgbm90ZUlkKSB7XG4gIGNvbnN0IG5ld05vdGUgPSBub3RlQ29udGFpbmVyLmNsb25lTm9kZSh0cnVlKTtcbiAgbmV3Tm90ZS5kYXRhc2V0LnRhc2tJZCA9IG5vdGVJZDtcbiAgXG4gIGNvbnN0IGhlYWRlckNsYXNzID0gbmV3Tm90ZS5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyJykuY2xhc3NMaXN0O1xuICBuZXdOb3RlLnF1ZXJ5U2VsZWN0b3IoJyNjaGVjaycpLmlkID0gYGNoZWNrJHtub3RlSWR9YDtcbiAgbmV3Tm90ZS5xdWVyeVNlbGVjdG9yKCcubGFiZWwnKS5odG1sRm9yID0gYGNoZWNrJHtub3RlSWR9YDtcbiAgbmV3Tm90ZS5xdWVyeVNlbGVjdG9yKCcuZGVsZXRlJykuaWQgPSBgZGVsZXRlJHtub3RlSWR9YDtcbiAgbmV3Tm90ZS5xdWVyeVNlbGVjdG9yKCcubGFiZWwnKS50ZXh0Q29udGVudCA9IHRpdGxlO1xuICBcbiAgXG4gIGhlYWRlckNsYXNzLmFkZChnZXRMYWJlbENvbG9yKHByaW9yaXR5KSk7XG4gIG5ld05vdGUucXVlcnlTZWxlY3RvcignLmV4cGFuZC1tb3JlJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBleHBhbmROb3RlKTtcbiAgY29uc29sZS5sb2coZXhwYW5kTm90ZSk7XG4gIG5ld05vdGUucXVlcnlTZWxlY3RvcignLmRlbGV0ZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcmVtb3ZlTm90ZSk7XG4gIFxuICBuZXdOb3RlLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbm90ZXMtY29udGFpbmVyJykuYXBwZW5kQ2hpbGQobmV3Tm90ZSk7XG59XG5cbmZ1bmN0aW9uIGdldExhYmVsQ29sb3IocHJpb3JpdHkpe1xuICBzd2l0Y2gocHJpb3JpdHkpe1xuICAgIGNhc2UgJzEnOiByZXR1cm4gJ2JvcmRlci1sLXJlZC02MDAnO1xuICAgIGNhc2UgJzInOiByZXR1cm4gJ2JvcmRlci1sLXllbGxvdy02MDAnO1xuICAgIGNhc2UgJzMnOiByZXR1cm4gJ2JvcmRlci1sLWdyZWVuLTYwMCc7XG4gIH1cbn1cbiIsIlxuaW1wb3J0IHsgcHJvamVjdCB9IGZyb20gJy4nO1xuaW1wb3J0ICcuL2FkZE5vdGUnO1xuaW1wb3J0IHsgZXhwYW5kTm90ZSB9IGZyb20gJy4vZXhwYW5kQ29udGVudCc7XG5cbnZhciBtb2RlYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGVidG4nKTtcbnZhciBtb2RlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGUnKTtcbnZhciBkZWxldGVOb3RlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZGVsZXRlJyk7XG5cbkFycmF5LmZyb20oZGVsZXRlTm90ZSkuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJlbW92ZU5vdGUpO1xufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVOb3RlKGV2ZW50KSB7XG4gIGNvbnNvbGUubG9nKGV2ZW50LnRhcmdldC5pZCk7XG4gIGNvbnN0IG5vdGUgPSB0aGlzLnBhcmVudE5vZGUucGFyZW50Tm9kZTtcbiAgY29uc3Qgbm90ZUlEID0gbm90ZS5kYXRhc2V0LnRhc2tJZCAtIDE7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdub3Rlcy1jb250YWluZXInKS5yZW1vdmVDaGlsZChub3RlKTtcbiAgcHJvamVjdC5yZW1vdmVJdGVtKG5vdGVJRCk7XG59XG5cbm1vZGVidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+e1xuICBpZighKG1vZGVidG4uY2xhc3NMaXN0LmNvbnRhaW5zKCdkYXJrJykpKXtcbiAgICBtb2RlYnRuLnRleHRDb250ZW50PSBcImRhcmtfbW9kZVwiO1xuICAgIG1vZGVidG4uY2xhc3NMaXN0LmFkZCgnZGFyaycpO1xuICAgIG1vZGUuY2xhc3NMaXN0LmFkZCgnZGFyaycpO1xuICB9XG4gIGVsc2V7XG4gICAgbW9kZWJ0bi50ZXh0Q29udGVudD0gXCJsaWdodF9tb2RlXCI7XG4gICAgbW9kZWJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdkYXJrJyk7XG4gICAgbW9kZS5jbGFzc0xpc3QucmVtb3ZlKCdkYXJrJyk7XG4gIH1cbn0pXG5cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKSB7XG4gIGNvbnN0IGV4cGFuZEljb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5leHBhbmQtbW9yZVwiKTtcblxuICBleHBhbmRJY29ucy5mb3JFYWNoKGljb24gPT4ge1xuICAgIGljb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGV4cGFuZE5vdGUpO1xuICB9KTtcbn0pOyIsImltcG9ydCB7IHByb2plY3QgfSBmcm9tIFwiLlwiO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRWRpdEJ0bigpIHtcbiAgY29uc3QgZWRpdEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgY29uc3QgZWRpdEJ0bkRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gIGVkaXRCdG4uaWQgPSBcImVkaXRCdG5cIjtcbiAgZWRpdEJ0bi50ZXh0Q29udGVudCA9ICdlZGl0JztcbiAgZWRpdEJ0bi5jbGFzc0xpc3QuYWRkKFxuICAgICdtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkJyxcbiAgICAnbXItNCcsXG4gICAgJ2JvcmRlcicsXG4gICAgJ3AtMicsXG4gICAgJ3JvdW5kZWQtbWQnLFxuICAgICdjdXJzb3ItcG9pbnRlcidcbiAgKTtcbiAgZWRpdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZUVkaXRCdG4pO1xuICBlZGl0QnRuRGl2LmNsYXNzTGlzdC5hZGQoXG4gICAgJ2JvcmRlci1ub25lJyxcbiAgICAnZmxleCcsXG4gICAgJ2p1c3RpZnktZW5kJyxcbiAgICAnaXRlbXMtc3RhcnQnXG4gICk7XG4gIGVkaXRCdG5EaXYuYXBwZW5kQ2hpbGQoZWRpdEJ0bik7XG5cbiAgcmV0dXJuIGVkaXRCdG5EaXY7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZUVkaXRCdG4oZXZlbnQpIHtcbiAgY29uc3QgY29udGVudERpdiA9IGV2ZW50LnRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gIGNvbnN0IGlucHV0RmllbGRzID0gY29udGVudERpdi5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dCcpO1xuICBpbnB1dEZpZWxkcy5mb3JFYWNoKGlucHV0ID0+IHtcbiAgICBtYWtlRWRpdGFibGUoaW5wdXQpO1xuICB9KVxuICBcbiAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZUNsaWNrKTtcbn1cblxuZnVuY3Rpb24gbWFrZUVkaXRhYmxlKGlucHV0RmllbGQpIHtcbiAgaWYgKGlucHV0RmllbGQpIHtcbiAgICBpbnB1dEZpZWxkLnJlbW92ZUF0dHJpYnV0ZSgncmVhZG9ubHknKTtcbiAgfVxuICBpbnB1dEZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgaGFuZGxlSW5wdXRDaGFuZ2UpO1xufVxuXG5mdW5jdGlvbiBtYWtlUmVhZG9ubHkoaW5wdXQpIHtcbiAgaW5wdXQuc2V0QXR0cmlidXRlKCdyZWFkb25seScsICd0cnVlJyk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZUlucHV0Q2hhbmdlKGV2ZW50KSB7XG4gIGNvbnN0IG5vdGVEaXZJRCA9IGV2ZW50LnRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5kYXRhc2V0LnRhc2tJZDtcbiAgY29uc3QgaWQgPSBwYXJzZUludChub3RlRGl2SUQpIC0gMTtcbiAgY29uc3QgZmllbGQgPSBgJHtldmVudC50YXJnZXQuaWR9YC5zbGljZSgwLCAtMSk7XG4gIGNvbnN0IHZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuXG4gIHByb2plY3QudXBkYXRlSXRlbShpZCwgZmllbGQsIHZhbHVlKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlQ2xpY2soZXZlbnQpIHtcbiAgY29uc3QgaW5wdXRGaWVsZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY29udGVudD5kaXY+aW5wdXQnKTtcbiAgY29uc3QgY2xpY2tlZE9uRWRpdEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlZGl0QnRuJykuY29udGFpbnMoZXZlbnQudGFyZ2V0KTtcblxuICBjb25zdCBjbGlja2VkSW5zaWRlSW5wdXQgPSBBcnJheS5mcm9tKGlucHV0RmllbGRzKS5zb21lKChpbnB1dCkgPT5cbiAgICBpbnB1dC5jb250YWlucyhldmVudC50YXJnZXQpXG4gICk7XG4gIGlmICghY2xpY2tlZEluc2lkZUlucHV0ICYmICFjbGlja2VkT25FZGl0QnV0dG9uKSB7XG4gICAgaW5wdXRGaWVsZHMuZm9yRWFjaCgoaW5wdXQpID0+IG1ha2VSZWFkb25seShpbnB1dCkpO1xuICAgIC8vIFJlbW92ZSB0aGUgZXZlbnQgbGlzdGVuZXIgYWZ0ZXIgbWFraW5nIGlucHV0IGZpZWxkcyByZWFkb25seVxuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVDbGljayk7XG4gIH1cbn0iLCJpbXBvcnQgeyBjcmVhdGVFZGl0QnRuIH0gZnJvbSAnLi9lZGl0QnRuJztcbmltcG9ydCB7IHByb2plY3QgfSBmcm9tICcuL2luZGV4JztcblxuZXhwb3J0IGZ1bmN0aW9uIGV4cGFuZE5vdGUoKSB7XG4gIGNvbnN0IG5vdGUgPSB0aGlzLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgY29uc3QgdGFza0lkID0gbm90ZS5kYXRhc2V0LnRhc2tJZDtcbiAgY29uc3QgdGFzayA9IGdldFRhc2tCeUlkKHRhc2tJZCk7XG4gIGlmICh0YXNrKSB7XG4gICAgZXhwYW5kTm90ZVV0aWwodGFzaywgbm90ZSk7XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS5sb2coJ1Rhc2sgbm90IGZvdW5kJyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZXhwYW5kTm90ZVV0aWwodGFzaywgbm90ZSkge1xuICBpZiAobm90ZS5jbGFzc0xpc3QuY29udGFpbnMoJ2V4cGFuZGVkJykpIHtcbiAgICBjb25zdCBjb250ZW50RGl2ID0gbm90ZS5xdWVyeVNlbGVjdG9yKCcuY29udGVudCcpO1xuICAgIGNvbnRlbnREaXYuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgbm90ZS5jbGFzc0xpc3QucmVtb3ZlKCdleHBhbmRlZCcpO1xuICAgIHdoaWxlIChjb250ZW50RGl2LmZpcnN0Q2hpbGQpIHtcbiAgICAgIGNvbnRlbnREaXYucmVtb3ZlQ2hpbGQoY29udGVudERpdi5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3Qgbm90ZUV4cGFuZCA9IGNyZWF0ZUV4cGFuZENvbnRhaW5lcih0YXNrLCBub3RlKTtcbiAgY29uc3QgY29udGVudERpdiA9IG5vdGUucXVlcnlTZWxlY3RvcignLmNvbnRlbnQnKTtcbiAgY29udGVudERpdi5hcHBlbmRDaGlsZChub3RlRXhwYW5kKTtcbiAgbm90ZS5jbGFzc0xpc3QuYWRkKCdleHBhbmRlZCcpO1xuICBjb250ZW50RGl2LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVFeHBhbmRDb250YWluZXIodGFzaywgbm90ZSkge1xuICBjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblxuICBsZXQgY291bnQgPSAwO1xuICBmb3IgKGxldCB0YXNrRGF0YSBpbiB0YXNrKSB7XG4gICAgaWYgKGNvdW50ID09PSAxKSB7XG4gICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChjcmVhdGVFZGl0QnRuKCkpO1xuICAgIH1cblxuICAgIGNvbnN0IGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICBjb25zdCBub3RlSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgY29uc3Qgbm90ZUl0ZW1EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIG5vdGVJdGVtLnNldEF0dHJpYnV0ZSgncmVhZG9ubHknLCAndHJ1ZScpO1xuICAgIG5vdGVJdGVtLmlkID0gYCR7dGFza0RhdGF9JHtub3RlLmRhdGFzZXQudGFza0lkfWA7XG4gICAgbGFiZWwudGV4dENvbnRlbnQgPSB0YXNrRGF0YTtcbiAgICBsYWJlbC5odG1sRm9yID0gYCR7dGFza0RhdGF9JHtub3RlLmRhdGFzZXQudGFza0lkfWA7XG4gICAgbm90ZUl0ZW0udmFsdWUgPSB0YXNrW3Rhc2tEYXRhXTtcblxuICAgIG5vdGVJdGVtLmNsYXNzTGlzdC5hZGQoJ2JnLXNsYXRlLTcwMCcsICdwLTInKTtcbiAgICBub3RlSXRlbURpdi5jbGFzc0xpc3QuYWRkKCdmbGV4JywgJ2p1c3RpZnktY2VudGVyJywgJ2ZsZXgtY29sJywgJ2dhcC0yJyk7XG4gICAgbm90ZUl0ZW1EaXYuYXBwZW5kQ2hpbGQobGFiZWwpO1xuICAgIG5vdGVJdGVtRGl2LmFwcGVuZENoaWxkKG5vdGVJdGVtKTtcbiAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChub3RlSXRlbURpdik7XG5cbiAgICBjb3VudCsrO1xuICB9XG4gIHJldHVybiBmcmFnbWVudDtcbn1cblxuZnVuY3Rpb24gZ2V0VGFza0J5SWQodGFza0lkKSB7XG4gIGZvciAobGV0IHRhc2tLZXkgaW4gcHJvamVjdC50b0RvKSB7XG4gICAgbGV0IHRhc2sgPSBwcm9qZWN0LnRvRG9bdGFza0tleV07XG4gICAgaWYgKHRhc2suaWQgPT0gdGFza0lkKSB7XG4gICAgICByZXR1cm4gdGFzaztcbiAgICB9XG4gIH1cbn1cblxuIiwiaW1wb3J0ICcuL2luZGV4LmNzcyc7XG5pbXBvcnQgY3JlYXRlUHJvamVjdE9iamVjdCBmcm9tICcuL3Byb2plY3QnO1xuaW1wb3J0ICcuL2RvbSc7XG5pbXBvcnQgeyBkaXNwbGF5Tm90ZX0gZnJvbSAnLi9jcmVhdGVOb3RlJztcblxuZXhwb3J0IGNvbnN0IHByb2plY3QgPSBjcmVhdGVQcm9qZWN0T2JqZWN0KCk7XG5cbmlmKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9qZWN0Jykpe1xuICBwcm9qZWN0LnRvRG8gPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9qZWN0JykpO1xuICBmb3IoY29uc3QgdG9kbyBpbiBwcm9qZWN0LnRvRG8pe1xuICAgIGNvbnN0IG5vdGUgPSBwcm9qZWN0LnRvRG9bdG9kb107XG4gICAgZGlzcGxheU5vdGUobm90ZS50aXRsZSwgbm90ZS5kZXNjcmlwdGlvbiwgbm90ZS5kdWVEYXRlLCBub3RlLnByaW9yaXR5LCBwYXJzZUludCh0b2RvKSArIDEpO1xuICB9XG59XG5cbi8vIHByb2plY3Quc2V0SXRlbSgnTW92aWUgTmlnaHQnLCAnQmlnIERheScsICcyMDI0LTA1LTEwJywgJzEnLCAnMScpO1xuLy8gbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2plY3QnLCBwcm9qZWN0LnRvSlNPTigpKTsgXG4iLCJpbXBvcnQgeyBkaWZmZXJlbmNlSW5EYXlzLCBwYXJzZUlTTyB9IGZyb20gXCJkYXRlLWZuc1wiO1xuXG5mdW5jdGlvbiBjcmVhdGVQcm9qZWN0T2JqZWN0KCl7XG4gIHJldHVybiB7XG4gICAgdG9EbzogW10sXG4gICAgc2V0SXRlbSA6IGZ1bmN0aW9uICh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZSwgcHJpb3JpdHkpe1xuICAgICAgLy8gZHVlID0gZGlmZmVyZW5jZUluRGF5cyhwYXJzZUlTTyhkdWUpLCBuZXcgRGF0ZSgpKTtcbiAgICAgIHRoaXMudG9Eby5wdXNoKHsgXG4gICAgICAgIGlkOiB0aGlzLnRvRG8ubGVuZ3RoICsgMSxcbiAgICAgICAgdGl0bGUsXG4gICAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgICBkdWUsXG4gICAgICAgIHByaW9yaXR5XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0aGlzLnRvRG8ubGVuZ3RoO1xuICAgIH0sXG4gICAgZ2V0SXRlbTogZnVuY3Rpb24oaW5kZXgpe1xuICAgICAgaWYgKGluZGV4ID49IDAgJiYgaW5kZXggPCB0aGlzLnRvRG8ubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRvRG9baW5kZXhdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG51bGw7IFxuICAgICAgfVxuICAgIH0sXG4gICAgcmVtb3ZlSXRlbTogZnVuY3Rpb24oaW5kZXgpe1xuICAgICAgaWYgKGluZGV4ID49IDAgJiYgaW5kZXggPCB0aGlzLnRvRG8ubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMudG9Eby5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJvamVjdCcsIHRoaXMudG9KU09OKCkpOyBcbiAgICAgICAgY29uc29sZS5sb2codGhpcy50b0RvKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHVwZGF0ZUl0ZW06IGZ1bmN0aW9uKGlkLCBmaWVsZCwgdmFsdWUpe1xuICAgICAgdGhpcy5nZXRJdGVtKGlkKVtmaWVsZF0gPSB2YWx1ZTtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9qZWN0JywgdGhpcy50b0pTT04oKSk7IFxuICAgIH0sXG4gICAgdG9KU09OOiBmdW5jdGlvbigpIHs7XG4gICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy50b0RvKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlUHJvamVjdE9iamVjdDsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=