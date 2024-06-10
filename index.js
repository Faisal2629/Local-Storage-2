document.addEventListener("DOMContentLoaded", function () {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    const todoTable = document.querySelector("#todo-table tbody");
    const addTodoButton = document.getElementById("add-todo");
  
    function renderTodos() {
      todoTable.innerHTML = "";
      todos.forEach((todo, index) => {
        const row = document.createElement("tr");
  
        const nameCell = document.createElement("td");
        nameCell.textContent = todo.title;
        row.appendChild(nameCell);
  
        const priorityCell = document.createElement("td");
        priorityCell.textContent = todo.priority;
        if (todo.priority === "medium") {
          priorityCell.style.backgroundColor = "rgb(255,255,0)";
        } else if (todo.priority === "high") {
          priorityCell.style.backgroundColor = "rgb(255,0,0)";
        }
        row.appendChild(priorityCell);
  
        const statusCell = document.createElement("td");
        const statusButton = document.createElement("button");
        statusButton.textContent = todo.status;
        statusButton.addEventListener("click", function () {
          todo.status = todo.status === "Pending🔃" ? "Completed✅" : "Pending🔃";
          localStorage.setItem("todos", JSON.stringify(todos));
          renderTodos();
        });
        statusCell.appendChild(statusButton);
        row.appendChild(statusCell);
  
        const deleteCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Archive";
        deleteButton.addEventListener("click", function () {
          const archive = JSON.parse(localStorage.getItem("archive")) || [];
          archive.push(todo);
          localStorage.setItem("archive", JSON.stringify(archive));
          todos.splice(index, 1);
          localStorage.setItem("todos", JSON.stringify(todos));
          renderTodos();
        });
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);
  
        todoTable.appendChild(row);
      });
    }
  
    addTodoButton.addEventListener("click", function () {
      const todoInput = document.getElementById("todo-input");
      const prioritySelect = document.getElementById("priority-select");
  
      if (todoInput.value.trim() === "") {
        alert("Todo cannot be empty!");
        return;
      }
  
      const newTodo = {
        title: todoInput.value.trim(),
        priority: prioritySelect.value,
        status: "Pending🔃",
      };
  
      todos.push(newTodo);
      localStorage.setItem("todos", JSON.stringify(todos));
      renderTodos();
  
      todoInput.value = "";
      prioritySelect.value = "low";
    });
  
    renderTodos();
  });
  