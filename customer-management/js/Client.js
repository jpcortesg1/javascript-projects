export default class Client {
  constructor(
    id = null,
    name = null,
    phone = null,
    email = null,
    products = null
  ) {
    this.name = name;
    this.id = id;
    this.phone = phone;
    this.email = email;
    this.products = products;
    this.state = 1;
    this.html = this.createHtml();
  }

  setState(state){
    this.state = state;
  }

  getState() {
    return this.state;
  }

  getHtml() {
    return this.html;
  }

  getId() {
    return this.id;
  }

  createHtml() {
    const div = document.createElement("div");
    div.classList.add("client");
    div.id = this.id;
    div.innerHTML = `
      <h3 class="client_name">${this.name}</h3>
      <p class="client_data">
        <span class="client_data_span">id:</span> ${this.id}
      </p>
      <p class="client_data">
        <span class="client_data_span">phone:</span> ${this.phone}
      </p>
      <p class="client_data">
        <span class="client_data_span">email:</span> ${this.email}
      </p>
      <p class="client_data">
        <span class="client_data_span">products:</span> ${this.products}
      </p>

      <div class="client_button">
        <ion-icon name="trash" class="client_button_icon"></ion-icon>
        <ion-icon name="create" class="client_button_icon"></ion-icon>
      </div>
    `;

    div.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("client", this.id);
    });

    return div;
  }
}
