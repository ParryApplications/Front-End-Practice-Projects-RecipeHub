import { initial } from "lodash-es";
import { BASE_URL, KEY } from "../../../starter/src/js/config.js";
import { BASE_URL, PAGE_SIZE, PAGE_BEGINS_WITH } from "./config.js";
import { getJson, sendJSON } from "./helpers.js";

//Collects all application storage/data:
export const state = {
  recipe: {},
  search: {
    query: "",
    result: {},
    page: PAGE_BEGINS_WITH,
    pageSize: PAGE_SIZE,
    totalPages: 0,
  },
  bookmark: [],
};

export async function loadRecipe(recipeId) {
  try {
    const data = await getJson(`${BASE_URL}${recipeId}`);

    // recipeView.consolePrint((res, data);
    const { recipe } = data.data; // === const recipe = data.data.recipe;

    state.recipe = {
      cookingTime: recipe.cooking_time,
      id: recipe.id,
      imageUrl: recipe.image_url,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      servings: recipe.servings,
      sourceUrl: recipe.source_url,
      title: recipe.title,
    };
    pageReset();

    if (state.bookmark.some((currElm) => currElm.id === recipeId)) {
      state.recipe.bookmark = true;
    } else {
      state.recipe.bookmark = false;
    }
    // console.log(state.recipe);
  } catch (err) {
    throw err;
  }
}

export async function loardSearchResults(query) {
  try {
    const data = await getJson(`${BASE_URL}?search=${query}`);
    state.search.query = query;
    state.search.result = data.data.recipes.map((res) => {
      return {
        id: res.id,
        imageUrl: res.image_url,
        publisher: res.publisher,
        title: res.title,
      };
    });
    console.log(state.search.result);
  } catch (err) {
    throw err;
  }
}

//Pagination Logic:
export function searchResultAsPerPage(page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * 10;
  const end = page * 10;
  // console.log(Object.values(state.search.result).length === 0);
  // if (Object.values(state.search.result).length === 0) return;

  return state.search.result.slice(start, end);
}

export function updateServings(newServings) {
  state.recipe.ingredients.forEach((currIngredients) => {
    currIngredients.quantity *= newServings / state.recipe.servings;
  });
  state.recipe.servings = newServings;
}

function pageReset() {
  state.search.page = PAGE_BEGINS_WITH;
}

export function addBookmark(recipeDetails) {
  state.bookmark.push(recipeDetails);
  preserveBookmarks();

  if (recipeDetails.id === state.recipe.id) state.recipe.bookmark = true;
}

export function removeBookmark(id) {
  const index = state.bookmark.findIndex((elm) => elm.id === id);
  state.bookmark.splice(index, 1);
  preserveBookmarks();

  if (id === state.recipe.id) state.recipe.bookmark = false;
}

function preserveBookmarks() {
  localStorage.setItem("bookmark", JSON.stringify(state.bookmark));
}

export function getLocalStorageBookmark() {
  const bookmark = localStorage.getItem("bookmark");
  // console.log(typeof JSON.stringify(bookmark));
  // console.log(typeof JSON.parse(bookmark));
  if (bookmark) state.bookmark = JSON.parse(bookmark);
}

function createRecipeObject(recipe, ingr = undefined) {
  return {
    cookingTime: Number(recipe.cookingTime),
    imageUrl: recipe.image,
    ingredients: ingr,
    publisher: recipe.publisher,
    servings: Number(recipe.servings),
    sourceUrl: recipe.sourceUrl,
    title: recipe.title,
  };
}

export async function uploadYourOwnRecipe(newRecipeObj) {
  try {
    console.log("uploadYourOwnRecipe() called");
    const newRecipeArr = Object.entries(newRecipeObj);

    //Transform data obj into our conditions:
    const ingr = newRecipeArr
      .filter((d) => {
        return d[0].startsWith("ingredient") && d[1] !== "";
      })
      .map((elm) => {
        const ingArr = elm[1].split(",").map((el) => el.trim());

        if (ingArr.length !== 3)
          throw new Error(
            "Wrong ingredient fromat! Please use the correct format :)"
          );

        const [quantity, unit, description] = ingArr;
        return {
          quntity: quantity ? Number(quantity) : null,
          unit,
          description,
        };
      });

    //Create recipe Object
    const finalRecipeData = createRecipeObject(newRecipeObj, ingr);

    //upload new recipe data to API:
    return await sendJSON(`${BASE_URL}?key=${KEY}`, finalRecipeData);
  } catch (err) {
    throw err;
  }
}
