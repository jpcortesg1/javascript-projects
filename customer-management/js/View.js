import Button from "./components/Button.js";
import Modal from "./components/Modal.js";
import Column from "./components/Column.js";
import Client from "./components/Client.js";

export default class View {
  constructor() {
    // Declare the model
    this.model = null;

    // Buttons
    this.butOpeMod = new Button("new-button");
    this.butCloMod = new Button("close-modal");
    this.butNewCli = new Button("new-client-button");

    // Modal
    this.modal = new Modal("modal");

    // Column of clients
    this.potentialClient = new Column("potential_client", (id, currentColumn) =>
      this.changeOfZona(id, currentColumn)
    );
    this.nextToPay = new Column("next_to_pay", (id, currentColumn) =>
      this.changeOfZona(id, currentColumn)
    );
    this.paidCustomer = new Column("paid_customer", (id, currentColumn) =>
      this.changeOfZona(id, currentColumn)
    );
    this.columns = [this.potentialClient, this.nextToPay, this.paidCustomer];

    // This clients
    this.clients = {};

    // Functions of buttons
    this.butOpeMod.onClick(() => this.openModal());
    this.butCloMod.onClick(() => this.closeModal());
    this.butNewCli.onClickPreDef(() => this.createNewClient());
  }

  // Declare this model
  setModel(model) {
    this.model = model;
  }

  openModal(values) {
    this.modal.showModal(values);
  }

  closeModal() {
    this.modal.hideModal();
    this.modal.cleanModal();
  }

  createNewClient() {
    const values = this.modal.returnValues(); // Get Values of form
    const isNew = this.model.newClient({ ...values }); // Create new Client in model
    if (!isNew) return; // Client already exists
    // To id
    const { id } = { ...values };
    const newClient = new Client(id);
    const html = newClient.createHtml({ ...values });
    this.potentialClient.addChild(html);
    // Activate button of delete and edit
    newClient.addEventDelete((id) => this.deleteClient(id));
    newClient.addEventEdit((id) => this.editClient(id));

    this.clients[id] = newClient;

    this.closeModal();
  }

  deleteClient(id) {
    // Get data of client
    const client = this.model.getClient(id);
    // Delete of view
    const html = document.getElementById(`cliente ${client["id"]}`);
    const column = this.columns[client["column"] - 1];
    column.deleteChild(html);
    delete this.clients[id];
    // Delete of model
    this.model.deleteClient(id);
  }

  editClient(id) {
    // Get data of client
    const client = this.model.getClient(id);
    this.openModal({ ...client });
    this.butNewCli.onClickPreDef((id) => this.editClientCall(id), id);
  }

  editClientCall(id) {
    const values = this.modal.returnValues(); // Get Values of form
    const can = this.model.setValues(id, { ...values }); // Set data in model

    if (!can) return; // Client already exists
    const html = document.getElementById(`cliente ${id}`);

    html.id = `cliente ${values["id"]}`; // // Set id of view
    this.clients[values["id"]] = this.clients[id]; // Set id to trash and edit
    this.clients[values["id"]].setClient(values["id"]); // Set id to trash and edit

    this.clients[values["id"]].setHtml({ ...values });

    this.closeModal();
    this.butNewCli.onClickPreDef(() => this.createNewClient());
  }

  changeOfZona(id, currentColumn) {
    const values = this.model.getClient(id);
    const lastColumnNum = values["column"];
    const lastColumn = this.columns[lastColumnNum - 1];
    const html = document.getElementById(`cliente ${id}`);
    for (let i = 0; i < this.columns.length; i++) {
      if (this.columns[i].getColumn() === currentColumn) {
        lastColumn.deleteChild(html);
        this.columns[i].addChild(html);
        this.model.setColumn(id, i + 1);
      }
    }
  }
}
