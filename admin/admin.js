const example = {
  "nome": "",
  "coord": ["", ""],  //lon lat
  "immagini": [],
  "descrizioneBreve": "",  //descrizione breve
  "descrizioneLunga": ""  //descrizione lunga
}

export function addLink(diz, link) {
  diz.immagini.push(link);
}

export function saveAll(diz, nome, descr, lat, lon) {
  diz.nome = nome;
  diz.descrizioneBreve = descr;
  diz.coord[0] = lon;
  diz.coord[1] = lat;
}

export function saveLongDescr(diz, descr) {
  diz.descrizioneLunga = descr;
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
  if (diz.immagini.length > 0) {
    html = html.replace("%URL", diz.immagini[diz.immagini.length - 1]);
  }else{
    html = html.replace("%URL", "img/placeholder.svg");
  }
  if (diz.nome !== "") {
    html = html.replace("%TITOLO", diz.nome);
  }else{
    html = html.replace("%TITOLO", "...");
  }
  if (diz.descrizioneBreve !== "") {
    html = html.replace("%TESTO", diz.descrizioneBreve);
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
  if (diz.nome !== "") {
    html = html.replace("%TITOLO", diz.nome);
  }else{
    html = html.replace("%TITOLO", "...");
  }
  if (diz.descrizioneLunga !== "") {
    html = html.replace("%TESTO", diz.descrizioneLunga);
  }else{
    html = html.replace("%TESTO", "...");
  }
  return html;
}

