import { createDetails, createTitle, createCarousel, createMap} from "/dettagli/dettagli.js";

const poi = JSON.parse(localStorage.getItem("POI"));
console.log(poi);
const container = document.getElementById("popup");
const centro = poi.lonLat; //coordinate Roma
const map = new ol.Map({
  target: document.querySelector(".map"),
  /*view: new ol.View({
    center: centroRoma,
    minZoom: 0,
    maxZoom: 15,
  })*/
});


const dettagliTitolo = document.getElementById("dettagliTitolo");
const dettagliTesto = document.getElementById("dettagliTesto");
dettagliTitolo.innerHTML = createTitle(poi);
dettagliTesto.innerHTML = createDetails(poi);

const dettagliImmagini = document.getElementById("dettagliImmagini");
dettagliImmagini.innerHTML = createCarousel(poi);
createMap(map, centro, 18, false);

