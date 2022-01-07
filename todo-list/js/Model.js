import DB from "./indexedDB.js";

export default class Model {
  constructor() {
    this.view = null;
    this.db = new DB();
  }

  setView(view) {
    this.view = view;
  }

  async editTask(id, task) {
    const correct = await this.db.editTask(id, { ...task });
    if (correct) return "Task edit successfully";
    if (!correct) return "Problem editing task";
  }

  async deleteTask(id) {
    const correct = await this.db.deleteTask(id);
    if (correct) return "Task delete successfully";
    if (!correct) return "Problem deleting task";
  }

  async getTasks() {
    const tasks = await this.db.getTasks();
    return { ...tasks };
  }

  async addTask(task) {
    const correct = await this.db.addTask({ ...task });
    if (correct) return "Task add successfully";
    if (!correct) return "Problem adding task";
  }
}
