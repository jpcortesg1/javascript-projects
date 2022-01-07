export default class TitleTask {
  constructor() {
    this.titleTask = document.getElementById("contentTask");
  }

  getData() {
    const task = this.titleTask.value;
    if (task === "") return { task: false };
    const obj = { task };
    obj["description"] = "Create your description...";
    return { ...obj };
  }

  deleteText() {
    this.titleTask.value = "";
  }
}
