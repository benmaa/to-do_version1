let toDoCount = 1;

const toDoList = [];

function toDoDefinieren(){
    const addButton = document.getElementById("to-do_hinzufügen");
    addButton.setAttribute("disabled", "true"); 

    const container = document.createElement("div");
    container.id = "container";

    const okButton = document.createElement("button");
    okButton.id = "okButton";
    okButton.innerText = "ok";
    okButton.onclick = okButtonFunction;

    const toDoContent = document.createElement("input");
    toDoContent.type = "text";
    toDoContent.id = `toDoText${toDoCount}`; 
    toDoContent.placeholder = "Gib dein to-do ein...";

    container.appendChild(toDoContent);
    container.appendChild(okButton);

    const sectinContainer = document.getElementById("section2");
    sectinContainer.appendChild(container);

}

function okButtonFunction(){
    const addButton = document.getElementById("to-do_hinzufügen");
    addButton.removeAttribute("disabled");

    let toDoText = document.getElementById(`toDoText${toDoCount}`); 
    let content = toDoText.value; 

    const eingabe = document.getElementById(`toDoText${toDoCount}`);
    eingabe.remove(); 

    const okButton = document.getElementById("okButton");
    okButton.remove(); 

    addToDo(content);
    toDoCount++;
}

function addToDo(content){
    const newToDo = document.createElement("input");
    newToDo.type = "checkbox";
    newToDo.id = `boxNr${toDoCount}`;
    newToDo.name = "toDo";
    newToDo.checked = false; 
    toDoList.push(newToDo.id);

    const label = document.createElement("label");
    label.textContent = content;
    label.id = `text${toDoCount}`;

    const todoItem = document.createElement("div");
    todoItem.classList.add("toDoItem");

    todoItem.appendChild(newToDo);
    todoItem.appendChild(label);

    const container = document.getElementById("section2");
    container.appendChild(todoItem);
}

function saveToDo(){
    const toDoItems = [];
    const checkboxes = document.querySelectorAll("input[type=checkbox]")

    checkboxes.forEach(checkbox => {
        toDoItems.push({ id: checkbox.id, checked: checkbox.checked });
    });

    localStorage.setItem("toDos", JSON.stringify(toDoItems));
}

window.onload = function() {
    const savedToDos = localStorage.getItem("toDos");
    if (savedToDos) {
        const toDoItems = JSON.parse(savedToDos);
        toDoItems.forEach(item => {
            const newToDo = document.createElement("input");
            newToDo.type = "checkbox";
            newToDo.id = item.id;
            newToDo.name = "toDo";
            newToDo.checked = item.checked; // Den gespeicherten Status wiederherstellen

            const label = document.createElement("label");
            label.textContent = `ToDo ${item.id}`;

            const todoItem = document.createElement("div");
            todoItem.classList.add("toDoItem");

            todoItem.appendChild(newToDo);
            todoItem.appendChild(label);

            const container = document.getElementById("section2");
            container.appendChild(todoItem);
        });
    }
}

document.addEventListener("change", function(event) {
    if (event.target.type === "checkbox") {
        saveToDo();
    }
});
function clearCheckBox() {
    const checkboxes = document.querySelectorAll('input[name="toDo"]:checked');

    checkboxes.forEach(checkbox => {
        const label = document.querySelector(`label[for="${checkbox.id}"]`);
        if ( label){
            label.remove();
        }
        checkbox.parentElement.remove();
    });
}
