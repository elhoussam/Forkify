import myicons from 'url:../../img/icons.svg';
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
