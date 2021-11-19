import Client from "./Client.js";

const newButton = document.getElementById("new-button");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("close-modal");
const newClientButton = document.getElementById("new-client-button");

const potentialClient = document.getElementById("potential_client");
const potentialClientObject = {};
preventDrag(potentialClient);
newDrop(potentialClient);

const nextToPay = document.getElementById("next_to_pay");
const nextToPayObject = {};
preventDrag(nextToPay);
newDrop(nextToPay);

const paidCustomer = document.getElementById("paid_customer");
const paidCustomerObject = {};
preventDrag(paidCustomer);
newDrop(paidCustomer);

const zones = [potentialClient, nextToPay, paidCustomer];
const zonesObject = [
  potentialClientObject,
  nextToPayObject,
  paidCustomerObject,
];

const clients = {};

// Open modal to create new Client
newButton.addEventListener("click", function () {
  modal.classList.add("active");
});

// Button to close modal
closeModal.addEventListener("click", () => {
  closeModalF();
});

// Button to send info to new client
newClientButton.addEventListener("click", (e) => {
  e.preventDefault();
  const idClient = document.getElementById("id-client");
  const nameClient = document.getElementById("name-client");
  const phoneClient = document.getElementById("phone-client");
  const emailClient = document.getElementById("email-client");
  const productsClient = document.getElementById("products-client");

  const newClient = new Client(
    idClient.value,
    nameClient.value,
    phoneClient.value,
    emailClient.value,
    productsClient.value
  );

  const html = newClient.getHtml();
  potentialClient.appendChild(html);
  potentialClientObject[newClient.getId()] = newClient;
  clients[newClient.getId()] = newClient;

  idClient.value = "";
  nameClient.value = "";
  phoneClient.value = "";
  emailClient.value = "";
  productsClient.value = "";

  closeModalF();
});

function closeModalF() {
  modal.classList.remove("active");
}

function preventDrag(item) {
  item.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
}

function newDrop(item) {
  item.addEventListener("drop", (e) => {
    const idClient = e.dataTransfer.getData("client");
    const movedClient = clients[idClient];
    const movedZone = movedClient.getState();
    const currentZone = currentItem(item);
    const html = movedClient.getHtml();

    // Change html
    zones[movedZone - 1].removeChild(html);
    zones[currentZone - 1].appendChild(html);

    // Change state of cliente
    movedClient.setState(currentZone);

    // Change objects
    zonesObject[movedZone - 1][idClient] = null;
    zonesObject[currentZone - 1][idClient] = movedClient;

    // console.log(zonesObject[movedZone - 1], zonesObject[currentZone - 1]);
  });
}

function currentItem(item) {
  if (item.id == "potential_client") return 1;
  if (item.id == "next_to_pay") return 2;
  if (item.id == "paid_customer") return 3;
}

function deleteClient(id) {
  console.log(id);
}
