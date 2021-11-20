export default class Column {
  constructor(id) {
    this.column = document.getElementById(id);
  }

  addChild(html) {
    this.column.appendChild(html);
  }

  deleteChild(html) {
    this.column.removeChild(html);
  }
}
