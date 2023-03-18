import NewApiService from './api';
import { refs } from './refs';
import {
  clearRenderMarkup,
  createImagesMarkup,
  renderMarkup,
} from './render-functions';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
SimpleLightbox;
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});

refs.btnLoadMore.disabled = false;
const newApiService = new NewApiService();

export async function onFormSubmit(event) {
  event.preventDefault();

  try {
    refs.btnLoadMore.classList.add('is-visible');
    //зберігаємо значення пошуку
    newApiService.query = event.currentTarget.elements.searchQuery.value;
    if (newApiService.query === '') {
      Notiflix.Notify.warning('Please enter a request!');
      return;
    }
    newApiService.resetPage();

    newApiService.getAllImages().then(({ hits, totalHits }) => {
      console.log(totalHits);

      if (hits.length === 0) {
        Notiflix.Notify.warning(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      //Під час пошуку за новим ключовим словом  повністю очищаємо вміст галереї
      clearRenderMarkup(refs.gallery);

      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);

      renderMarkup(refs.gallery, createImagesMarkup(hits));
    });
  } catch (error) {
    console.log(error.messege);
  }
}

export async function onBtnLoadMoreClick(event) {
  try {
    newApiService.getAllImages().then(({ hits, totalHits }) => {
      const totalImages = hits.length * (newApiService.page - 1);

      if (totalImages === totalHits) {
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
        refs.btnLoadMore.disabled = true;
      }
      renderMarkup(refs.gallery, createImagesMarkup(hits));
    });
  } catch (error) {
    console.log(error.messege);
  }
}
