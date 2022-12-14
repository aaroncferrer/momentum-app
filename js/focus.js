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
    singleFocus = singleFocus.filter((focusItem) => focusItem.id !== parseInt(li.id));
    saveFocus();
    focusForm.classList.remove('hidden');
    praise.classList.add('hidden');
}

function handleFocusSubmit(event) {
    event.preventDefault();
    const newFocus = focusInput.value;
    focusInput.value = "";
    const newFocusObj = {
        text: newFocus,
        // Date.now() returns the number of milliseconds since January 1, 1970.
        id: Date.now(),
        checked: false,
    };
    singleFocus.push(newFocusObj);
    displayFocus(newFocusObj);
    saveFocus();
}

function saveFocus() {
    const checkbox = document.querySelectorAll("input[name=checkbox]");
    for (let i = 0; i < checkbox.length; i++) {
        singleFocus[i].checked = checkbox[i].checked;
    }
    localStorage.setItem("singleFocus", JSON.stringify(singleFocus));
    focusForm.classList.add('hidden');
}

focusForm.addEventListener("submit", handleFocusSubmit);

    if (savedFocus !== null) {
    // Parse the data with JSON.parse(), and the data becomes a JavaScript object. --> This way we can access the values of keys from savedFocus (e.g., newFocusObj.text)
    const parsedTodos = JSON.parse(savedFocus);
    singleFocus = parsedTodos;
    parsedTodos.forEach(displayFocus);
    }

window.addEventListener("beforeunload", saveFocus);
