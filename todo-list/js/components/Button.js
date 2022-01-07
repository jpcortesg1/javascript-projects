export default class Button {
  constructor(element) {
    this.button = document.getElementById(element);
  }

  onClick(callback) {
    this.button.onclick = () => {
      callback();
    };
  }
}
