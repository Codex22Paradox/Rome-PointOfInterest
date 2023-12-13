import {createCardUser as createCard} from '/src/cards.js';
import { salvaDati, recuperaDati, accedi } from "/src/cache.js";
import {createMap } from "/user/user.js";
import {addMarker, initOverlay } from "/src/map.js";
const array = [];
const card = document.getElementById("cards");
const containerMain = document.getElementById("containerMain");
const containerAccedi = document.getElementById("containerAccedi");
const errore = document.getElementById("erroreAccedi");
const userName = document.getElementById("userName");
const mostraPassword = document.getElementById("mostraPassword");
const accediInvio = document.getElementById("accediInvio");
const password = document.getElementById("password"); 
const img = document.getElementById("immaginePassword");
const imgNav = document.getElementById("immagineMappaUser");
const descrizione = document.getElementById("descrizioneUser");
const logout = document.getElementById("logout");
const divPasswordCookie = document.getElementById("cookiePassword");
const switchMap = document.getElementById("switchMap");
const mappaUser = document.getElementById("mappaUser");
const container = document.getElementById('popup');
const content = document.getElementById('popup-content');
const closer = document.getElementById('popup-closer');
const buttonExtendNav = document.getElementById('buttonExtendNav');
const navbar = document.getElementById('navbar');
let boolNav = false;
let overlay;

const centro = ["12.4963655", "41.9027835"]; //coordinate Roma
let controlloMappa = false;
const map = new ol.Map({
  target: document.querySelector(".map"),
  /*view: new ol.View({
    center: centroRoma,
    minZoom: 0,
    maxZoom: 15,
  })*/
});
createMap(map, centro, 14, false);
const precisione = localStorage.getItem("Precisione");
if(precisione === "Mappa"){
  card.classList.add("displayNone");
  mappaUser.classList.remove("displayNone");
  imgNav.src = imgNav.src.replace("Map", "Elenco");
  descrizione.innerText = "MAPPA";
  controlloMappa = true;
  localStorage.setItem("Precisione", "Elenco");
}else{
  card.classList.remove("displayNone");
  mappaUser.classList.add("displayNone");
  imgNav.src = imgNav.src.replace("Elenco", "Map");
  descrizione.innerText = "ELENCO";
  controlloMappa = false;
  localStorage.setItem("Precisione", "Elenco");
}
switchMap.onclick = () => {
  if(!controlloMappa){
    card.classList.add("displayNone");
    mappaUser.classList.remove("displayNone");
    imgNav.src = imgNav.src.replace("Map", "Elenco");
    descrizione.innerText = "MAPPA";
    controlloMappa = true;
  }else{
    card.classList.remove("displayNone");
    mappaUser.classList.add("displayNone");
    imgNav.src = imgNav.src.replace("Elenco", "Map");
    descrizione.innerText = "ELENCO";
    controlloMappa = false;
  }
}
mostraPassword.onclick = () => {
  if (password.type === "password") {
    password.type = "text";
    img.src = img.src.replace("On", "Off");
  } else {
    password.type = "password";
    img.src = img.src.replace("Off", "On");
  }
}

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
const salvaPass = document.getElementById("salvaPassword");

salvaPass.onclick = () => {
  Cookies.set("usernameUser", userName.value, { expires: 10 });
  Cookies.set("passwordUser", password.value, { expires: 10 });
}

document.addEventListener("DOMContentLoaded", e => {
  const nome = Cookies.get("usernameUser");
  const passwordScelta = Cookies.get("passwordUser");    
  console.log(password);
  if(String(nome) !== "undefined" &&  String(passwordScelta) !== "undefined"){
    userName.value = nome;
    password.value = passwordScelta;
    errore.innerHTML = `<div class="alert alert-success rounded-pill" role="alert">
     Credenziali inserite in automatico
    </div>`;
  }
});


if(localStorage.getItem("AccedutoUser") === "true"){
  containerAccedi.classList.add("displayNone");
  containerMain.classList.remove("displayNone");
  localStorage.setItem("AccedutoUser", "false");
}

accediInvio.onclick = () => {
  accedi(userName.value, password.value)
  .then((data) => {
    if(data.result){
        containerAccedi.classList.add("displayNone");
        containerMain.classList.remove("displayNone");
      } else {
        errore.innerHTML = `<div class="alert alert-danger rounded-pill" role="alert">
         CREDENZIALI ERRATE! Riprova
        </div>`;
      }
    const nome = Cookies.get("usernameUser");
    const passwordSalvata = Cookies.get("passwordUser");
    if(String(nome) !== userName.value && String(passwordSalvata) !== password.value ){
      divPasswordCookie.classList.remove("displayNone");
    }
  })    
}
recuperaDati("POI")
.then((data) => {
  if (data.result.message !== "Does not exist") {
     const savePoi = JSON.parse(data.result);
    for (let i = 0; i < savePoi.length; i++) {
      array.push(savePoi[i]);
      console.log(savePoi[i]);
      addMarker(map, { lonlat: savePoi[i].lonlat, name:  savePoi[i].titolo});
    }
  }
  card.innerHTML = createCard(array);
  initOverlay(map, array);
  const nome = Cookies.get("usernameUser");
  if(String(nome) === "undefined"){
    divPasswordCookie.classList.remove("displayNone");
  }
})


card.addEventListener('click', e => {
  const id =  e.target.id.split("-")[1];
  console.log(array[id]);
  localStorage.setItem("Provenienza", "User");
  localStorage.setItem("Precisione", "Elenco");
  localStorage.setItem("POI", JSON.stringify(array[id]));
  window.location.replace("dettagli.html");
})

logout.onclick = () => {
  localStorage.clear();
  window.location.replace("user.html");
}