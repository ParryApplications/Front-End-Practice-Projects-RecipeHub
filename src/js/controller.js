//Importing:
import icons from "url:../img/icons.svg";
// recipeView.consolePrint((icons);
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView";
import searchResultView from "./views/searchResultView.js";
import bookmarkView from "./views/bookmarkView.js";
import addRecipeView from "./views/addRecipeView";
import paginationResultView from "./views/paginationResultView";
import View from "./views/View.js";

// https://forkify-api.herokuapp.com/v2
// My API Key: 77c65f7f-e687-41df-bb92-835ec005c55e

///////////////////////////////////////

/**
 * To get a particular recipe:
 * None data will Return
 */
async function controlRecipes() {
  // console.log("controlRecipes() method triggered");
  try {
    const recipeId = window.location.hash.slice(1);

    //Validation on recipeId: (Guards)
    if (!recipeId) return;

    recipeView.spinnerView();

    // searchResultView._renderView(model.searchResultAsPerPage());

    await model.loadRecipe(recipeId);

    // recipeView.consolePrint(("recipeId :: " + recipeId);

    //Setting recipeDetails to UI:
    // recipeView.consolePrint((model.state.recipe);
    recipeView._renderView(model.state.recipe);

    // recipeView.update(model.state.recipe);
  } catch (err) {
    console.error(err);
    recipeView.renderError();
  }
}

function updateNewServings(newServings) {
  if (newServings < 1) return;

  model.updateServings(newServings);
  recipeView._renderView(model.state.recipe);
  // recipeView.update(model.state.recipe);
}

async function controlSearch() {
  // console.log("controlSearch() method triggered");
  try {
    const query = searchView.getQuery();
    if (!query || query.trim().length === 0) {
      searchView._clearSearchField();
      return;
    }

    searchResultView.spinnerView();
    await model.loardSearchResults(query);
    if (
      Array.isArray(model.state.search.result) &&
      model.state.search.result.length === 0
    ) {
      searchResultView.renderError();
      return;
    }
    searchResultView._renderView(model.searchResultAsPerPage());
    console.log(model.state.recipe);
    //Finding total Pages:
    model.state.search.totalPages = paginationResultView._totalPageCalculator(
      model.state
    );
    paginationResultView._renderView(model.state.search);
  } catch (err) {
    searchResultView.renderError();
  }
}

function paginationHandler(page) {
  searchResultView._renderView(model.searchResultAsPerPage(page));
  paginationResultView._renderView(model.state.search);
}

function bookmarkHandler() {
  if (!model.state.recipe.bookmark) {
    model.addBookmark(model.state.recipe);
  } else model.removeBookmark(model.state.recipe.id);

  bookmarkView._renderView(model.state.bookmark);
  recipeView._renderView(model.state.recipe);
}

function bookmarkLoad() {
  model.getLocalStorageBookmark();
  bookmarkView._renderView(model.state.bookmark);
}

async function uploadNewRecipeHandler(dataObj) {
  try {
    console.log("uploadNewRecipeHandler called");
    const data = model.uploadYourOwnRecipe(dataObj);
    console.log(data);
  } catch (err) {
    addRecipeView.renderError(err.message);
  }
}

//Passing a particular recipe: (TESTING PURPOSE)
// const recipeId = "5ed6604591c37cdc054bc886";
//Calling API to get a particular recipeId data:
// controlRecipes(recipeId);

//Tracking for whatever recipe is clicked or opened in a new tab:
//Subscribers:
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addSearchListenerHandler(controlSearch);
  paginationResultView.addPaginationHandler(paginationHandler);
  recipeView.updateServingsHandler(updateNewServings);
  recipeView.bookmarkEventHandler(bookmarkHandler);
  bookmarkView.onWindowLoad(bookmarkLoad);
  addRecipeView._uploadNewRecipeListener(uploadNewRecipeHandler);
};

init();

//IMPORTANT NOTES:
/* 
1) to convert string to document, used document.createRange().createContextualFragment(<String>);
2) to convert a non-array to array, use Array.from();


*/
