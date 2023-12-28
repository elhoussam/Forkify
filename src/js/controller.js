import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import foodMarkView from './views/foodMarkView.js';
import paginationView from './views/paginationView.js';
import AddRecipeView from './views/addRecipeView.js';

import { MODAL_CLOSE_SEC } from './config';
import 'core-js/stable'; // polyfiling
import 'regenerator-runtime/runtime'; // polyfiling async awaint
import addRecipeView from './views/addRecipeView.js';

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
    // resultView.render(model.getSearchResultsPage());
    resultView.render(model.getSearchResultsPage());
    foodMarkView.render(model.state.foodMarks);

    // debugger;
    const res = await model.loadRecipe(id);
    // const myirecipe = model.state.recipe;
    // console.log(model.state.recipe);
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
  foodMarkView.addHandlerRender(controlFoodmarks);
  recipeView.addHandlerRender(controleRecipe);
  searchView.addHandlerSearch(controleSearchResults);
  recipeView.addHandlerAddFoodMark(controleAddFoodmark);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerUpdateServings(controlServings);
  addRecipeView.AddHandlerUpload(controlUploadRecipe);
};

const controleAddFoodmark = function () {
  //  mark food
  // console.log(model.state.recipe.foodMarked);
  if (!model.state.recipe.foodMarked) model.addFoodMark(model.state.recipe);
  else model.deleteFoodMark(model.state.recipe.id);

  // update the view of recipe
  recipeView.update(model.state.recipe);

  // render the foodmarks
  foodMarkView.render(model.state.foodMarks);
};
const controlFoodmarks = function () {
  foodMarkView.render(model.state.foodMarks);
};
const controlUploadRecipe = async function (newRecipe) {
  let newRecipeObj = Object.fromEntries(newRecipe);
  console.log('Controle upload :', newRecipeObj);
  try {
    addRecipeView.renderSpinner();
    await model.uploadNewRecipe(newRecipeObj);
    //render recipe
    recipeView.render(model.state.recipe);

    // update food mark list
    foodMarkView.render(model.state.foodMarks);

    // use history API to change current ID

    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // render success messages
    addRecipeView.renderMessage('Upload recipe successfully');
    //close modal window
    setTimeout(function () {
      // addRecipeView.toggleWindow(), MODAL_CLOSE_SEC * 1000;
    });
  } catch (error) {
    AddRecipeView.renderError(error.message);
  }
};
init();
