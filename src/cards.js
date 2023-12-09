const template = `<div class="col-auto">
    <div class="card text-white" style="width: 20rem; height: 27rem;" id="card%ID">
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
export const createCard = (array) => {
  let card = "";
  array.forEach((item, index) => {
    card += template
      .replace("%ID", index)
      .replace("%TITOLO", item.titolo)
      .replace("%TESTO", item.descrizione)
      .replace("%URL", item.copertina);
  });
  return card;
};
