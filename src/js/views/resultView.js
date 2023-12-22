import View from './View.js';
import myicons from 'url:../../img/icons.svg';
import previewView from './previewView.js';
class resultView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No thing found match your query';
  _message = '';
  _generateMarkup() {
    return this._data.map(res => previewView.render(res, false)).join('');
  }
}
export default new resultView();
