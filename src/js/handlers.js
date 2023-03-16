import { getAllImages } from './api';
import { refs } from './refs';
import { createImagesMarkup, renderMarkup } from './render-functions';

export async function onFormSubmit(event) {
  event.preventDefault();

  try {
    const {
      elements: { searchQuery },
    } = event.currentTarget;
    const name = searchQuery.value;

    const { hits } = await getAllImages(name);
    console.log(hits);
    renderMarkup(refs.gallery, createImagesMarkup(hits));
  } catch (error) {
    console.log(error.messege);
  }
}
