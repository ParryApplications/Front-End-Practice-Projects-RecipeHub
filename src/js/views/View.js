import icons from "url:../../img/icons.svg";

export default class View {
  _clearViewHtml() {
    this._parentEl.innerHTML = "";
  }

  spinnerView() {
    //Spinner:
    const spinnerDiv = `
     <div class="spinner">
       <svg>
         <use href="${icons}#icon-loader"></use>
       </svg>
     </div>
     `;

    this._clearViewHtml();
    this._parentEl.insertAdjacentHTML("afterbegin", spinnerDiv);
  }

  renderError(errorMessage = this._defaultErrorMsg) {
    const errorMarkup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${errorMessage}</p>
      </div>`;

    this._clearViewHtml();
    this._parentEl.insertAdjacentHTML("afterbegin", errorMarkup);
  }

  consolePrint(msg) {
    recipeView.consolePrint(msg);
  }

  _renderView(data) {
    const markupResult = this._generateMarkup(data);
    this._clearViewHtml();
    this._parentEl.insertAdjacentHTML("afterbegin", markupResult);
  }

  //the content which updated, that only refreshes:
  update(data) {
    const updatedMarkup = this._generateMarkup(data);

    //converting string into DOM:
    const newDOMElm = document
      .createRange()
      .createContextualFragment(updatedMarkup)
      .querySelectorAll("*");
    const oldDOMElm = this._parentEl.querySelectorAll("*");

    // console.log(newDOMElm);
    // console.log(oldDOMElm);

    // console.log(Array.from(newDOMElm));
    // console.log(Array.from(oldDOMElm));

    //....for further code, refer 302 lecture of JS
  }
}
