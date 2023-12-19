class searchView {
  _parentElement = document.querySelector('.search');
  _errorMessage = 'We could not find that recipe please try another One!';
  _message = '';
  getQuery() {
    let query = this._parentElement.querySelector('.search__field').value;
    this._parentElement.querySelector('.search__field').value = '';
    return query;
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new searchView();
