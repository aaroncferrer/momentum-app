const inputForm = document.querySelector('.input-section');
const todoInput = document.querySelector('.todo-input');
const addBtn = document.querySelector('.add-btn');
const taskActions = document.querySelector('.task-actions');
const todosList = document.querySelector('.todos-list');
const deleteAllBtn = document.querySelector('.delete-all-btn');
const filterOption = document.querySelector('.filter-todo');
const savedTodos = localStorage.getItem('todos');

let todos = [];

function displayTodos(newTodoObj){
    // Create Li
    const li = document.createElement('li');
    li.id = newTodoObj.id;
    li.className = 'task-container'

    // Task
    const task = document.createElement('span');
    task.innerText = newTodoObj.text;
    li.appendChild(task);

    // Check
    const checkBtn = document.createElement('button')
    checkBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    checkBtn.classList.add('check-btn');
    li.appendChild(checkBtn);

    // Edit
    const editBtn = document.createElement('button')
    editBtn.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';
    editBtn.classList.add('edit-btn');
    li.appendChild(editBtn);

    // Delete
    const deleteBtn = document.createElement('button')
    deleteBtn.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
    deleteBtn.classList.add('delete-btn');
    li.appendChild(deleteBtn);

    // Append to UL
    todosList.appendChild(li);
    
    checkBtn.addEventListener('click', (event) => {
        const task = event.target.parentElement;
        console.log(task);
        task.classList.toggle('done');
    });
    
    editBtn.addEventListener('click', editTask);
    deleteBtn.addEventListener('click', deleteTask);
}


function editTask(event){
    const li = event.target.parentElement; 
    const task = li.children[0]; // --> targets the span element
    const input = document.createElement('input');
    input.classList.add('edit-input');
    input.value = task.innerText;
    li.replaceChild(input, task); // --> input element replaces task/span elem
    input.focus(); // --> auto redirects to the input
    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            if(input.value === ''){
                alert('Weren\'t you editing something?');
                input.value = task.innerText;
            } else {
                // Creates a new span element and sets its inner text to the value that the user entered in the input field.
                const newTask = document.createElement('span');
                newTask.innerText = input.value;
                li.replaceChild(newTask, input); // --> task replaces input element
                // Finds the index of the li we chose so we can update the array inside local storage then save.
                const todoIndex = todos.findIndex((todo) => todo.id === parseInt(li.id));
                todos[todoIndex].text = newTask.innerText;
                saveTodos();
            }
        }
    });
}

function deleteTask(event){
    const li = event.target.parentElement;
    console.log(li);
    li.classList.add('slide');
    
    li.addEventListener('transitionend', () => {
        li.remove();
        todos = todos.filter((todo) => todo.id !== parseInt(li.id));
        saveTodos();
    })
}

deleteAllBtn.addEventListener('click', deleteAllTodos);

function deleteAllTodos(event){
    const ul = event.target.parentElement.children[0];
    todos = []
    saveTodos();
    ul.innerHTML = '';
}

function handleTodoSubmit(event){
    if(todoInput.value === ''){
        event.preventDefault();
        alert('Enter a task first.')
    } else {
        event.preventDefault();
        const newTodo = todoInput.value;
        todoInput.value = '';
        const newTodoObj = {
            text: newTodo,
            id: Date.now(),
            checked: false
    };
        todos.push(newTodoObj);
        displayTodos(newTodoObj);
        saveTodos();
    }
}

filterOption.addEventListener('click', filterTodo)

function filterTodo(event){
    const tasks = todosList.childNodes
    console.log(todosList.childNodes);
    tasks.forEach((task) => {
        const currentStyle = task.style;
        if(currentStyle !== undefined && currentStyle !== null){
            switch(event.target.value){
                case 'all':
                    currentStyle.display = 'flex';
                    break;
                case 'done':
                    if(task.classList.contains('done')){
                        currentStyle.display = 'flex';
                    } else {
                        currentStyle.display = 'none';
                    }
                    break;
                case 'pending':
                    if(!task.classList.contains('done')){
                        currentStyle.display = 'flex';
                    } else {
                        currentStyle.display = 'none';
                    }
                    break;    
            }
        }
    })
}

function saveTodos(){
    localStorage.setItem('todos', JSON.stringify(todos));
}

inputForm.addEventListener('submit', handleTodoSubmit);

if(savedTodos !== null){
    const parsedTodos = JSON.parse(savedTodos);
    parsedTodos.forEach(displayTodos);
}

// This allows the current state of the todos array to be saved to localStorage before the page is unloaded.
window.addEventListener('beforeunload', saveTodos);
