const nameContainer = document.querySelector('.name-container'); 
const nameInput = nameContainer.querySelector('input'); 
const greet = document.querySelector('.greet'); 
const toggleContainer = document.querySelector('.toggle-container');
const toggle = toggleContainer.querySelector('input');
const rename = document.querySelector('.rename'); 
const storedName = localStorage.getItem('username');

const today = new Date();
const currentHour = today.getHours();

// Checking if localStorage is empty
if (storedName === null) {
  nameContainer.classList.remove('hidden');
  nameContainer.addEventListener('submit', logIn);
} else {
  greetUser(storedName);
}

// Log In
function logIn(event) {
  if(nameInput.value === ''){
    event.preventDefault()
    alert('Please enter your name.')
  } else {
    event.preventDefault();
    const username = nameInput.value;
    localStorage.setItem('username', username);
    nameContainer.classList.add('hidden');
    greet.classList.add('visibility');
    greetUser(username);
  }
}

// Greet
function greetUser(username) {
  if (currentHour >= 6 && currentHour < 12) {
    greet.innerText = `Good morning, ${username}. Have a great day ahead!`;
  } else if (currentHour >= 12 && currentHour < 18) {
    greet.innerText = `Good afternoon, ${username}. Any tasks left?`;
  } else if(currentHour >= 18 && currentHour < 21){
    greet.innerText = `Good evening, ${username}. Day's almost over!`;
  } else {
    greet.innerText = `Good night, ${username}. You did well today!`;
  }

  greet.classList.remove('hidden');
  toggleContainer.classList.remove('hidden');
  toggle.addEventListener('click', displayRename);
  rename.addEventListener('click', editName);
}

// Toggles the "Rename" button/feature.
function displayRename() {
  rename.classList.toggle('hidden');
}

// Edit name (from localStorage) but does not delete even after clicking toggle then refresh.
function editName(event) {
  event.preventDefault();
  greet.classList.add('hidden');
  toggleContainer.classList.add('hidden');
  rename.classList.add('hidden');
  nameContainer.classList.remove('hidden');
  nameContainer.addEventListener('submit', logIn);
}

// To make sure the greeting renders even after hard-refreshing
if(storedName !== null){
  greet.classList.add('visibility');
}
