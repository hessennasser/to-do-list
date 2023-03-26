const toDoInput = document.getElementById("toDoInput");
const addBtn = document.getElementById("addBtn");
const removeBtns = document.querySelectorAll(".delete");
let tasksContainer = document.querySelector(".lists ul");
let tasksElements = [];

addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (toDoInput.value == "") {
        alert("please add task text")
        return;
    }
    let tasks = {
        body: toDoInput.value,
        done: false
    };
    createTask(tasks);
    addTasksToLocalStorage(tasks);
    toDoInput.value = "";
});

const addTasksToLocalStorage = (taskDetails) => {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || []; // get existing tasks or initialize empty array
    tasks.push(taskDetails); // add new task to the list
    localStorage.setItem("tasks", JSON.stringify(tasks)); // store updated list back in localStorage
};

removeBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        let task = e.currentTarget.parentElement;
        task.remove();
        removeTaskFromLocalStorage(task);
    });
});



const removeTaskFromLocalStorage = (task) => {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || []; // get existing tasks or initialize empty array
    tasks = tasks.filter((t) => t.body !== task.body); // remove the task from the list
    localStorage.setItem("tasks", JSON.stringify(tasks)); // store updated list back in localStorage
};

const createTask = (task) => {
    let listItem = document.createElement("li");
    listItem.classList.add("task-item");
    listItem.dataset.done = task.done;

    let taskText = document.createElement("p");
    taskText.textContent = task.body;
    listItem.appendChild(taskText);

    let deleteIcon = document.createElement("span");
    deleteIcon.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
    deleteIcon.addEventListener("click", (e) => {
        e.currentTarget.parentElement.remove();
        removeTaskFromLocalStorage(task);
    });
    listItem.appendChild(deleteIcon);

    tasksContainer.append(listItem);
    tasksElements.push(listItem);

    listItem.addEventListener("click", (e) => {
        e.currentTarget.classList.toggle("done");
        e.currentTarget.dataset.done = e.currentTarget.classList.contains("done") ? "true" : "false";
        task.done = e.currentTarget.classList.contains("done");
        updateTaskInLocalStorage(task);
    });
};

window.addEventListener("DOMContentLoaded", () => {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || []; // get existing tasks or initialize empty array
    tasks.forEach(task => {
        createTask(task);
        if (task.done) {
            let listItem = tasksElements[tasksElements.length - 1];
            listItem.classList.add("done");
        }
    });
});

const updateTaskInLocalStorage = (task) => {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let updatedTask = tasks.find(t => t.body === task.body);
    updatedTask.done = task.done;
    localStorage.setItem("tasks", JSON.stringify(tasks));
};
