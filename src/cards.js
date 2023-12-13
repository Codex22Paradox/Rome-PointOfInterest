const templateUser = `<div class="col-auto">
    <div class="card text-white" style="width: 20rem; height: 27rem;" id="card%ID">
      <img src="%URL" class="img-card card-img-top" style="width: 20rem; height: 13rem;" alt="...">
      <div class="card-body">
        <h5 class="card-title text-center text-uppercase">%TITOLO</h5>
        <p class="card-text">%TESTO</p>
        </div>
        <div class="card-footer">
        <div class="row justify-content-end">
          <div class="col-auto"><button type="button" class="btn btn-outline-primary" id="dettagli-%ID"><img width="30" height="30" src="icon/Open.svg" alt="Open" id="dettagli-%ID"></button></div><br><br>
          </div>
      </div>
    </div>
  </div>`;

const templateAdmin = `<div class="col-auto">
  <div class="card text-white" style="width: 20rem; height: 27rem;" id="card%ID">
    <img src="%URL" class="img-card card-img-top img-fluid" style="width: 20rem; height: 13rem;" alt="...">
    <div class="card-body">
      <h5 class="card-title text-center text-uppercase">%TITOLO</h5>
      <p class="card-text">%TESTO</p>
      </div>
      <div class="card-footer">
      <div class="row justify-content-end">
      <div class="col-auto">
        <button type="button" class="btn btn-outline-info" id="modifica-%ID"><img width="30" height="30" src="icon/Edit.svg" alt="Open" id="modifica-%ID"></button>
      </div>
      <div class="col-auto">
        <button type="button" class="btn btn-outline-danger" id="elimina-%ID" data-bs-toggle="modal" data-bs-target="#sicuroModal"><img width="30" height="30" src="icon/Delete.svg" alt="Open" id="elimina-%ID"></button>

        <div class="modal fade" id="sicuroModal" tabindex="-1" aria-labelledby="sicuroModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="sicuroModalLabel"> SICURO DI VOLER ELIMINARE?</h1>
                <button type="button" id="nonSicuro" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-footer">
                <button type="button" id="nonSicuro" class="btn btn-secondary" data-bs-dismiss="modal"> Non voglio eliminare </button>
                <button type="button" id="Sicuro" class="btn btn-primary">Elimina POI</button>
              </div>
            </div>
          </div>
        </div>

      </div>
        <div class="col-auto"><button type="button" class="btn btn-outline-primary" id="dettagli-%ID"><img width="30" height="30" src="icon/Open.svg" alt="Open" id="dettagli-%ID"></button></div><br><br>
        </div>
    </div>
  </div>
</div>`;

export const createCardUser = (array) => {
  let card = "";
  array.forEach((item, index) => {
    card += templateUser
      .replace("%ID", index)
      .replace("%TITOLO", item.titolo)
      .replace("%TESTO", item.descrizione)
      .replace("%URL", item.copertina)
      .replace("%ID", index)
      .replace("%ID", index)
      .replace("%ID", index)
      .replace("%ID", index)
      .replace("%ID", index);
  });
  return card;
};

export const createCardAdmin = (array) => {
  let card = "";
  array.forEach((item, index) => {
    card += templateAdmin
      .replace("%ID", index)
      .replace("%TITOLO", item.titolo)
      .replace("%TESTO", item.descrizione)
      .replace("%URL", item.copertina)
      .replace("%ID", index)
      .replace("%ID", index)
      .replace("%ID", index)
      .replace("%ID", index);
  });
  return card;
};