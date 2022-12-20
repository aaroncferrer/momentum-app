const focusForm = document.querySelector(".focus-form");
const focusInput = focusForm.querySelector("input");
const focus = document.querySelector(".focus");
const praise = document.querySelector('.praise')
const savedFocus = localStorage.getItem("singleFocus");

let singleFocus = [];

function displayFocus(newFocusObj) {
    const li = document.createElement("li"); 
    li.id = newFocusObj.id;

    const input = document.createElement("input"); 
    input.type = "checkbox";
    input.name = "checkbox";
    input.id = newFocusObj.id;

    if (newFocusObj.checked) {
        input.checked = true;
    }
    const label = document.createElement("label"); 
    // The focus text
    label.innerText = newFocusObj.text;
    const button1 = document.createElement("button"); 
    button1.innerHTML = "&#10005;";
    button1.addEventListener("click", deleteFocus);
    input.addEventListener('click', () => {
        if (input.checked) {
            praise.classList.add('visibility');
        }else {
            praise.classList.remove('visibility');
        }
    });

    li.appendChild(input);
    li.appendChild(label);
    li.appendChild(button1);
    
    focus.appendChild(li);

    // So that the focusForm won't render even if after hard-refreshing, as long as savedFocus has a value.
    if(savedFocus !== null){
        focusForm.classList.add('hidden');
    }

}

function deleteFocus(event) {
    const li = event.target.parentElement;

    li.remove();

    // Use parseInt to convert li.id to a number since Date.now() returns a number

    console.log(typeof(li.id)) // ---> returns string

    singleFocus = singleFocus.filter((focusItem) => focusItem.id !== parseInt(li.id));
    saveFocus();
    focusForm.classList.remove('hidden');
    praise.classList.remove('visibility');
}

// Creation of the object upon submit
function handleFocusSubmit(event) {
    if(focusInput.value === ''){
        event.preventDefault()
        alert('Please enter a task you\'d like to focus on.')
    } else {
        event.preventDefault();
        const newFocus = focusInput.value;
        focusInput.value = "";
        const newFocusObj = {
        text: newFocus,
        id: Date.now(),
        checked: false,
    };
        singleFocus.push(newFocusObj);
        displayFocus(newFocusObj);
        saveFocus();
    }
}

function saveFocus() {
    localStorage.setItem("singleFocus", JSON.stringify(singleFocus));
    focusForm.classList.add('hidden');
}

focusForm.addEventListener("submit", handleFocusSubmit);

    if (savedFocus !== null) {
    const parsedFocus = JSON.parse(savedFocus);
    parsedFocus.forEach(displayFocus);
    }

window.addEventListener("beforeunload", saveFocus);
