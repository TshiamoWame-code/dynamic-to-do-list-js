// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', function () {
  // Select DOM elements
  const addButton = document.getElementById('add-task');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Function to add a task
  function addTask() {
    // Get and trim the task input
    const taskText = taskInput.value.trim();

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
    removeBtn.classList.add('remove-btn'); // Use classList.add

    // Assign onclick event to remove the task
    removeBtn.onclick = function () {
      taskList.removeChild(li);
    };

    // Append remove button to list item and list item to task list
    li.appendChild(removeBtn);
    taskList.appendChild(li);

    // Clear the input field
    taskInput.value = '';
  }

  // Event listener for add button
  addButton.addEventListener('click', addTask);

  // Allow pressing Enter to add task
  taskInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      addTask();
    }
  });
});
