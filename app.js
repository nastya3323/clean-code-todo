const taskInput = document.getElementById('new-task');
const addButton = document.querySelector('.add-task-form__button');
const incompleteTaskList = document.getElementById('incomplete-tasks');
const completedTaskList = document.getElementById('completed-tasks');

const createElement = function ({ tag, className, text, ...attributes }) {
  const element = document.createElement(tag);

  if (className) {
    element.className = className;
  }

  if (text !== null) {
    // textContent, not innerHTML: text may come from user input
    element.textContent = text;
  }

  Object.assign(element, attributes);

  return element;
};

const createTaskElement = function (taskText) {
  const listItem = createElement({ tag: 'li', className: 'task-item' });

  const checkbox = createElement({ tag: 'input', className: 'task-item__checkbox', type: 'checkbox' });
  const taskLabel = createElement({ tag: 'label', className: 'task-item__label', text: taskText });
  const editInput = createElement({ tag: 'input', className: 'task-item__input', type: 'text' });
  const editButton = createElement({
    tag: 'button',
    className: 'button task-item__button task-item__button--edit',
    text: 'Edit',
    type: 'button',
  });
  const deleteButton = createElement({
    tag: 'button',
    className: 'button task-item__button task-item__button--delete',
    type: 'button',
    'aria-label': 'Delete task',
  });
  const deleteIcon = createElement({ tag: 'img', className: 'task-item__icon', src: './remove.svg', alt: '' });

  deleteButton.appendChild(deleteIcon);

  listItem.append(checkbox, taskLabel, editInput, editButton, deleteButton);

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
