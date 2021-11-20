export default class Column {
  constructor(id, callback) {
    this.column = document.getElementById(id);
    this.column.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    this.column.addEventListener("drop", (e) => {
      const id = e.dataTransfer.getData("client");
      callback(id, this.column)
    });
  }

  getColumn(){
    return this.column;
  }

  addChild(html) {
    this.column.appendChild(html);
  }

  deleteChild(html) {
    this.column.removeChild(html);
  }
}
