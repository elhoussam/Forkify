import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE } from './config';
import { getJSON } from './helpers';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    ResultPerPage: RES_PER_PAGE,
  },
  foodMarks: [],
};

export const loadRecipe = async function (id) {
  try {
    const rawdata = await getJSON(`${API_URL}${id}`);

    const { recipe } = rawdata.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      imageUrl: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    if (state.foodMarks.some(foodMark => foodMark.id === id))
      state.recipe.foodMarked = true;
    else state.recipe.foodMarked = false;

    console.log(state.recipe);
  } catch (ev) {
    console.error(`${ev} 💥💥💥📑 💥`);

    throw ev;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    // console.log(data);
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        imageUrl: rec.image_url,
      };
    });
    state.search.page = 1;
    console.log(state.recipe);
  } catch (error) {
    console.error(`${error} 💥💥💥💥`);

    throw error;
  }
};

export const getSearchResultsPage = function (
  selectedPage = state.search.page
) {
  state.search.page = selectedPage;
  return state.search.results.slice(
    (selectedPage - 1) * state.search.ResultPerPage,
    selectedPage * state.search.ResultPerPage
  );
};

export const getCurrentSelectedPage = function () {
  return state.search.page;
};

export const updateRecipeServings = function (newServings) {
  state.recipe.ingredients.forEach(element => {
    element.quantity = (element.quantity * newServings) / state.recipe.servings;
  });

  state.recipe.servings = newServings;
};

export const showMetheState = function () {
  // console.log(state);
};
// loadSearchResults('pizza');

const persistFoodMarks = function () {
  localStorage.setItem('foodmarks', JSON.stringify(state.foodMarks));
};
export const addFoodMark = function (recipe) {
  // check if the recipe is foodmarked
  // if ( state.foodMarks.some())

  state.foodMarks.push(recipe);

  // mark current recipe as marked

  if (recipe.id === state.recipe.id) state.recipe.foodMarked = true;

  persistFoodMarks();
};

export const deleteFoodMark = function (id) {
  const index = state.foodMarks.findIndex(el => el.id === id);
  const recipe = state.foodMarks.splice(index, 1);

  if (id === state.recipe.id) state.recipe.foodMarked = false;
  // if (recipe.id === state.recipe.id) state.recipe.foodMarked = false;

  persistFoodMarks();
};
export const uploadNewRecipe = function (Recipe) {
  console.log('Model upload :', Recipe);
};
const init = function () {
  const storage = localStorage.getItem('foodmarks');
  if (storage) state.foodMarks = JSON.parse(storage);
};

init();
