//model
var tasks = [
    { description: "Buy food", isDone: true, responsible: 'Tom', doneDate: new Date().toISOString()},
    { description: "Buy clothes", isDone: false, responsible: 'John', doneDate: ''},
];
//controller
var taskDescriptionInput = document.getElementById('taskDescription')
var taskResponsibleInput = document.getElementById('responsible')
function addTask (){
    tasks.push(
        {
            description: taskDescriptionInput.value,
            isDone: false,
            responsible: taskResponsibleInput.value,
            doneDate: null,
        }
    );
    show();
}

//view
var taskTable = document.getElementById('tasksTable')
show();
function show() {
    let html =`
       <tr>
            <th>Exercise</th>
            <th>Done</th>
            <th>Responsable</>
            <th>Done date</>
            <th></th>
        </tr>`;
    for (let i = 0; i < tasks.length; i++) {
        html += creatHtmlRow(i);
    }
    tasksTable.innerHTML = html;
}
function creatHtmlRow(i) {
    const task = tasks[i];
    const checkedHtml = task.isDone ? 'checked="checked"' : '';
    if (!task.editMode) return `<tr>
    <td>${task.description}</td>
    <td><input id="checkbox" onchange="changeIsDone(this,${i})" type="checkbox" ${checkedHtml} /></td>
    <td>${task.responsible}</td>
    <td>${task.doneDate || 'Not done yet'}</td>
    <td>
        <button onclick="deleteTask(${i})">Delete</button>
        <button onclick="editTask(${i})">Edit</button>
    </td>
    </tr>
        `;
    return `<tr>
    <td><input id="editDescription${i}" type="text" value="${task.description}"/></td>
    <td><input id="checkbox" onchange="changeIsDone(this,${i})" type="checkbox" ${checkedHtml} /></td>
    <td><input id="editDescription${i}" type="text" value="${task.responsible}"/></td>
    <td></td>
    <td>
        <button onclick="updateTask(${i})">save</button>
    </td>
    </tr>
        `;
    
}
// function selectResponsiblePerson() {
//     let responsiblePerson = task.responsible()
//     show();
// }

function changeIsDone(checkbox, index) {
    const isDone = checkbox.checked;
    tasks[index].isDone = isDone;
    if (isDone) {
        tasks[index].doneDate = new Date().toISOString();
    } else {
        tasks[index].doneDate = ''; 
    }
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
    const id = `editDescription${index}`;
    const inputTag = document.getElementById(id);
    tasks[index].description = inputTag.value;
    tasks[index].editMode = false;
    show();
}


