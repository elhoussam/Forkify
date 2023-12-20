import myicons from 'url:../../img/icons.svg';
import { getCurrentSelectedPage } from '../model';
export default class View {
  _data;
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    let markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    let NewMarkup = this._generateMarkup();

    // create DOM Object from html text
    let newDOM = document.createRange().createContextualFragment(NewMarkup);
    let newElements = Array.from(newDOM.querySelectorAll('*'));
    let curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      // Updates changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // only if its not equal the node and contain text
        console.log(curEl, '=>', newEl);
        curEl.textContent = newEl.textContent;
      }

      // Updates changed ATTRIBUES
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }
  renderSpinner = function () {
    let markup = `     
    <div class="spinner">   <svg>
    <use href="${myicons}#icon-loader"></use>
    </svg>
    </div> `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  };
  _clear() {
    this._parentElement.innerHTML = ``;
  }

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }
  renderError(message = this._errorMessage) {
    let markup = `
    <div class="error">
    <div>
      <svg>
        <use href="${myicons}#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div> `;

    this._clear();
    this._parentElement.insertAdjacentHTML('beforeend', markup);
  }
}
