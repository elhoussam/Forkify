import myicons from 'url:../../img/icons.svg';
// import { Fraction } from 'fractional';
import fracty from 'fracty';

import View from './View.js';

class recipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _errorMessage = 'We could not find that recipe please try another One!';
  _message = '';

  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--tiny');
      if (!btn) return;
      console.log(btn);
      const updateto = +btn.dataset.updateTo;
      // console.log(updateto + typeof updateto);
      if (updateto > 0) handler(updateto);
    });
  }

  addHandlerAddFoodMark(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--foodmark');
      if (!btn) return;
      handler();
    });
  }
  _generateMarkup() {
    return `
    <figure class="recipe__fig">
          <img src="${this._data.imageUrl}" alt="Tomato" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this._data.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${myicons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              this._data.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${myicons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              this._data.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--update-servings" data-update-to="${
                this._data.servings - 1
              }">
                <svg>
                  <use href="${myicons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--update-servings" data-update-to="${
                this._data.servings + 1
              }">
                <svg>
                  <use href="${myicons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>
          <div class="recipe__user-generated ${this._data.key ? '' : 'hidden'}">
            <svg>
              <use href="${myicons}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round btn--foodmark">
            <svg class="">
              <use href="${myicons}#icon-bookmark${
      this._data.foodMarked ? '-fill' : ''
    }"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
          ${this._data.ingredients
            .map(ing => this._generateIngredient(ing))
            .join('')}
          


          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              this._data.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="http://thepioneerwoman.com/cooking/pasta-with-tomato-cream-sauce/"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${myicons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
        `;
  }
  _generateIngredient(ing) {
    return `<li class="recipe__ingredient">
      <svg class="recipe__icon">
        <use href="${myicons}#icon-check"></use>
      </svg>
      <div class="recipe__quantity">${
        ing.quantity ? new fracty(ing.quantity).toString() : ''
      }</div>
      <div class="recipe__description">
        <span class="recipe__unit">${ing.unit}</span>
        ${ing.description}
      </div>
    </li>`;
  }
}

export default new recipeView();
