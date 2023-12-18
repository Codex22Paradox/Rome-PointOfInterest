import { createDetails, createTitle, createCarousel, createMap} from "/dettagli/dettagli.js";
const poi = JSON.parse(localStorage.getItem("POI"));
const provenienza = localStorage.getItem("Provenienza");
localStorage.clear();
const container = document.getElementById("popup");
const centro = poi.lonlat; //coordinate Roma
const buttonExtendNav = document.getElementById('buttonExtendNav');
const navbar = document.getElementById('navbar');
let boolNav = false;
const map = new ol.Map({
  target: document.querySelector(".map"),
  /*view: new ol.View({
    center: centroRoma,
    minZoom: 0,
    maxZoom: 15,
  })*/
});

buttonExtendNav.onclick = () => {
  if(!boolNav){
    navbar.classList.remove("rounded-pill");
    navbar.classList.add("rounded");
    boolNav = true;
  }else{
    navbar.classList.remove("rounded");
    navbar.classList.add("rounded-pill");
    boolNav = false;
  }
}
  
 document.getElementById("titoloNav").innerHTML += `<div class="row align-items-center">
     <div class="col-auto">
       <a id="backDettagli" class="nav-link active"><img width="30" height="30" src="icon/Back.svg" alt="Open"></a>
     </div>
     <div class="col-auto">
     <label class="text-white" class="col-form-label">` + createTitle(poi) + `</label>
     </div>
   </div>`;
const backDettagli = document.getElementById("backDettagli");
backDettagli.onclick = () => {
  console.log(provenienza);
  if(provenienza === "User"){
    localStorage.setItem("AccedutoUser", "true");
    window.location.replace("user.html");
  }else if(provenienza === "Admin"){
    localStorage.setItem("AccedutoAdmin", "true");
    window.location.replace("admin.html");
  }
}
const dettagliTitolo = document.getElementById("dettagliTitolo");
const dettagliTesto = document.getElementById("dettagliTesto");
dettagliTitolo.innerHTML = createTitle(poi);
dettagliTesto.innerHTML = createDetails(poi);

const dettagliImmagini = document.getElementById("dettagliImmagini");
dettagliImmagini.innerHTML = createCarousel(poi);
createMap(map, centro, 18, false);

const logout = document.getElementById("logout");

logout.onclick = () => {
  localStorage.clear();
  window.location.replace("user.html");
}