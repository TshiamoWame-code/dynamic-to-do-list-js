// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', function () {
  // Select DOM elements
  const addButton = document.getElementById('add-task');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Load tasks from Local Storage when the page loads
  loadTasks();

  // Function to add a task
  function addTask(taskText, save = true) {
    // If called without a taskText (e.g. from user input), get it from input field
    if (!taskText) {
      taskText = taskInput.value.trim();
    }

    // Check for empty input
    if (taskText === '') {
      alert('Please enter a task.');
      return;
    }

    // Create list item and set its text
    const li = document.createElement('li');
    li.textContent = taskText;

    // Create remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('remove-btn');

    // Assign onclick event to remove the task
    removeBtn.onclick = function () {
      taskList.removeChild(li);
      removeTaskFromStorage(taskText);
    };

    // Append remove button to list item and list item to task list
    li.appendChild(removeBtn);
    taskList.appendChild(li);

    // Save task to Local Storage if required
    if (save) {
      const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      storedTasks.push(taskText);
      localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Clear the input field
    taskInput.value = '';
  }

  // Function to remove a task from Local Storage
  function removeTaskFromStorage(taskText) {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const updatedTasks = storedTasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }

  // Function to load tasks from Local Storage
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(taskText => addTask(taskText, false));
  }

  // Event listener for add button
  addButton.addEventListener('click', function () {
    addTask();
  });

  // Allow pressing Enter to add task
  taskInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      addTask();
    }
  });
});
