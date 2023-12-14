const example = {
  "titolo": "",
  "lonlat": [],  //lon lat
  "copertina" : "",  //immagine copertina
  "immagini": [],
  "descrizione": "",  //descrizione breve
  "testo": ""  //descrizione lunga
}

//links è una nodelist con i value degli input che sono i link effettivi
export function saveImg(links){
  const array = [];
  for (let i = 0; i < links.length-1; i++) {
    if(links[i].value!==""){
      array.unshift(links[i].value);
    }
  }
  return array;
}

export function addImgInput(currentLast){
  let html=`<div class="row">
                    <div class="col">
                      <input type="url" id="link-%ID" placeholder="Link immagine" class="form-control rounded-pill addLink">
                    </div>
                    <div class="col">
                      <button class="btn btn-danger rounded-pill" id="removeLink-%ID" disabled><img width="30" height="30" src="icon/Remove.svg" alt="Open" id="removeLink-%ID"></button>
                    </div>
                  </div>
                  <br>`;
  html=html.replace("%ID",(currentLast+1));
  html=html.replace("%ID",(currentLast+1));
  html=html.replace("%ID",(currentLast+1));
  return html;
}

export function loadLinkInputs(times) {
  let template=`<div class="row">
                    <div class="col">
                      <input type="text" id="link-%ID" placeholder="Link immagine" class="form-control rounded-pill addLink">
                    </div>
                    <div class="col">
                      <button class="btn btn-danger rounded-pill" id="removeLink-%ID"><img width="30" height="30" src="icon/Remove.svg" alt="Open" id="removeLink-%ID"></button>
                    </div>
                  </div>
                  <br>`;
  let html="";
  for (let i = 0; i < times; i++) {
    let rowhtml = template.replace("%ID",i);
    rowhtml = rowhtml.replace("%ID",i);
    rowhtml = rowhtml.replace("%ID",i);
    html += rowhtml;
  }
  return html;
}

export function saveAll(diz, nome, descr, lat, lon, copertina) {
  diz.titolo = nome;
  diz.descrizione = descr;
  diz.lonlat[0] = lon;
  diz.lonlat[1] = lat;
  diz.copertina = copertina;
  return diz;
}

export function saveLongDescr(diz, descr) {
  diz.testo = descr;
  return diz;
}

//Funzione piglia il template della card e mostra le cose aggiunte (l'ultima foto inserita, il nome del POI e la descrizione breve); da richiamare ogni volta che si vuole updateare la card; da modificare il template per far venire il tutto decentemente
export function updateCardMain(diz) {
  const template = `<div class="col-auto">
    <div class="card text-white" style="width: 20rem; height: 27rem;" id="addCard">
      <img src="%URL" class="img-card card-img-top img-fluid" alt="...">
      <div class="card-body">
        <h5 class="card-title text-center">%TITOLO</h5>
        <p class="card-text">%TESTO</p>
        </div>
        <div class="card-footer">
        <div class="row justify-content-end">
          <div class="col-auto"><button type="button" class="btn btn-outline-primary"><img width="30" height="30" src="icon/Open.svg" alt="Open"></button></div><br><br>
          </div>
      </div>
    </div>
  </div>`;
  let html = template;
  if (diz.copertina !== "") {
    html = html.replace("%URL", diz.copertina);
  }else{
    html = html.replace("%URL", "img/placeholder.svg");
  }
  if (diz.titolo !== "") {
    html = html.replace("%TITOLO", diz.titolo);
  }else{
    html = html.replace("%TITOLO", "...");
  }
  if (diz.descrizione !== "") {
    html = html.replace("%TESTO", diz.descrizione);
  }else{
    html = html.replace("%TESTO", "...");
  }
  return html;
}

//idem alla precedente
export function updateCardSec(diz) {
  const template = `<div class="col-auto">
    <div class="card text-white" style="width: 20rem; height: 27rem;" id="addCard2">
      <div class="card-body">
        <h5 class="card-title text-center">%TITOLO</h5>
        <p class="card-text">%TESTO</p>
        </div>
        <div class="card-footer">
        <div class="row justify-content-end">
          <div class="col-auto"><button type="button" class="btn btn-outline-primary"><img width="30" height="30" src="icon/Open.svg" alt="Open"></button></div><br><br>
          </div>
      </div>
    </div>
  </div>`;
  let html = template;
  if (diz.titolo !== "") {
    html = html.replace("%TITOLO", diz.titolo);
  }else{
    html = html.replace("%TITOLO", "...");
  }
  if (diz.testo !== "") {
    html = html.replace("%TESTO", diz.testo);
  }else{
    html = html.replace("%TESTO", "...");
  }
  return html;
}

export function check1(diz) {
  let check=true;
  if(diz.titolo===""){
    check=false;
  }
  if(diz.lonlat.length!==2){
    check=false;
  }
  if(diz.copertina===""){
    check=false;
  }
  if(diz.descrizione===""){
    check=false;
  }
  return check;
}

export function check2(diz) {
  let check=true;
  if(diz.testo===""){
    check=false;
  }
  return check;
}

export function check3(array) {
  let check=true;
  if(array.length===0){
    check=false;
  }
  return check;
}

export function resetCardMain() {
  const template = `<div class="col-auto">
    <div class="card text-white" style="width: 20rem; height: 27rem;" id="addCard">
      <img src="%URL" class="img-card card-img-top img-fluid" alt="...">
      <div class="card-body">
        <h5 class="card-title text-center">%TITOLO</h5>
        <p class="card-text">%TESTO</p>
        </div>
        <div class="card-footer">
        <div class="row justify-content-end">
          <div class="col-auto"><button type="button" class="btn btn-outline-primary"><img width="30" height="30" src="icon/Open.svg" alt="Open"></button></div><br><br>
          </div>
      </div>
    </div>
  </div>`;
  let html = template;
  html = html.replace("%URL", "img/placeholder.svg");
  html = html.replace("%TITOLO", "...");
  html = html.replace("%TESTO", "...");
  return html;
}

export function resetCardSec() {
  const template = `<div class="col-auto">
    <div class="card text-white" style="width: 20rem; height: 27rem;" id="addCard2">
      <div class="card-body">
        <h5 class="card-title text-center">%TITOLO</h5>
        <p class="card-text">%TESTO</p>
        </div>
        <div class="card-footer">
        <div class="row justify-content-end">
          <div class="col-auto"><button type="button" class="btn btn-outline-primary"><img width="30" height="30" src="icon/Open.svg" alt="Open"></button></div><br><br>
          </div>
      </div>
    </div>
  </div>`;
  let html = template;
  html = html.replace("%TITOLO", "...");
  html = html.replace("%TESTO", "...");
  return html;
}


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

export const createCarousel = (array) => {
  if(array.length !== 0){
  const totale = template;
  let elementi = innerTemplateActive.replace("%SRC", array[0]);
  for (let i = 1; i < array.length; i++) {
    elementi += innerTemplate.replace("%SRC", array[i]);
  }
  console.log(elementi);
  return totale.replace("%ELEMENTI", elementi);
  }else{
    return `<img src="img/placeholder.svg" class="img-card card-img-top img-fluid"      alt="...">`;
  }
};

export const textCounter = (field, countfield, maxlimit) => {
  if (field.value.length > maxlimit) 
    field.value = field.value.substring( 0, maxlimit );
  else
    countfield.value = field.value.length + "/150";
}