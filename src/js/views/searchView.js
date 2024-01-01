import icons from "../../img/icons.svg";

class searchView {
  _parentEl = document.querySelector(".search");
  #searchFiled = document.querySelector(".search__field");

  getQuery() {
    return this.#searchFiled.value;
  }

  _clearSearchField() {
    this.#searchFiled.value = "";
  }

  //Publisher:
  addSearchListenerHandler(handler) {
    this._parentEl.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new searchView();
