//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

const taskInput = document.getElementById('new-task');
const addButton = document.querySelector('.add-task-form__button');
const incompleteTaskList = document.getElementById('incomplete-tasks');
const completedTaskList = document.getElementById('completed-tasks');

const createElement = function (tag, className, text) {
  const element = document.createElement(tag);

  element.className = className;

  if (text) {
    element.textContent = text;
  }

  return element;
};

const createTaskElement = function (taskText) {
  const listItem = createElement('li', 'task-item');

  const checkbox = createElement('input', 'task-item__checkbox');
  const taskLabel = createElement('label', 'task-item__label', taskText);
  const editInput = createElement('input', 'task-item__input');
  const editButton = createElement('button', 'button task-item__button task-item__button--edit', 'Edit');
  const deleteButton = createElement('button', 'button task-item__button task-item__button--delete');
  const deleteIcon = createElement('img', 'task-item__icon');

  checkbox.type = 'checkbox';
  editInput.type = 'text';

  editButton.setAttribute('type', 'button');
  deleteIcon.src = './remove.svg';
  deleteButton.setAttribute('type', 'button');
  deleteButton.appendChild(deleteIcon);

  listItem.appendChild(checkbox);
  listItem.appendChild(taskLabel);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

const addTask = function () {
  if (!taskInput.value) return;
  const listItem = createTaskElement(taskInput.value);

  incompleteTaskList.appendChild(listItem);
  bindTaskEvents(listItem, moveToCompleted);

  taskInput.value = '';
};

const editTask = function () {
  const listItem = this.parentNode;

  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector('label');
  const editButton = listItem.querySelector('.task-item__button--edit');
  const isEditMode = listItem.classList.contains('task-item--edit-mode');

  if (isEditMode) {
    label.innerText = editInput.value;
    editButton.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editButton.innerText = 'Save';
  }

  listItem.classList.toggle('task-item--edit-mode');
};

const deleteTask = function () {
  const listItem = this.parentNode;
  const parentList = listItem.parentNode;

  parentList.removeChild(listItem);
};

const moveToCompleted = function () {
  const listItem = this.parentNode;
  completedTaskList.appendChild(listItem);
  bindTaskEvents(listItem, moveToIncomplete);
};

const moveToIncomplete = function () {
  const listItem = this.parentNode;
  incompleteTaskList.appendChild(listItem);
  bindTaskEvents(listItem, moveToCompleted);
};

addButton.addEventListener('click', addTask);

const bindTaskEvents = function (taskListItem, onCheckboxChange) {
  const checkbox = taskListItem.querySelector('input[type=checkbox]');
  const editButton = taskListItem.querySelector('.task-item__button--edit');
  const deleteButton = taskListItem.querySelector('.task-item__button--delete');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkbox.onchange = onCheckboxChange;
};

const bindItemsEvents = function (items, taskStatus) {
  for (let i = 0; i < items.length; i++) {
    bindTaskEvents(items[i], taskStatus);
  }
};

bindItemsEvents(incompleteTaskList.children, moveToCompleted);
bindItemsEvents(completedTaskList.children, moveToIncomplete);

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.
