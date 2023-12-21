import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable'; // polyfiling
import 'regenerator-runtime/runtime'; // polyfiling async awaint

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

console.log('Starters');

if (module.hot) {
  module.hot.accept;
}

const controleRecipe = async function () {
  try {
    let id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // fetching data
    resultView.render(model.getSearchResultsPage());

    await model.loadRecipe(id);
    const myirecipe = model.state.recipe;

    // rendering the data
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.log(err);
    recipeView.renderError(
      'We could not find that recipe please try another One!'
    );
    // alert(err);
  }
};

const controleSearchResults = async function () {
  try {
    resultView.renderSpinner();

    // get the search query
    const query = searchView.getQuery();
    if (!query) return;

    // loding the search result
    await model.loadSearchResults(query);

    // Render the search result
    resultView.render(model.getSearchResultsPage(1));

    // render the pagination view
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
    resultView.renderError(
      'We could not find that recipe please try another One!'
    );
  }
};
const controlPagination = function (numberPage) {
  // Render the search result
  resultView.render(model.getSearchResultsPage(numberPage));

  // render the pagination view
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // update the recipe in the State...
  model.updateRecipeServings(newServings);
  // update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
  model.showMetheState();
};
const init = function () {
  recipeView.addHandlerRender(controleRecipe);
  searchView.addHandlerSearch(controleSearchResults);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerUpdateServings(controlServings);
};

init();