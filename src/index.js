import Notiflix from 'notiflix';
import { onFormSubmit } from './js/handlers';
import { refs } from './js/refs';
// Notiflix.Notify.warning('Memento te hominem esse');

refs.form.addEventListener('submit', onFormSubmit);
