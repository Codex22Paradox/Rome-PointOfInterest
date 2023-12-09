import {createCard} from '/src/cards.js';
const array = [
  {
    titolo: "Colosseo",
    descrizione:
      "Il momumento più famoso del mondo. ricordo di una splendidà civilta e simbolo della modernità storica capitolina",
    copertina: "https://i.postimg.cc/m2qdYD5Y/Immagini.jpg",
    testo: `Probabilmente il monumento più famoso al mondo e simbolo della grandezza di Roma, l'Anfiteatro Flavio,
                  meglio conosciuto con il nome di Colosseo per la colossale statua in bronzo raffigurante Nerone che si
                  trovava nelle vicinanze, si innalza nel cuore archeologico della città, e da quasi duemila anni
                  racconta una storia ininterrotta di fascino e magnificenza.
                  Il Colosseo, che ancora oggi è l’anfiteatro più grande al mondo, fu voluto dall’imperatore Tito Flavio
                  Vespasiano che per edificarlo scelse la zona compresa tra i colli Palatino, Esquilino e Celio,
                  precedentemente occupata dal laghetto artificiale della Domus Aurea di Nerone. La sua costruzione
                  iniziò nel 70 d.C. e terminò nell’80 d.C. sotto l’impero di Tito, figlio di Vespasiano.
                  L'edificio, destinato ai combattimenti, ai giochi tra i gladiatori, alle simulazioni di caccia ad
                  animali feroci ed esotici e alle naumachie, è composto da quattro ordini architettonici sovrapposti; i
                  primi tre sono formati da ottanta arcate inquadrate da semicolonne, il quarto è suddiviso in riquadri
                  intervallati da finestre. Nell'ultimo ordine, erano inseriti supporti in muratura e in legno per
                  sostenere un immenso telone (velarium) che serviva a riparare gli spettatori dal sole e dalla pioggia.
                  Lungo 189 metri, largo 156 metri, per un'altezza di oltre 48 metri, il Colosseo si estende su una
                  superficie di 24.000 mq e poteva ospitare circa 50mila spettatori che potevano accomodarsi nella
                  cavea, formata da gradinate in laterizio rivestite in marmo. L'arena, che misurava 76 metri per 46,
                  era realizzata con una grande tavola di legno ricoperta di sabbia.

                  urante il Romanticismo, il suo fascino di antica rovina attrasse letterati e artisti come Shelley,
                  Byron, Dickens, Thomas Cole e Henry James. Per Stendhal, invece, il Colosseo rappresentava "le più
                  belle vestigia del popolo romano", un luogo che "se ne avessi il potere, sarei tiranno, farei fermare
                  il Colosseo durante i miei soggiorni a Roma".
                  Periodicamente ospita esposizioni temporanee e spettacoli moderni.`,
  },
  {
    titolo: "Campo de fiori",
    descrizione:
      "Una piazza viva, storica e giovanile; pervasa dalla vivacità romana e dalla vita mondana serale.",
    copertina: "https://i.postimg.cc/4Nt81Zkj/Immagini1.webp",
  },
  {
    titolo: "Campo de fiori",
    descrizione:
      "Una piazza viva, storica e giovanile; pervasa dalla vivacità romana e dalla vita mondana serale.",
    copertina: "https://i.postimg.cc/4Nt81Zkj/Immagini1.webp",
  },
  {
    titolo: "Campo de fiori",
    descrizione:
      "Una piazza viva, storica e giovanile; pervasa dalla vivacità romana e dalla vita mondana serale.",
    copertina: "https://i.postimg.cc/4Nt81Zkj/Immagini1.webp",
  },
];
const card = document.getElementById("cards");
card.innerHTML = createCard(array);