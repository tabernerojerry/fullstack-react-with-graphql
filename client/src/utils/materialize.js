import { FormSelect } from "materialize-css";

(() => {
  const doc = document;

  doc.addEventListener("DOMContentLoaded", () => {
    const elems = doc.querySelectorAll("select");
    FormSelect.init(elems);
  });
})();
