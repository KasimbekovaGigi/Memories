// task.test.js
beforeEach(() => {
  document.body.innerHTML = `
    <form id="taskForm">
      <input id="taskTitle" value="Task 1">
      <input id="taskDescription" value="Description of Task 1">
      <input id="taskDueDate" value="2025-01-10">
      <input id="taskCategory" value="Work">
      <button type="submit">Add Task</button>
    </form>
    <div id="taskList"></div>
  `;
});

test('Should create a task item', () => {
  require('../js/task');

  const taskForm = document.getElementById('taskForm');
  taskForm.dispatchEvent(new Event('submit'));

  const taskItem = document.querySelector('.task-item');
  expect(taskItem).not.toBeNull();
  expect(taskItem.querySelector('h4').textContent).toContain('Task 1');
});
