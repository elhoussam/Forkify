import View from './View.js';
import myicons from 'url:../../img/icons.svg';
class PreviewView extends View {
  _parentElement = '';

  _generateMarkup() {
    let id = window.location.hash.slice(1);

    return `
        <li class="preview">
        <a class="preview__link ${
          id === this._data.id ? 'preview__link--active' : ''
        }" href="#${this._data.id}">
          <figure class="preview__fig">
            <img src="${this._data.imageUrl}"  alt="${this._data.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${this._data.title}</h4>
            <p class="preview__publisher">  ${this._data.publisher} </p>
       
          </div>
          <div class="preview__user-generated ${
            this._data.key ? '' : 'hidden'
          }">
          <svg>
            <use href="${myicons}#icon-user"></use>
          </svg>
        </div>
        </a>
      </li>`;
  }
}
export default new PreviewView();
