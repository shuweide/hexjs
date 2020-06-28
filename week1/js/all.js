let data = [
  {
    title: "To Do Test",
    completed: false,
  },
];

let render = () => {
  let str = "";
  data.forEach(function (item, index) {
    str += `<li class="list-group-item">
      <div class="d-flex">
      <div class="form-check">
      <input type="checkbox" class="form-check-input" ${
        item.completed ? "checked" : ""
      } data-action="complete" data-id="${index}">
      <label class="form-check-label ${
        item.completed ? "completed" : ""
      }" data-action="complete" data-id="${index}"> ${item.title}</label>
      </div>
      <button type="button" class="close ml-auto" aria-label="Close">
      <span aria-hidden="true" data-action="remove" data-id="${index}">&times;</span>
      </button>
      </div>
      </li>`;
  });
  document.getElementById("todoList").innerHTML = str;
  document.getElementById("taskCount").textContent = data.length;
  document.getElementById("newTodo").value = "";
};

let add = () => {
  let title = document.getElementById("newTodo").value;
  if (!!title) {
    data.push({
      id: Math.floor(Date.now()),
      title,
      completed: false,
    });
    render();
  }
};

let clear = (e) => {
  e.preventDefault();
  data = [];
  render();
};

let change = (e) => {
  if (e.target.dataset.action == "remove") {
    data.splice(e.target.dataset.id, 1);
    render();
  }
  if (e.target.dataset.action == "complete") {
    data[e.target.dataset.id].completed = !data[e.target.dataset.id].completed;
    render();
  }
};

render();
document.querySelector("#addTodo").addEventListener("click", add);
document.querySelector("#clearTask").addEventListener("click", clear);
document.querySelector("#todoList").addEventListener("click", change);
