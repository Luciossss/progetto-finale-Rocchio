const taskNameInput = document.getElementById('taskName');
const taskStatusInput = document.getElementById('taskStatus');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const searchInput = document.getElementById('searchInput');
const filterStatus = document.getElementById('filterStatus');

let tasks = [];

function renderTasks()
 {
  const searchTerm = searchInput.value.toLowerCase();
  const statusFilter = filterStatus.value;

  taskList.innerHTML = '';

  tasks
    .filter(task =>
      {
      return (
        (statusFilter === 'tutte' || task.status === statusFilter) &&
        task.name.toLowerCase().includes(searchTerm)
      );
    })
    .forEach((task, index) =>
      {
      const li = document.createElement('li');
     
      li.className = `task ${task.status === 'completata' ? 'completed' : ''}`;

      const span = document.createElement('span');
      span.textContent = `${task.name} - [${task.status}]`;

      if (task.status === 'da fare') 
      {
        li.style.backgroundColor = '#B22222'; 
        span.style.color = 'white'; 
      } else if (task.status === 'in corso')
      {
        li.style.backgroundColor = '#FFA500'; 
        span.style.color = 'white'; 
      } else if (task.status === 'completata')
      {
        li.style.backgroundColor = '#32CD32'; 
        span.style.color = 'white'; 
      }

      const editBtn = document.createElement('button');
      editBtn.textContent = 'Modifica';
      editBtn.onclick = () => editTask(index);

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Elimina';
      deleteBtn.style.backgroundColor = 'red';
      deleteBtn.onclick = () => deleteTask(index);

      const statusBtn = document.createElement('button');
      statusBtn.textContent = 'Stato';
      statusBtn.style.backgroundColor = 'blue';
      statusBtn.onclick = () => toggleStatus(index);

      li.appendChild(span);
      li.appendChild(editBtn);
      li.appendChild(deleteBtn);
      li.appendChild(statusBtn);

      taskList.appendChild(li);
    });
}

function addTask() 
{
  const name = taskNameInput.value.trim();
  const status = taskStatusInput.value;

  if (name === '') return;

  tasks.push({ name, status });
  taskNameInput.value = '';
  renderTasks();
}

function deleteTask(index)
{
  tasks.splice(index, 1);
  renderTasks();
}

function editTask(index)
{
  const newName = prompt('Modifica nome attività:', tasks[index].name);
  if (newName !== null && newName.trim() !== '')
  {
    tasks[index].name = newName.trim();
    renderTasks();
  }
}

function toggleStatus(index)
{
  const states = ['da fare', 'in corso', 'completata'];
  const currentIndex = states.indexOf(tasks[index].status);
  tasks[index].status = states[(currentIndex + 1) % states.length];
  renderTasks();
}

addTaskBtn.addEventListener('click', addTask);
searchInput.addEventListener('input', renderTasks);
filterStatus.addEventListener('change', renderTasks);

renderTasks(); 
