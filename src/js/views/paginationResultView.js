import icons from "url:../../img/icons.svg";
import { PAGE_BEGINS_WITH } from "../config.js";
import View from "./View.js";

class paginationResultView extends View {
  _parentEl = document.querySelector(".pagination");

  _totalPageCalculator(modelState) {
    return Math.ceil(
      modelState.search.result.length / modelState.search.pageSize
    );
  }

  _generateMarkup(modelStateSearch) {
    // console.log("total number of pages: " + modelStateSearch.totalPages);

    const currentPage = modelStateSearch.page;

    if (
      modelStateSearch.totalPages > modelStateSearch.page &&
      modelStateSearch.page === PAGE_BEGINS_WITH
    ) {
      //Page 1, with others
      return `
          <button data-goto=${
            currentPage + 1
          } class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
      `;
    }

    if (modelStateSearch.totalPages === modelStateSearch.page) {
      //last page
      return `
          <button data-goto=${
            currentPage - 1
          } class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
          </button>
      `;
    }

    if (modelStateSearch.totalPages > modelStateSearch.page) {
      //other pages
      return `
          <button data-goto=${
            currentPage - 1
          } class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
          </button>

          <button data-goto=${
            currentPage + 1
          } class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
      `;
    }

    //Page 1, no others:
    return;
  }

  addPaginationHandler(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const targetBtnElement = e.target.closest(".btn--inline");
      // console.log(e);
      // console.log(e.target);
      // console.log(targetBtnElement);

      if (!targetBtnElement) return;

      const gotoPage = Number(targetBtnElement.dataset.goto);
      handler(gotoPage);
    });
  }
}

export default new paginationResultView();
