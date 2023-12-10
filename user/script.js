import {createCardUser as createCard} from '/src/cards.js';
import { salvaDati, recuperaDati, accedi } from "/src/cache.js";
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

mostraPassword.onclick = () => {
  if (password.type === "password") {
    password.type = "text";
    img.src = img.src.replace("On", "Off");
  } else {
    password.type = "password";
    img.src = img.src.replace("Off", "On");
  }
}

accediInvio.onclick = () => {
  //cardAccedi.classList.add("displayNone");
 // cardSubmit.classList.remove("displayNone");
  accedi(userName.value, password.value)
  .then((data) => {
    if(data.result){
        containerAccedi.classList.add("displayNone");
        containerMain.classList.remove("displayNone");
      } else {
        errore.innerHTML = `<div class="alert alert-danger" role="alert">
         CREDENZIALI ERRATE! Riprova
        </div>`;
      }
  })    
}
recuperaDati("POI")
.then((data) => {
  if (data.result.message !== "Does not exist") {
     const savePoi = JSON.parse(data.result);
    for (let i = 0; i < savePoi.length; i++) {
        array.push(savePoi[i]);
    }
  }
  card.innerHTML = createCard(array);
})


card.addEventListener('click', e => {
  const id =  e.target.id.split("-")[1];
  console.log(array[id]);
  localStorage.setItem("POI", JSON.stringify(array[id]));
  window.open("dettagli.html");
})