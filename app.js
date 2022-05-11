const addForm = document.querySelector('.add-todo');
const todo = document.getElementById('new-todo');
const list = document.querySelector('.list-group');
const search = document.querySelector('.search input');

// Generate html template for todo
const generateTemplate = todo => {
  const html = `
  <li class="list-item">
  <span>${todo}</span>
  <i class="fa-solid fa-trash-can delete"></i>
  </li>`;

  list.innerHTML += html;
}

// Add a new todo
addForm.addEventListener('submit', e => {
  e.preventDefault();

  if (todo.value.length) {
    generateTemplate(todo.value.toLowerCase().trim());

// Save new todo in the local storage
    saveLocalTodos(todo.value.toLowerCase().trim());
    addForm.reset();
  }
});

// Save todos in the local storage
const saveLocalTodos = todo => {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Get todos and populate them on the browser
document.addEventListener('DOMContentLoaded', () => {
  let todos = [];
  if (localStorage.getItem('todos')) {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.forEach(todo => {
    generateTemplate(todo);
  });
});


// Delete a todo
list.addEventListener('click', e => {
  e.preventDefault();

// Check if the classlist of the element we clicked contains delete
  if (e.target.classList.contains('delete')) {  
    e.target.parentElement.remove();
    removeLocalTodos(e.target.parentElement);
  }
});

// Remove a todo in the local storage
const removeLocalTodos = todo => {
  let todos = [];
  if (localStorage.getItem('todos')) {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
 
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));

}

// Search a todo
const filterTodos = term => {

// Filter through todos and hide todo that does not include term
  Array.from(list.children)
    .filter(todo => !todo.textContent.includes(term))
    .forEach(todo => todo.classList.add('filtered'));
  Array.from(list.children)
    .filter(todo => todo.textContent.includes(term))
    .forEach(todo => todo.classList.remove('filtered'));
};

// Keyup event
search.addEventListener('keyup', () => {

// Get whatever the user types in at the moment in time
  const term = search.value.toLowerCase().trim();
  filterTodos(term);
});











