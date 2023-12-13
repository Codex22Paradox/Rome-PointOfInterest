let overlay;
const container = document.getElementById("popup");
const content = document.getElementById("popup-content");
const closer = document.getElementById("popup-closer");

/** 
Funzione per settare il primo layers
@param map => oggetto contenente la mappa
@param dark => boolean, gestisce il tema della mappa e dell'applicazione
*/
export function setLayers(map, dark) {
  const layers = [new ol.layer.Tile({source: new ol.source.OSM()})]; // crea un layer da Open Street Maps
  map.addLayer(new window.ol.layer.Group({layers})); // lo aggiunge alla mappa
}

/** 
Funzione per settare il centro della mappa
@param map => oggetto contenente la mappa
@param lonlat => array longitudine e latitudine del punto centrale
*/
export function setCenter(map, lonlat) {
  const center = window.ol.proj.fromLonLat(lonlat);
  map.getView().setCenter(center); //fissa il centro della mappa su una certa coppia di coordinate
}

/** 
Funzione per settare la dimensione dello zoom della mappa
@param map => oggetto contenente la mappa
@param zoom => valore dello zoom da applicare alla mappa
*/
export function setZoom(map, zoom) {
  map.getView().setZoom(zoom); // fissa il livello di zoom
}

/** 
Funzione per aggiungere un marker nella mappa
@param map => oggetto contente la mappa
@param point => oggetto contenente le coordinate del punto da inserire nella mappa
@return array => oggetto feature e layer
*/
export function addMarker(map, point) {
  const feature = new ol.Feature({
         geometry: new ol.geom.Point(ol.proj.fromLonLat(point.lonlat))                
  });
  feature.name = point.name;  
  const layer = new ol.layer.Vector({
     source: new ol.source.Vector({
         features: [feature]
     }),
    style: new ol.style.Style({
        image: new ol.style.Icon({
        anchor: [0.5, 1],
        crossOrigin: 'anonymous',
        src: 'https://docs.maptiler.com/openlayers/default-marker/marker-icon.png',
        })
    })
  });  
  map.addLayer(layer);  
}

/** 
Funzione per rimuovere un marker dalla mappa
@param map => oggetto che contiene la mappa
@param point => punto da eliminare dalla mappa
*/
export function removeMarker(map, point) {
  const feature = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.fromLonLat(point.lonlat)),
  });
  feature.name = point.name;
  console.log(point.name);
  const layer = new ol.layer.Vector({
    source: new ol.source.Vector({
      features: [feature],
    }),
    style: new ol.style.Style({
      image: new ol.style.Icon({
        anchor: [0.5, 1],
        crossOrigin: "anonymous",
        src: "https://docs.maptiler.com/openlayers/default-marker/marker-icon.png",
      }),
    }),
  });
  map.removeLayer(layer); //rimozione del punto
}

/** 
Funzione per visualizzare, alla pressione del segnaposto del point, il nome
@param map => oggetto contenente la mappa
*/
export function initOverlay(map, points) {
  overlay = new ol.Overlay({
       element: container,
       autoPan: true,
       autoPanAnimation: {
           duration: 250
       }
   });
  map.addOverlay(overlay);
  closer.onclick = function() {
     overlay.setPosition(undefined);
     closer.blur();
     return false;
  };

   map.on('singleclick', function (event) {
       if (map.hasFeatureAtPixel(event.pixel) === true) { // se esiste un marker
         map.forEachFeatureAtPixel(event.pixel, (feature, layer) => { // lo recupera
           const coordinate = event.coordinate; // ne prende le coordinate
           const index = trovaIndicePerTitolo(points, feature.name);
            content.innerHTML = feature.name; // cambia il testo del popup
            content.onclick = () =>{
            localStorage.setItem("Provenienza", "User");
            localStorage.setItem("Precisione", "Mappa");
            localStorage.setItem("POI", JSON.stringify(points[index]));
            window.location.replace("dettagli.html");
           }
            overlay.setPosition(coordinate); // e lo sposta sopra il marker
         })           
       } else {
           overlay.setPosition(undefined); // altrimenti lo nasconde
           closer.blur();
       }
   });

}

/** 
Funzione per creare un vettore
@param array 
@return ol.source.Vector => dizionario con chiave features e valore l'array
*/
export function creaVector(array) {
  return new ol.source.Vector({
    features: array,
  });
}

const trovaIndicePerTitolo = (array, titoloDaCercare) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i].titolo === titoloDaCercare) {
      return i; // Restituisce l'indice se il titolo è trovato
    }
  }
  return -1; // Restituisce -1 se il titolo non è presente nell'array
}
