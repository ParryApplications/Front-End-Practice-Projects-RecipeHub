import icons from "url:../../img/icons.svg";
import View from "./View.js";

class addRecipeView extends View {
  _parentEl = document.querySelector(".upload");

  _window = document.querySelector(".add-recipe-window");
  _overlay = document.querySelector(".overlay");

  _closeModalBtn = document.querySelector(".btn--close-modal");
  _openModalBtn = document.querySelector(".nav__btn--add-recipe");

  _defaultErrorMsg = "Error while uploading new Recipe";

  constructor() {
    super();
    this._openAddRecipeModalHandler();
    this._closeAddRecipeModalHandler();
  }

  _generateMarkup(results) {}

  _toggleAddRecipeWindow() {
    this._window.classList.toggle("hidden");
    this._overlay.classList.toggle("hidden");
  }

  _openAddRecipeModalHandler() {
    this._openModalBtn.addEventListener(
      "click",
      this._toggleAddRecipeWindow.bind(this)
    );
  }
  _closeAddRecipeModalHandler() {
    this._closeModalBtn.addEventListener(
      "click",
      this._toggleAddRecipeWindow.bind(this)
    );
  }

  _uploadNewRecipeListener(handler) {
    this._parentEl.addEventListener("submit", function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const dataObj = Object.fromEntries(dataArr);
      // console.log(dataArr, dataObj);
      handler(dataObj);
    });
  }
}

export default new addRecipeView();
