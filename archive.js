document.addEventListener("DOMContentLoaded", function () {
    let archive = JSON.parse(localStorage.getItem("archive")) || [];
    const archiveTable = document.querySelector("#archive-table tbody");
    const filterPriority = document.getElementById("filter-priority");
    const filterStatus = document.getElementById("filter-status");
  
    function renderArchive(filteredArchive) {
      archiveTable.innerHTML = "";
      filteredArchive.forEach((todo, index) => {
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
        statusCell.textContent = todo.status;
        row.appendChild(statusCell);
  
        const restoreCell = document.createElement("td");
        const restoreButton = document.createElement("button");
        restoreButton.textContent = "Restore";
        restoreButton.addEventListener("click", function () {
          const todos = JSON.parse(localStorage.getItem("todos")) || [];
          todos.push(todo);
          localStorage.setItem("todos", JSON.stringify(todos));
          archive.splice(index, 1);
          localStorage.setItem("archive", JSON.stringify(archive));
          renderArchive(archive);
        });
        restoreCell.appendChild(restoreButton);
        row.appendChild(restoreCell);
  
        const deleteCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function () {
          archive.splice(index, 1);
          localStorage.setItem("archive", JSON.stringify(archive));
          renderArchive(archive);
        });
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);
  
        archiveTable.appendChild(row);
      });
    }
  
    filterPriority.addEventListener("change", function () {
      const filteredArchive = archive.filter(todo => filterPriority.value === "" || todo.priority === filterPriority.value);
      renderArchive(filteredArchive);
    });
  
    filterStatus.addEventListener("change", function () {
      const filteredArchive = archive.filter(todo => filterStatus.value === "" || todo.status === filterStatus.value);
      renderArchive(filteredArchive);
    });
  
    renderArchive(archive);
  });
  