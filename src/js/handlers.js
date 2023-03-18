import NewApiService from './api';
import { refs } from './refs';
import { createImagesMarkup, renderMarkup } from './render-functions';

const newApiService = new NewApiService();

export async function onFormSubmit(event) {
  event.preventDefault();

  try {
    //зберігаємо значення пошуку
    newApiService.query = event.currentTarget.elements.searchQuery.value;
    newApiService.resetPage();
    // const { hits } = await getAllImages(searchValue);

    newApiService.getAllImages().then(hits => {
      console.log(hits);
      renderMarkup(refs.gallery, createImagesMarkup(hits));
    });
  } catch (error) {
    console.log(error.messege);
  }
}

export async function onBtnLoadMoreClick(event) {
  try {
    newApiService.getAllImages().then(hits => {
      console.log(hits);
      renderMarkup(refs.gallery, createImagesMarkup(hits));
    });
    // const { hits } = await getAllImages(searchValue);
    // renderMarkup(refs.gallery, createImagesMarkup(hits));
  } catch (error) {
    console.log(error.messege);
  }
}
