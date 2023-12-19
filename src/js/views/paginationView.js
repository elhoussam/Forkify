import View from './View.js';
import myicons from 'url:../../img/icons.svg';
class paginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      e.preventDefault();
      const btn = e.target.closest('.btn--inline');
      console.log(btn);
      if (!btn) return;

      const pageNum = +btn.dataset.goto;

      console.log(pageNum);

      handler(pageNum);
    });
  }
  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.ResultPerPage
    );

    const curPage = this._data.page;

    // page one there are other pages
    if (numPages > 1 && curPage === 1) {
      return `
      <button data-goto="${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
      <span> Page ${curPage + 1}</span>
      <svg class="search__icon">
        <use href="${myicons}#icon-arrow-right"></use>
      </svg>
      </button>`;
    }

    // other pages
    if (curPage < numPages) {
      return `
      <button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${myicons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${curPage - 1}</span>
        </button>

        <button data-goto="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
              <span> Page ${curPage + 1}</span>
              <svg class="search__icon">
                <use href="${myicons}#icon-arrow-right"></use>
              </svg>
              </button>
      `;
    }

    // last page
    if (curPage === numPages && curPage > 1) {
      return `
      <button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${myicons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${curPage - 1}</span>
        </button>
        `;
    }
    // page one no other pages
    return `only one page`;
  }
}

export default new paginationView();
