// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', function () {
  // Select DOM elements
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

   // Load tasks from Local Storage and display them
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(taskText => addTask(taskText, false)); // false to prevent re-saving
  }

  // Save tasks array to Local Storage
  function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Get current tasks from Local Storage
  function getStoredTasks() {
    return JSON.parse(localStorage.getItem('tasks') || '[]');
  }
  
  // Function to add a task
  function addTask() {
    // Get and trim the task input
    const taskText = taskInput.value.trim();

    // Check for empty input
    if (taskText === '') {
      alert('Please enter a task.');
      return;
    }

    // Create list item
    const li = document.createElement('li');
    li.textContent = taskText;

    // Create remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('remove-btn');

    // Remove task when button is clicked
    removeBtn.onclick = function () {
      taskList.removeChild(li);
    };

    // Append button to list item, and list item to the list
    li.appendChild(removeBtn);
    taskList.appendChild(li);

    // Clear input field
    taskInput.value = '';
  }

  // Event listener for add button
  addButton.addEventListener('click', addTask);

  // Event listener for pressing Enter key
  taskInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      addTask();
    }
  });

  // (Optional but per your instruction) Call addTask on DOM load
  // This is only useful if you want to auto-add something; otherwise, it's not required.
  // Uncomment if desired:
  // addTask();
});
