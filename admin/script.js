import { addImg, saveAll, updateCardMain, updateCardSec, resetCardMain, resetCardSec, saveLongDescr, check1, check2 } from "/admin/admin.js";
import { salvaDati, recuperaDati } from "/src/cache.js";
import {createCardAdmin as createCard} from '/src/cards.js';
const containerMain = document.getElementById("containerMain");
const containerAccedi = document.getElementById("containerAccedi");
const errore = document.getElementById("erroreAccedi");
const card = document.getElementById("cards");
const userName = document.getElementById("userName");
const mostraPassword = document.getElementById("mostraPassword");
const accediInvio = document.getElementById("accediInvio");
const password = document.getElementById("password"); 
const modal=new bootstrap.Modal("#modal1");
const modal2=new bootstrap.Modal("#modal2");
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
  if(userName.value === "admin" && password.value === "admin"){
    containerAccedi.classList.add("displayNone");
    containerMain.classList.remove("displayNone");
  }else {
    errore.innerHTML = `<div class="alert alert-danger" role="alert">
     CREDENZIALI ERRATE! Riprova
    </div>`;
  }
  }
const array = [];

recuperaDati("POI")
.then((data) => {
  if (data.result.message !== "Does not exist") {
     const savePoi = JSON.parse(data.result);
    console.log(savePoi);
    for (let i = 0; i < savePoi.length; i++) {
        array.push(savePoi[i]);
    }
  }
  card.innerHTML = createCard(array);

});

let tmp; 

let currentElement = "";

//apertura modal1
document.getElementById("button1").onclick=()=>{
  tmp = {
    "titolo": "",
    "lonlat": [],  //lon lat
    "copertina" : "",  //immagine copertina
    "immagini": [],
    "descrizione": "",  //descrizione breve
    "testo": ""  //descrizione lunga
    };
  document.getElementById("titolo").value="";
  document.getElementById("breveDescr").value="";
  document.getElementById("lat").value="";
  document.getElementById("lon").value="";
  document.getElementById("copertina").value="";
  document.getElementById("descrLunga").value="";
  document.getElementById("cardModal1").innerHTML = resetCardMain();
  document.getElementById("cardModal2").innerHTML = resetCardSec();
}

//aggiunta immagine
document.getElementById("addLink").onclick = () => {
  addImg(tmp, document.getElementById("link").value);
  document.getElementById("link").value = "";
}

//apertura modal2
document.getElementById("goToModal2").onclick = () => {
  if(check1(tmp)){
    document.getElementById("cardModal2").innerHTML = updateCardSec(tmp);
    modal.hide();
    modal2.show();
  }
}

//salkvataggio degli elementi del dizionario nel modal1
document.getElementById("modal1").addEventListener('click', e => {
  if (e.target.id !== currentElement) {
    saveAll(tmp, document.getElementById("titolo").value, document.getElementById("breveDescr").value, document.getElementById("lat").value, document.getElementById("lon").value, document.getElementById("copertina").value);
    document.getElementById("cardModal1").innerHTML = updateCardMain(tmp);
  }
  currentElement = e.target.id;
})

//salkvataggio degli elementi del dizionario nel modal2
document.getElementById("modal2").addEventListener('click', e => {
  if (e.target.id !== currentElement) {
    saveLongDescr(tmp,document.getElementById("descrLunga").value)      
    document.getElementById("cardModal2").innerHTML = updateCardSec(tmp);
  }
  currentElement = e.target.id;
})

//salvataggio nuovo POI nell'array
document.getElementById("addButton").onclick = () => {
  if(check2(tmp)){
    array.push(tmp);
    modal2.hide();
    document.getElementById("cards").innerHTML = createCard(array);
    console.log(array);
    salvaDati(array, "POI");
  }
}

card.addEventListener('click', e => {
  const type = e.target.id.split("-")[0];
  const id = e.target.id.split("-")[1];
  if(type==="dettagli"){
    localStorage.setItem("POI", JSON.stringify(array[id]));
    window.open("dettagli.html");
  }else if(type==="elimina"){
    array.splice(id,1);
    card.innerHTML=createCard(array);
    salvaDati(array, "POI");
  }
})