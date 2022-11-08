const btnAddTask = document.querySelector('#btnAddTask');
const taskTitle = document.querySelector('#taskTitle');
const taskBody = document.querySelector('#taskBody');
const tasksContainer = document.querySelector('#tasksContainer');
const spanErrorMessage = document.querySelector('.spanErrorMessage');

const totalTasksElement = document.querySelector('#totalTasks');
let totalTasks = 0;
const pendingTasksElement = document.querySelector('#pendingTasks');
const finishedTasksElement = document.querySelector('#finishedTasks');
let finishedTasks = 0;

let month = new Date().getMonth() + 1;
let day = new Date().getDate();
let hours = new Date().getHours();
let minutes = new Date().getMinutes();
document.getElementById("spanCurrentDate").innerHTML = `Hoy, ${day}/${month}`;

const tasks = [];

const addTask = () => {
    if (taskTitle.value === '' && taskBody.value === '') {
        spanErrorMessage.innerHTML = 'Los campos no deben estar vacíos.';
        return;
    } else if (taskTitle.value === '') {
        spanErrorMessage.innerHTML = 'La tarea debe tener al menos el título.';
        return;
    }
    const task = {
        title: taskTitle.value,
        body: taskBody.value
    }
    tasks.unshift(task);
    renderTasks();
    taskTitle.value = '';
    taskBody.value = '';

    localStorage.setItem('tasks', JSON.stringify(tasks));

    pendingTasksElement.innerHTML = tasks.length.toString();
    totalTasks++;
    totalTasksElement.innerHTML = totalTasks.toString();
}

const renderTasks = () => {
    tasksContainer.innerHTML = '';
    tasks.forEach((task, index) => {
        tasksContainer.innerHTML += `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${task.title}</h5>
                    <p class="card-text">${task.body}</p>
                    <span class="form-text">hoy a las ${hours} horas y ${minutes} minutos</span>
                    <button class="btn btn-danger" onclick="finishTask(${index})">Finalizar</button>
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
    finishedTasksElement.innerHTML = finishedTasks.toString();
    pendingTasksElement.innerHTML = tasks.length.toString();
}

btnAddTask.addEventListener('click', addTask);