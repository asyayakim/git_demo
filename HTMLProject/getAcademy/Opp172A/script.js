//model
var tasks = [
    { description: "Buy milk", isDone: false, responsible: 'John', doneDate: '' },
    { description: "Buy food", isDone: true, responsible: 'Tom', doneDate: new Date().toLocaleDateString() },
    { description: "Buy clothes", isDone: false, responsible: 'John', doneDate: '' },
];
var taskDescriptionInput = document.getElementById('taskDescription')
var taskResponsibleInput = document.getElementById('responsible')
var taskTable = document.getElementById('tasksTable')
var selectResponsiblePerson = document.getElementById('selectResponsiblePerson');
var sortAscending = true;

var currentPage = 1; 
var tasksPerPage = 3;
var pagination = document.getElementById('pagination').innerHTML
//controller
function addTask() {
    if (taskDescriptionInput.value == '' || taskResponsibleInput.value == '') {
        alert("Specify the task and who is responsible in both boxes")
        resetValues();
        show();
        return;
    } else {
        tasks.push(
            {
                description: taskDescriptionInput.value,
                isDone: false,
                responsible: taskResponsibleInput.value,
                doneDate: null,
            }
        );
        resetValues();
        show();
    }
}
//view

show();
function show() {
    const filterValue = selectResponsiblePerson.value.toLowerCase();
    let html = `
       <tr>
            <th>Exercise</th>
            <th>Responsible</>
            <th>Done</th>
            <th>Done date</>
            <th></th>
        </tr>`;
    const uniqueResponsibles = new Set();

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].responsible.toLowerCase().includes(filterValue)) {
            html += creatHtmlRow(i);
        }
        uniqueResponsibles.add(tasks[i].responsible);
    }

    tasksTable.innerHTML = html;
    updateDropdown(uniqueResponsibles);
}
function creatHtmlRow(i) {
    const task = tasks[i];
    const checkedHtml = task.isDone ? 'checked="checked"' : '';
    if (!task.editMode) return `<tr>
    <td>${task.description}</td>
    <td>${task.responsible}</td>
    <td><input id="checkbox${i}" onchange="changeIsDone(this,${i})" type="checkbox" ${checkedHtml} /></td>
    <td>${task.doneDate || 'Not done yet'}</td>
    <td>
        <button onclick="deleteTask(${i})">Delete</button>
        <button onclick="editTask(${i})">Edit</button>
    </td>
    </tr>
        `;
    return `<tr>
    <td><input id="editDescription${i}" type="text" value="${task.description}"/></td>
    <td><input id="editResponsible${i}" type="text" value="${task.responsible}"/></td>
    <td><input id="checkbox" onchange="changeIsDone(this,${i})" type="checkbox" ${checkedHtml} /></td>
    <td></td>
    <td>
        <button onclick="updateTask(${i})">save</button>
    </td>
    </tr> `;
} 


function toggleSortOrder() {
    sortAscending = !sortAscending; 
    sortByDoneDate(); 
}

function sortByDoneDate() {
    tasks.sort((a, b) => {
        const dateA = a.doneDate ? new Date(a.doneDate) : null;
        const dateB = b.doneDate ? new Date(b.doneDate) : null;
        // return (dateB === null) - (dateA === null) ||
        //     dateA - dateB;
        if (!dateA && !dateB) return 0;
        if (!dateA) return sortAscending ? 1 : -1;
        if (!dateB) return sortAscending ? -1 : 1;
        return sortAscending ? dateA - dateB : dateB - dateA;

    });
    show();
}

function updateDropdown(uniqueResponsibles) {

    selectResponsiblePerson.innerHTML = '<option value="">--Select Responsible:--</option>'; // Reset dropdown options
    uniqueResponsibles.forEach(function (responsible) {
        const option = document.createElement('option');
        option.value = responsible;
        option.textContent = responsible;
        selectResponsiblePerson.appendChild(option);
    });
}
function changeIsDone(checkbox, index) {
    tasks[index].isDone = checkbox.checked;
    tasks[index].doneDate = checkbox.checked ? new Date().toLocaleDateString() : '';
    show();
}
function deleteTask(index) {
    tasks.splice(index, 1);
    show();
}
function editTask(index) {
    tasks[index].editMode = true;
    show();
}
function updateTask(index) {
    tasks[index].description = document.getElementById(`editDescription${index}`).value;
    tasks[index].responsible = document.getElementById(`editResponsible${index}`).value;
    tasks[index].editMode = false;
    show();
} function resetValues() {
    taskDescriptionInput.value = '';
    taskResponsibleInput.value = '';
}
