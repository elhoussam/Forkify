import View from './View.js';
import myicons from 'url:../../img/icons.svg';
class resultView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No thing found match your query';
  _message = '';
  _generateMarkup() {
    return this._data.map(rec => this._generateMarkupPreview(rec)).join('');
  }

  _generateMarkupPreview(preview) {
    let id = window.location.hash.slice(1);

    return `
        <li class="preview">
        <a class="preview__link ${
          id === preview.id ? 'preview__link--active' : ''
        }" href="#${preview.id}">
          <figure class="preview__fig">
            <img src="${preview.imageUrl}" alt="${preview.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${preview.title}</h4>
            <p class="preview__publisher">  ${preview.publisher} </p>
       
          </div>
        </a>
      </li>`;
  }
}
export default new resultView();
