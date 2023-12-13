import {
  setLayers,
  setCenter,
  setZoom,
  addMarker,
  initOverlay,
  creaVector,
} from "/src/map.js";

export const createMap = (map, centro, zoom, bool) => {
  setLayers(map, bool);
  setCenter(map, centro); //setto il centro della mappa
  setZoom(map, zoom); //Setto lo zoom
}