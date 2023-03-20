import NewApiService from './api';
import { refs } from './refs';
import {
  clearRenderMarkup,
  createImagesMarkup,
  renderMarkup,
} from './render-functions';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});

const newApiService = new NewApiService();

export async function onFormSubmit(event) {
  event.preventDefault();

  try {
    //зберігаємо значення пошуку
    newApiService.query = event.currentTarget.elements.searchQuery.value.trim();
    if (newApiService.query === '') {
      Notiflix.Notify.warning('Please enter a request!');
      return;
    }
    newApiService.resetPage();

    const { hits, totalHits } = await newApiService.getAllImages();

    if (hits.length === 0) {
      clearRenderMarkup(refs.gallery);
      refs.btnLoadMore.classList.remove('is-visible');
      Notiflix.Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    //Під час пошуку за новим ключовим словом  повністю очищаємо вміст галереї
    clearRenderMarkup(refs.gallery);
    refs.form.reset();
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);

    renderMarkup(refs.gallery, createImagesMarkup(hits));
    lightbox.refresh();
    refs.btnLoadMore.classList.add('is-visible');
  } catch (error) {
    console.log(error.messege);
  }
}

export async function onBtnLoadMoreClick(event) {
  try {
    const { hits, totalHits } = await newApiService.getAllImages();

    const totalImages = hits.length * (newApiService.page - 1);
    console.log(hits.length);
    if (totalImages === totalHits || hits.length < newApiService.perPage) {
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
      refs.btnLoadMore.classList.remove('is-visible');
    }
    renderMarkup(refs.gallery, createImagesMarkup(hits));
    lightbox.refresh();
  } catch (error) {
    console.log(error.messege);
  }
}
