export default class DB {
  constructor() {
    this.IDBRequest = indexedDB.open("todobase");

    this.IDBRequest.addEventListener("upgradeneeded", () => {
      const db = this.IDBRequest.result;

      db.createObjectStore("tasks", {
        autoIncrement: true,
      });
    });

    this.IDBRequest.addEventListener("success", () => {
      console.log("Conectado correctamente");
    });

    this.IDBRequest.addEventListener("error", () => {
      console.log("Ocurrio un error al abrir la base de datos");
    });
  }

  async editTask(key, obj) {
    const { objectStore, IDBtransaction } = this.getIDBData();
    objectStore.put(obj, parseInt(key));

    if (IDBtransaction.error) return false;
    await IDBtransaction.complete;
    return true;
  }

  async deleteTask(key) {
    const { objectStore, IDBtransaction } = this.getIDBData();
    objectStore.delete(parseInt(key));

    if (IDBtransaction.error) return false;
    await IDBtransaction.complete;
    return true;
  }

  async getTasks() {
    const { objectStore } = this.getIDBData();
    const cursor = objectStore.openCursor();
    const tasks = {};

    return new Promise(function (resolve) {
      cursor.onsuccess = (e) => {
        const result = e.target.result;
        if (result) {
          const { key, value } = result;
          tasks[key] = value;
          result.continue();
        } else {
          resolve(tasks);
        }
      };
    });
  }

  async addTask(task) {
    const { objectStore, IDBtransaction } = this.getIDBData();
    objectStore.add(task);

    if (IDBtransaction.error) return false;
    await IDBtransaction.complete;
    return true;
  }

  getIDBData() {
    const db = this.IDBRequest.result;
    const IDBtransaction = db.transaction("tasks", "readwrite");

    const objectStore = IDBtransaction.objectStore("tasks");
    return { objectStore, IDBtransaction };
  }
}
