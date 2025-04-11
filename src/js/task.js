// ToDos

document.getElementById("taskForm").addEventListener("submit", function (event) {
  event.preventDefault();


  const taskTitle = document.getElementById("taskTitle").value;
  const taskDescription = document.getElementById("taskDescription").value;
  const taskDueDate = document.getElementById("taskDueDate").value;
  const taskCategory = document.getElementById("taskCategory").value;


  const taskItem = document.createElement("div");
  taskItem.classList.add("task-item");

  const formattedDate = new Date(taskDueDate).toLocaleString();

  taskItem.innerHTML = `
        <h4><strong>${taskTitle}</strong> - ${taskCategory}</h4>
        <p>${taskDescription}</p>
        <time datetime="${taskDueDate}">${formattedDate}</time>
        <button class="mark-completed">Mark as Completed</button>
    `;


  document.getElementById("taskList").appendChild(taskItem);


  taskItem.querySelector(".mark-completed").addEventListener("click", function () {
    taskItem.classList.toggle("completed");
  });


  document.getElementById("taskForm").reset();
});
