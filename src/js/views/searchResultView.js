import icons from "url:../../img/icons.svg";
import View from "./View.js";

class searchResultView extends View {
  _parentEl = document.querySelector(".results");

  _defaultErrorMsg =
    "No results match with your search. Consider refining your search or checking for typos.";

  _generateMarkup(results) {
    // console.log(selectedRecipeId);
    return results
      .map((result) => {
        const selectedRecipeId = window.location.hash.slice(1);
        // console.log(selectedRecipeId);
        return `
        <li class="preview">
          <a class="preview__link " href="#${result.id}">
            <figure class="preview__fig">
              <img src="${result.imageUrl}" alt="Test" />
            </figure>
            <div class="preview__data">
              <h4 class="preview__title">${result.title}</h4>
              <p class="preview__publisher">${result.publisher}</p>
              <div class="preview__user-generated">
                <svg>
                  <use href="${icons}#icon-user"></use>
                </svg>
              </div>
            </div>
          </a>
        </li>`;
      })
      .join("");
  }
}

export default new searchResultView();
