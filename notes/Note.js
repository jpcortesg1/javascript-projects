class Note {
  constructor(id, title="New Note", description="Create your description...") {
    this.id = id;
    this.title = title;
    this.description = description;
    this.html = this.createHtml();
  }

  setTitle(tile) {
    this.title = tile;
    this.html.innerHTML = `
    <button onClick="showInfo(${this.id});" class="nav_files_button">
      ${this.title}
    </button>
    <ion-icon onClick="deleteNote(${this.id});" name="trash" class="nav_files_button_icon"></ion-icon>
  `;
  }

  setDescription(description) {
    this.description = description;
  }

  getHtml() {
    return this.html;
  }

  getId() {
    return this.id;
  }

  getTitle() {
    return this.title;
  }

  getDescription() {
    return this.description;
  }

  createHtml() {
    const div = document.createElement("div");
    div.classList.add("nav_files_buttons");
    div.id = `file ${this.id}`;
    div.innerHTML = `
      <button onClick="showInfo(${this.id});" class="nav_files_button">
        ${this.title}
      </button>
      <ion-icon onClick="deleteNote(${this.id});" name="trash" class="nav_files_button_icon"></ion-icon>
    `;

    return div;
  }
}
