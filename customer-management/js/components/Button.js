export default class Button {
  constructor(id) {
    this.button = document.getElementById(id);
  }

  setNot(bool) {
    this.not = bool;
  }

  onClick(callback) {
    this.button.onclick = () => {
      callback();
    };
  }

  onClickPreDef(callback, id) {
    this.button.onclick = (e) => {
      e.preventDefault();
      callback(id);
    };
  }
}
