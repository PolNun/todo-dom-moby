const btnAddTask = document.querySelector('#btnAddTask');
const taskTitle = document.querySelector('#taskTitle');
const taskBody = document.querySelector('#taskBody');
const tasksContainer = document.querySelector('#tasksContainer');
const btnDeleteTask = document.querySelectorAll('#btnDeleteTask');
const totalTasksElement = document.querySelector('#totalTasks');
const pendingTasksElement = document.querySelector('#pendingTasks');
const finishedTasksElement = document.querySelector('#finishedTasks');
let finishedTasks = 0;
let month = new Date().getMonth() + 1;
let day = new Date().getDate();
document.getElementById("spanCurrentDate").innerHTML = `${day}/${month}`;

const tasks = [];

const addTask = (e) => {
    e.preventDefault();
    const task = {
        title: taskTitle.value,
        body: taskBody.value
    }
    tasks.push(task);
    renderTasks();
    taskTitle.value = '';
    taskBody.value = '';
    localStorage.setItem('tasks', JSON.stringify(tasks));
    totalTasksElement.innerHTML = tasks.length;
    pendingTasksElement.innerHTML = tasks.length;
}

const renderTasks = () => {
    tasksContainer.innerHTML = '';
    tasks.forEach((task, index) => {
        tasksContainer.innerHTML += `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${task.title}</h5>
                    <p class="card-text">${task.body}</p>
                    <button id="btnDeleteTask" class="btn btn-danger" onclick="finishTask(${index})">Finalizar</button>
                </div>
            </div>
        `;
    });
}

const finishTask = (index) => {
    tasks.splice(index, 1);
    renderTasks();
    localStorage.setItem('tasks', JSON.stringify(tasks));
    finishedTasks++;
    finishedTasksElement.innerHTML = finishedTasks;
    pendingTasksElement.innerHTML = tasks.length;
}

btnAddTask.addEventListener('click', addTask);