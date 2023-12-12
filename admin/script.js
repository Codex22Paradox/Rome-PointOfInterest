import { saveImg, addImgInput, loadLinkInputs, saveAll, updateCardMain, updateCardSec, resetCardMain, resetCardSec, saveLongDescr, trimArray, check1, check2, check3, createCarousel } from "/admin/admin.js";
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
const modal3=new bootstrap.Modal("#modal3");
const img = document.getElementById("immaginePassword");
const logout = document.getElementById("logout");
const divPasswordCookie = document.getElementById("cookiePassword");
const caruselAdd = document.getElementById("caruselAdd");
mostraPassword.onclick = () => {
  if (password.type === "password") {
    password.type = "text";
    img.src = img.src.replace("On", "Off");
  } else {
    password.type = "password";
    img.src = img.src.replace("Off", "On");
  }
}

if(localStorage.getItem("AccedutoAdmin") === "true"){
  containerAccedi.classList.add("displayNone");
  containerMain.classList.remove("displayNone");
  localStorage.setItem("AccedutoAdmin", "false");
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
  const nome = Cookies.get("usernameAdmin");
  if(String(nome) === "undefined"){
    divPasswordCookie.classList.remove("displayNone");
  }
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
/*
document.getElementById("addLink").onclick = () => {
  addImg(tmp, document.getElementById("link").value);
  document.getElementById("link").value = "";
}
*/
//apertura modal2
document.getElementById("goToModal2").onclick = () => {
  saveAll(tmp, document.getElementById("titolo").value, document.getElementById("breveDescr").value, document.getElementById("lat").value, document.getElementById("lon").value, document.getElementById("copertina").value);
  document.getElementById("cardModal1").innerHTML = updateCardMain(tmp);
  if(check1(tmp)){
    document.getElementById("cardModal2").innerHTML = updateCardSec(tmp);
    modal.hide();
    modal2.show();
  }
}

//apertura modal3
document.getElementById("goToModal3").onclick=()=>{
  saveLongDescr(tmp,document.getElementById("descrLunga").value)      
  document.getElementById("cardModal2").innerHTML = updateCardSec(tmp);
  if(check2(tmp)){
    modal2.hide();
    modal3.show();
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
});

//TODO disabilitare solo l'ultimo pulsante
document.getElementById("formAggiuntaLink").addEventListener('click', e => {
  let type = e.target.id.split("-")[0];
  let id = e.target.id.split("-")[1];
  let elements = document.querySelectorAll(".addLink");
  tmp.immagini = saveImg(elements);
  if(type === "link"){
    if(id === elements[elements.length-1].id.split("-")[1]){
      let empty=-1;
      for (let index = 0; index < elements.length; index++) {
        if(elements[index].value==""){
          empty++;
        }
      }
      if(elements.length != 1){
        document.getElementById("linkContainer").innerHTML = loadLinkInputs(tmp.immagini.length+1+empty) + addImgInput(id*1);
        for (let index = 0; index < tmp.immagini.length; index++) {
          document.getElementById("link-"+index).value = tmp.immagini[index];
        }
      }else{
        document.getElementById("linkContainer").innerHTML = loadLinkInputs(1) + addImgInput(id*1);
      }
      document.getElementById("link-"+id).focus();
    }
  }else if(type === "removeLink"){
    if(document.getElementById("link-"+id).value!=""){
      tmp.immagini.splice(tmp.immagini.indexOf(document.getElementById("link-"+id).value),1);
    }
    //id = tmp.immagini.length+2;
    if(tmp.immagini.length==0){
      document.getElementById("linkContainer").innerHTML = loadLinkInputs(1);
    }else{
      document.getElementById("linkContainer").innerHTML = loadLinkInputs(tmp.immagini.length);
    }
    elements = document.querySelectorAll(".addLink");
    id = elements[elements.length-1].id.split("-")[1];
    document.getElementById("linkContainer").innerHTML += addImgInput(id*1);
    for (let index = 0; index < tmp.immagini.length; index++) {
      document.getElementById("link-"+index).value = tmp.immagini[index];
    }
  }
  console.log(tmp.immagini);
  caruselAdd.innerHTML = createCarousel(tmp.immagini);
});

//salvataggio nuovo POI nell'array
document.getElementById("addButton").onclick = () => {
  console.log(check3(tmp.immagini));
  /*if(check3(tmp.immagini)){
    tmp.immagini=trimArray(tmp.immagini);
    array.push(tmp);
    modal3.hide();
    document.getElementById("cards").innerHTML = createCard(array);
    console.log(array);
    salvaDati(array, "POI");
  }*/
}

card.addEventListener('click', e => {
  const type = e.target.id.split("-")[0];
  const id = e.target.id.split("-")[1];
  if(type === "dettagli"){
    localStorage.setItem("Provenienza", "Admin");
    localStorage.setItem("POI", JSON.stringify(array[id]));
    window.location.replace("dettagli.html");
  }else if(type==="elimina"){
    const button=document.getElementById("Sicuro");
    button.onclick = () => {
    array.splice(id,1);
    card.innerHTML=createCard(array);
    salvaDati(array, "POI");
    }
  }else if (type==="modifica") {
    document.getElementById("modal1Title").innerText="Modifica point of interest";
    document.getElementById("modal2Title").innerText="Modifica point of interest";
    document.getElementById("modal3Title").innerText="Modifica point of interest";
    modal1.show();
  }
})

logout.onclick = () => {
  localStorage.clear();
  window.location.replace("user.html");
}

document.addEventListener("DOMContentLoaded", e => {
  console.log("Entrato");
  const nome = Cookies.get("usernameAdmin");
  const passwordScelta = Cookies.get("passwordAdmin");    
  if(String(nome) !== "undefined" &&  String(passwordScelta) !== "undefined"){
    userName.value = nome;
    password.value = passwordScelta;
    errore.innerHTML = `<div class="alert alert-success" role="alert">
     Credenziali inserite in automatico
    </div>`;
  }
});

const salvaPass = document.getElementById("salvaPassword");

salvaPass.onclick = () => {
  Cookies.set("usernameAdmin", userName.value, { expires: 10 });
  Cookies.set("passwordAdmin", password.value, { expires: 10 });
}

