//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

const taskInput = document.getElementById('new-task'); //Add a new task.
const addButton = document.getElementsByTagName('button')[0]; //first button
const incompleteTaskHolder = document.getElementById('incomplete-tasks'); //ul of #incompleteTasks
const completedTasksHolder = document.getElementById('completed-tasks'); //completed-tasks

const createElement = function (tag, className, text) {
  const element = document.createElement(tag);

  element.className = className;

  if (text) {
    element.textContent = text;
  }

  return element;
};

//New task list item
const createNewTaskElement = function (taskString) {
  const listItem = createElement('li', 'task-item');

  //input (checkbox)
  const checkBox = createElement('input', 'task-item__checkbox'); //checkbx
  //label
  const label = createElement('label', 'task-item__label', taskString); //label
  //input (text)
  const editInput = createElement('input', 'task-item__input'); //text
  //button.edit
  const editButton = createElement('button', 'button task-item__button task-item__button--edit', 'Edit'); //edit button

  //button.delete
  const deleteButton = createElement('button', 'button task-item__button task-item__button--delete'); //delete button
  const deleteButtonImg = createElement('img', 'task-item__icon'); //delete button image

  //Each elements, needs appending
  checkBox.type = 'checkbox';
  editInput.type = 'text';

  editButton.setAttribute('type', 'button');
  deleteButtonImg.src = './remove.svg';
  deleteButton.setAttribute('type', 'button');
  deleteButton.appendChild(deleteButtonImg);

  //and appending.
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

const addTask = function () {
  //Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  //Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = '';
};

//Edit an existing task.

const editTask = function () {
  const listItem = this.parentNode;

  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector('label');
  const editBtn = listItem.querySelector('.task-item__button--edit');
  const containsClass = listItem.classList.contains('task-item--edit-mode');
  //If class of the parent is .editmode
  if (containsClass) {
    //switch to .editmode
    //label becomes the inputs value.
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }

  //toggle .editmode on the parent.
  listItem.classList.toggle('task-item--edit-mode');
};

//Delete task.
const deleteTask = function () {
  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);
};

//Mark task completed
const taskCompleted = function () {
  //Append the task list item to the #completed-tasks
  const listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

const taskIncomplete = function () {
  //Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incompleteTasks.
  const listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

//The glue to hold it all together.

//Set the click handler to the addTask function.
addButton.addEventListener('click', addTask);

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  //select ListItems children
  const checkBox = taskListItem.querySelector('input[type=checkbox]');
  const editButton = taskListItem.querySelector('.task-item__button--edit');
  const deleteButton = taskListItem.querySelector('.task-item__button--delete');

  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
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
bindItemsEvents(incompleteTaskHolder.children, taskCompleted);
//cycle over completedTasksHolder ul list items
//bind events to list items chldren(tasksIncompleted)
bindItemsEvents(completedTasksHolder.children, taskIncomplete);

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.
