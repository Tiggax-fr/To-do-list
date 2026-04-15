const form = document.querySelector('.todo-form');
const input = document.querySelector('.todo-form__input');
const list = document.querySelector('.todo-list');
const counter = document.querySelector('.todo-app__counter');

function updateCounter() {
  const totalTasks = list.querySelectorAll('.todo-item').length;
  const pendingTasks = list.querySelectorAll('.todo-item:not(.completed)').length;

  counter.textContent = `${pendingTasks} tarefa${pendingTasks === 1 ? '' : 's'} pendente${pendingTasks === 1 ? '' : 's'} / ${totalTasks} total`;
}

function createTaskItem(taskText) {
  const li = document.createElement('li');
  li.className = 'todo-item';

  const text = document.createElement('p');
  text.className = 'todo-item__text';
  text.textContent = taskText;

  const actions = document.createElement('div');
  actions.className = 'todo-item__actions';

  const completeButton = document.createElement('button');
  completeButton.className = 'button button--success';
  completeButton.type = 'button';
  completeButton.textContent = 'Concluir';

  const deleteButton = document.createElement('button');
  deleteButton.className = 'button button--danger';
  deleteButton.type = 'button';
  deleteButton.textContent = 'Deletar';

  actions.append(completeButton, deleteButton);
  li.append(text, actions);

  return li;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const taskText = input.value.trim();

  if (!taskText) {
    input.focus();
    return;
  }

  const newTask = createTaskItem(taskText);
  list.prepend(newTask);
  input.value = '';
  input.focus();
  updateCounter();
});

list.addEventListener('click', (event) => {
  const button = event.target.closest('button');

  if (!button) {
    return;
  }

  const taskItem = button.closest('.todo-item');

  if (button.classList.contains('button--success')) {
    taskItem.classList.toggle('completed');
    updateCounter();
  }

  if (button.classList.contains('button--danger')) {
    taskItem.remove();
    updateCounter();
  }
});

updateCounter();