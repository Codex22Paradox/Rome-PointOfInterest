import {
  setLayers,
  setCenter,
  setZoom,
  addMarker,
  initOverlay,
  creaVector,
} from "/src/map.js";

export const createDetails = (dict) => {
  return dict.testo;
};

export const createTitle = (dict) => {
  return dict.titolo;
};



const template = `<div id="caroselliImmagini" class="carousel slide" data-bs-ride="carousel" style="display: block;">
    <div class="carousel-inner">
      %ELEMENTI
    <button class="carousel-control-prev" type="button" data-bs-target="#caroselliImmagini" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#caroselliImmagini" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>`;

const innerTemplate = `<div class="carousel-item">
    <img src="%SRC" class="img-card img-fluid" style="width: 25rem; height: 17rem;" alt="..." >
  </div>`;

const innerTemplateActive = `<div class="carousel-item active">
  <img src="%SRC" class="img-card img-fluid" style="width: 25rem; height: 17rem;" alt="...">
</div>`;

export const createCarousel = (dict) => {
  const totale = template;
  const array = dict.immagini;
  let elementi = innerTemplateActive.replace("%SRC", array[0]);
  for (let i = 1; i < array.length; i++) {
    elementi += innerTemplate.replace("%SRC", array[i]);
  }
  console.log(elementi);
  return totale.replace("%ELEMENTI", elementi);
};

export const createMap = (map, centro, zoom, bool) => {
  setLayers(map, bool);
  setCenter(map, centro); //setto il centro della mappa
  setZoom(map, zoom); //Setto lo zoom
  initOverlay(map);
}