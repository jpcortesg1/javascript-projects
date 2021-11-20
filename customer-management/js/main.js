import Model from "./Model.js";
import View from "./View.js";

document.addEventListener("DOMContentLoaded", () => {
  const model = new Model();
  const view = new View();

  // Add view to model
  model.setView(view);

  // Add model to view
  view.setModel(model);
});
