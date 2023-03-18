export function createImagesMarkup(images) {
  return images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<a href="${largeImageURL}" class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" class="image"/>
  <div class="info">
    <p class="info-item">
      <b>Likes:</b>
          <span>${likes}</span>
    </p>
    <p class="info-item">
      <b>Views:</b>
        <span>${views}</span>
    </p>
    <p class="info-item">
      <b>Comments:</b>
       <span>${comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads:</b>
       <span>${downloads}</span>
    </p>
  </div>
</a>`
    )
    .join('');
}

export function renderMarkup(element, markup) {
  element.insertAdjacentHTML('beforeend', markup);
}

export function clearRenderMarkup(element) {
  element.innerHTML = '';
}
