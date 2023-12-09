import {createCardUser as createCard} from '/src/cards.js';
import { salvaDati, recuperaDati, recuperaFile } from "/src/cache.js";
const array = [];
const card = document.getElementById("cards");

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