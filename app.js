//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

const taskInput = document.getElementById('new-task'); //Add a new task.
const addButton = document.querySelector('.add-task-form__button');
const incompleteTaskList = document.getElementById('incomplete-tasks'); //ul of #incompleteTasks
const completedTaskList = document.getElementById('completed-tasks'); //completed-tasks

const createElement = function (tag, className, text) {
  const element = document.createElement(tag);

  element.className = className;

  if (text) {
    element.textContent = text;
  }

  return element;
};

//New task list item
const createTaskElement = function (taskText) {
  const listItem = createElement('li', 'task-item');

  //input (checkbox)
  const checkbox = createElement('input', 'task-item__checkbox'); //checkbx
  //label
  const taskLabel = createElement('label', 'task-item__label', taskText); //label
  //input (text)
  const editInput = createElement('input', 'task-item__input'); //text
  //button.edit
  const editButton = createElement('button', 'button task-item__button task-item__button--edit', 'Edit'); //edit button

  //button.delete
  const deleteButton = createElement('button', 'button task-item__button task-item__button--delete'); //delete button
  const deleteIcon = createElement('img', 'task-item__icon'); //delete button image

  //Each elements, needs appending
  checkbox.type = 'checkbox';
  editInput.type = 'text';

  editButton.setAttribute('type', 'button');
  deleteIcon.src = './remove.svg';
  deleteButton.setAttribute('type', 'button');
  deleteButton.appendChild(deleteIcon);

  //and appending.
  listItem.appendChild(checkbox);
  listItem.appendChild(taskLabel);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

const addTask = function () {
  //Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;
  const listItem = createTaskElement(taskInput.value);

  //Append listItem to incompleteTaskHolder
  incompleteTaskList.appendChild(listItem);
  bindTaskEvents(listItem, moveToCompleted);

  taskInput.value = '';
};

//Edit an existing task.

const editTask = function () {
  const listItem = this.parentNode;

  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector('label');
  const editButton = listItem.querySelector('.task-item__button--edit');
  const isEditMode = listItem.classList.contains('task-item--edit-mode');
  //If class of the parent is .editmode
  if (isEditMode) {
    //switch to .editmode
    //label becomes the inputs value.
    label.innerText = editInput.value;
    editButton.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editButton.innerText = 'Save';
  }

  //toggle .editmode on the parent.
  listItem.classList.toggle('task-item--edit-mode');
};

//Delete task.
const deleteTask = function () {
  const listItem = this.parentNode;
  const parentList = listItem.parentNode;
  //Remove the parent list item from the ul.
  parentList.removeChild(listItem);
};

//Mark task completed
const moveToCompleted = function () {
  //Append the task list item to the #completed-tasks
  const listItem = this.parentNode;
  completedTaskList.appendChild(listItem);
  bindTaskEvents(listItem, moveToIncomplete);
};

const moveToIncomplete = function () {
  //Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incompleteTasks.
  const listItem = this.parentNode;
  incompleteTaskList.appendChild(listItem);
  bindTaskEvents(listItem, moveToCompleted);
};

//The glue to hold it all together.

//Set the click handler to the addTask function.
addButton.addEventListener('click', addTask);

const bindTaskEvents = function (taskListItem, onCheckboxChange) {
  //select ListItems children
  const checkbox = taskListItem.querySelector('input[type=checkbox]');
  const editButton = taskListItem.querySelector('.task-item__button--edit');
  const deleteButton = taskListItem.querySelector('.task-item__button--delete');

  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkbox.onchange = onCheckboxChange;
};

const bindItemsEvents = function (items, taskStatus) {
  for (let i = 0; i < items.length; i++) {
    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(items[i], taskStatus);
  }
};

//cycle over incompleteTaskHolder ul list items
//for each list item
//bind events to list items chldren(tasksCompleted)
bindItemsEvents(incompleteTaskList.children, moveToCompleted);
//cycle over completedTasksHolder ul list items
//bind events to list items chldren(tasksIncompleted)
bindItemsEvents(completedTaskList.children, moveToIncomplete);

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.
