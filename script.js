const form = document.querySelector('.todo-form');
const input = document.querySelector('.todo-form__input');
const list = document.querySelector('.todo-list');
const counter = document.querySelector('.todo-app__counter');
const filterButtons = document.querySelectorAll('.filter-button');
const themeToggle = document.querySelector('#theme-toggle');
const themeLabel = document.querySelector('.theme-switch__label');
const root = document.documentElement;

const THEME_STORAGE_KEY = 'shopping-list-theme';
let currentFilter = 'all';

function applyTheme(theme) {
  const isLight = theme === 'light';

  root.setAttribute('data-theme', isLight ? 'light' : 'dark');
  themeToggle.checked = isLight;
  themeLabel.textContent = isLight ? 'Light' : 'Dark';
}

function initializeTheme() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  applyTheme(savedTheme === 'light' ? 'light' : 'dark');
}

function updateCounter() {
  const totalTasks = list.querySelectorAll('.todo-item').length;
  const pendingTasks = list.querySelectorAll('.todo-item:not(.completed)').length;

  counter.textContent = `${pendingTasks} item${pendingTasks === 1 ? '' : 'ns'} pendente${pendingTasks === 1 ? '' : 's'} / ${totalTasks} no total`;
}

function applyFilter() {
  const items = list.querySelectorAll('.todo-item');

  items.forEach((item) => {
    const isCompleted = item.classList.contains('completed');
    const shouldShow =
      currentFilter === 'all' ||
      (currentFilter === 'completed' && isCompleted) ||
      (currentFilter === 'pending' && !isCompleted);

    item.hidden = !shouldShow;
  });
}

function setFilter(filter) {
  currentFilter = filter;

  filterButtons.forEach((button) => {
    button.classList.toggle('is-active', button.dataset.filter === filter);
  });

  applyFilter();
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
  applyFilter();
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
    applyFilter();
  }

  if (button.classList.contains('button--danger')) {
    taskItem.remove();
    updateCounter();
    applyFilter();
  }
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    setFilter(button.dataset.filter);
  });
});

themeToggle.addEventListener('change', () => {
  const theme = themeToggle.checked ? 'light' : 'dark';
  applyTheme(theme);
  localStorage.setItem(THEME_STORAGE_KEY, theme);
});

initializeTheme();
updateCounter();
setFilter('all');