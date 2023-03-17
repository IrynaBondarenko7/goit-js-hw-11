import Notiflix from 'notiflix';
import { onBtnLoadMoreClick, onFormSubmit } from './js/handlers';
import { refs } from './js/refs';
// Notiflix.Notify.warning('Memento te hominem esse');

refs.form.addEventListener('submit', onFormSubmit);
refs.btnLoadMore.addEventListener('click', onBtnLoadMoreClick);
