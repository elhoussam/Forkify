import View from './View.js';
import previewView from './previewView.js';
import myicons from 'url:../../img/icons.svg';
class foodMarkView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No Food marks yet, find a nice recipe and foodmark it 🙂 ';
  _message = '';
  _generateMarkup() {
    return this._data.map(res => previewView.render(res, false)).join('');
  }
}
export default new foodMarkView();
