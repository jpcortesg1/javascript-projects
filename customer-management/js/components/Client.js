export default class Client {
  constructor(id) {
    this.client = id;
    this.html;
  }

  setHtml(values) {
    const items = this.html.children;

    items[0].innerText = `${values["name"]}`;
    items[1].innerHTML = `
      <p class="client_data">
        <span class="client_data_span">id:</span> ${values["id"]}
      </p>`;
    items[2].innerHTML = `
      <p class="client_data">
        <span class="client_data_span">phone:</span> ${values["phone"]}
      </p>`;
    items[3].innerHTML = `
      <p class="client_data">
        <span class="client_data_span">email:</span> ${values["email"]}
      </p>`;
    items[4].innerHTML = `
      <p class="client_data">
        <span class="client_data_span">products:</span> ${values["products"]}
      </p>`;
  }

  setClient(id) {
    this.client = id;
  }

  getZone() {
    const items = document.querySelectorAll(
      "#potential_client .client .client_button"
    );
    const item = items[items.length - 1];
    const elements = item.children;
    return elements;
  }

  addEventDelete(callback) {
    const elements = this.getZone();
    const element = elements[0];
    element.addEventListener("click", () => {
      callback(this.client);
    });
  }

  addEventEdit(callback) {
    const elements = this.getZone();
    const element = elements[1];
    element.addEventListener("click", () => {
      callback(this.client);
    });
  }

  createHtml(values) {
    const div = document.createElement("div");
    div.classList.add("client");
    div.id = `cliente ${values["id"]}`;
    div.innerHTML = `
      <h3 class="client_name">${values["name"]}</h3>
      <p class="client_data">
        <span class="client_data_span">id:</span> ${values["id"]}
      </p>
      <p class="client_data">
        <span class="client_data_span">phone:</span> ${values["phone"]}
      </p>
      <p class="client_data">
        <span class="client_data_span">email:</span> ${values["email"]}
      </p>
      <p class="client_data">
        <span class="client_data_span">products:</span> ${values["products"]}
      </p>

      <div class="client_button">
        <ion-icon name="trash" class="client_button_icon"></ion-icon>
        <ion-icon name="create" class="client_button_icon"></ion-icon>
      </div>
    `;

    div.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("client", this.client);
    });

    this.html = div;

    return div;
  }
}
