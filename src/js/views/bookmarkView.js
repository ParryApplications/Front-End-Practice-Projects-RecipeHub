import icons from "url:../../img/icons.svg";
import { state } from "../model.js";
import View from "./View.js";

class bookmarkView extends View {
  _parentEl = document.querySelector(".bookmarks__list");

  _defaultErrorMsg = "Something wrong with the Bookmark List.";

  _generateMarkup(results) {
    // console.log(selectedRecipeId);
    if (Array.isArray(results) && results.length === 0) {
      return `
                  <div class="message">
                    <div>
                      <svg>
                        <use href="${icons}#icon-alert-triangle"></use>
                      </svg>
                    </div>
                    <p>
                      No bookmarks yet. Find a nice recipe and bookmark it :)
                    </p>
                  </div>
      `;
    }

    return results
      .map((result) => {
        //TODO: const selectedRecipeId = window.location.hash.slice(1);
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

  onWindowLoad(handler) {
    window.addEventListener("load", function () {
      handler();
    });
  }
}

export default new bookmarkView();
