export default class Task {
  constructor(title, id, description) {
    this.title = title;
    this.id = id;
    this.description = description;
    this.html = null;
  }

  createHtml(deleteTask, editTask) {
    const task = document.createElement("div");
    const title = document.createElement("h3");
    const description = document.createElement("p");
    const options = document.createElement("div");
    const edit = document.createElement("button");
    const btnDelete = document.createElement("button");

    task.classList.add("task");
    title.classList.add("task_title");
    description.classList.add("task_description");
    options.classList.add("task_options");
    edit.classList.add("button", "button--disabled");
    btnDelete.classList.add("button", "button--delete");

    title.innerText = this.title;
    description.innerText = this.description;

    edit.innerHTML = `<ion-icon name="create"></ion-icon>`;
    btnDelete.innerHTML = `<ion-icon name="trash"></ion-icon>`;

    title.setAttribute("contenteditable", true);
    description.setAttribute("contenteditable", true);

    btnDelete.onclick = () => {
      deleteTask(this.id);
    };

    edit.onclick = () => {
      editTask(this.id, title.innerText, description.innerText);
    };

    title.addEventListener("keyup", () => {
      edit.classList.replace("button--disabled", "button--edit");
    });

    description.addEventListener("keyup", () => {
      edit.classList.replace("button--disabled", "button--edit");
    });

    options.appendChild(edit);
    options.appendChild(btnDelete);
    task.appendChild(title);
    task.appendChild(description);
    task.appendChild(options);

    this.html = task;
    return this.html;
  }
}
