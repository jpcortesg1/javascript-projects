import Button from "./components/Button.js";
import TitleTask from "./components/TitleTask.js";
import Task from "./components/Task.js";

export default class View {
  constructor() {
    this.model = null;
    this.addButton = new Button("addButton");
    this.titleTask = new TitleTask();

    this.addButton.onClick(() => this.addTask());
  }

  setModel(model) {
    this.model = model;
  }

  async addTask() {
    const task = this.titleTask.getData();
    if (task.task === false) return;
    const message = await this.model.addTask({ ...task });
    console.log(message);
    this.titleTask.deleteText();
    this.showTasks();
  }

  async showTasks() {
    document.querySelector(".tasks").innerHTML = "";
    const tasks = await this.model.getTasks();
    const fragment = document.createDocumentFragment();
    for (const [key, value] of Object.entries(tasks)) {
      const { task, description } = value;
      const newTask = new Task(task, key, description);
      const htmlTask = newTask.createHtml(
        (id) => this.deleteTask(id),
        (id, title, description) => this.editTask(id, title, description)
      );
      fragment.appendChild(htmlTask);
    }
    document.querySelector(".tasks").appendChild(fragment);
  }

  async deleteTask(id) {
    const message = await this.model.deleteTask(id);
    console.log(message);
    this.showTasks();
  }

  async editTask(id, task, description) {
    const newTask = {
      task,
      description,
    };
    const message = await this.model.editTask(id, { ...newTask });
    console.log(message);
    this.showTasks();
  }
}
