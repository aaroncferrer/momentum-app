const nameContainer = document.querySelector('.name-container'); 
const nameInput = nameContainer.querySelector('input'); 
const greet = document.querySelector('.greet'); 
const toggleContainer = document.querySelector('.toggle-container');
const toggle = toggleContainer.querySelector('input');
const rename = document.querySelector('.rename'); 
const storedName = localStorage.getItem('username');

const date = new Date();
const currentHour = date.getHours();

// Checking if localStorage is empty
if (storedName === null) {
  nameContainer.classList.remove('hidden');
  nameContainer.addEventListener('submit', logIn);
} else {
  greetUser(storedName);
}

// Log In
function logIn(event) {
  // event.preventDefault() --> prevents the entire page from rerendering/reloading
  event.preventDefault();
  const username = nameInput.value;
  localStorage.setItem('username', username);
  nameContainer.classList.add('hidden');
  greetUser(username);
}

// Greet
function greetUser(username) {
  if (currentHour >= 6 && currentHour < 12) {
    greet.innerText = `Good morning, ${username}. Have a great day ahead!`;
  } else if (currentHour >= 12 && currentHour < 17) {
    greet.innerText = `Good afternoon, ${username}. Any tasks left?`;
  } else {
    greet.innerText = `Good night, ${username}. You did well today.`;
  }

  greet.classList.remove('hidden');
  toggleContainer.classList.remove('hidden');
  toggle.addEventListener('click', displayRename);
  rename.addEventListener('click', editName);
}

// Toggles the "Rename" button/feature.
function displayRename() {
  // On and off --> add/remove className from selected element (w3schhols)
  rename.classList.toggle('hidden');
}

// Edit name (from localStorage) but does not delete even after clicking toggle then refresh.
function editName(event, username) {
  event.preventDefault();
  greet.classList.add('hidden');
  toggleContainer.classList.add('hidden');
  rename.classList.add('hidden');
  nameContainer.classList.remove('hidden');

  // Just so I don't have to manually delete the key via dev tools.
  localStorage.clear(username)

  nameContainer.addEventListener('submit', logIn);
}
