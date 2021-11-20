export default class Modal {
  constructor(id) {
    this.modal = document.getElementById(id);
    this.form = document.getElementById("modal_form");
  }

  showModal(values) {
    this.modal.classList.add("active");
    if (!values) return;
    const elements = this.form.elements;
    for (const elemnt of elements) {
      if (elemnt.id === "new-client-button") continue;
      elemnt.value = values[elemnt.name];
    }
  }

  hideModal() {
    this.modal.classList.remove("active");
  }

  returnValues() {
    const elements = this.form.elements;
    const values = {};
    for (const elemnt of elements) values[elemnt.name] = elemnt.value;
    return { ...values };
  }

  cleanModal() {
    const elements = this.form.elements;
    for (const elemnt of elements) {
      if (elemnt.id === "new-client-button") continue;
      elemnt.value = "";
    }
  }
}
