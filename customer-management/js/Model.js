export default class Model {
  constructor() {
    this.view = null;
    this.clients = {};
  }

  setColumn(id, newColumn){
    this.clients[id]["column"] = newColumn;
  }

  setValues(lastId, values) {
    const { id } = values;
    const column = this.clients[lastId]["column"];
    this.clients[lastId] = null;
    delete this.clients[lastId];
    if (id in this.clients && id !== lastId) return false; // Client already exists
    this.clients[id] = values;
    this.clients[id]["column"] = column;
    return true;
  }

  deleteClient(id) {
    delete this.clients[id];
  }

  getClient(id) {
    return { ...this.clients[id] };
  }

  setView(view) {
    this.view = view;
  }

  newClient(client) {
    const { id } = client;
    if (id in this.clients) return false; // Client already exists
    client["column"] = "1";
    this.clients[id] = client;
    return true;
  }
}
