
const toys = document.createElement('div');
toys.id = "toys";
const titletoys = document.createElement('div');
titletoys.classList.add("title-toys");
titletoys.id = "titletoysA";
const inspiration = document.createElement('h1');
inspiration.textContent = "PRENDI ISPIRAZIONE PER LA TUA LETTERINA";
const search = document.createElement('input');
search.id = "search";
search.type = 'text';
search.onkeyup = 'Research()';
search.placeholder = "Cerca un gioco";
search.addEventListener('keyup', Research);
const categoryA = document.createElement('div');
categoryA.classList.add("category");
categoryA.id = "categoryA";
const categoryB = document.createElement('div');
categoryB.classList.add("category");
categoryB.classList.add("hidden");
categoryB.id = "categoryB";
const titletoys2 = document.createElement('div');
titletoys2.classList.add("title-toys");
titletoys2.classList.add("hidden");
const favorites = document.createElement('h1');
favorites.textContent = "LISTA DEI DESIDERI";

const letter = document.querySelector("#letter");
titletoys2.appendChild(favorites);
toys.appendChild(titletoys2);
toys.appendChild(categoryB);
titletoys.appendChild(inspiration);
titletoys.appendChild(search);
toys.appendChild(titletoys);
toys.appendChild(categoryA);
letter.appendChild(toys);

let counter = 0;
for (element of contents) {
  const toy = document.createElement('div');
  toy.classList.add("toy");
  const boxtitle = document.createElement('div');
  boxtitle.classList.add("boxtitle");
  const title = document.createElement('h2');
  title.classList.add("toytitles");
  title.textContent = element.titolo;
  const heart = document.createElement('img');
  heart.src = "img/heart.png";
  counter++;
  heart.classList.add(counter);
  const image = document.createElement('img');
  image.src = element.immagine;
  const desc = document.createElement('p');
  desc.textContent = element.descrizione;
  desc.classList.add("hidden");
  const button = document.createElement('button');
  button.textContent = "Dettagli";
  button.classList.add("details");
  button.addEventListener("click", showDetails);
  heart.addEventListener("click", makeFavorite);

  boxtitle.appendChild(title);
  boxtitle.appendChild(heart);
  toy.appendChild(boxtitle);
  toy.appendChild(image);
  toy.appendChild(desc);
  toy.appendChild(button);
  categoryA.appendChild(toy);
}

//funzione che mostra i dettagli
function showDetails(event) {
  const button = event.currentTarget;
  const toy = button.parentNode;
  const desc = toy.firstChild.nextSibling.nextSibling;
  desc.classList.remove("hidden");
  desc.classList.add("visible");
  button.removeEventListener("click", showDetails);
  button.addEventListener("click", hideDetails);
}

//funzione che nasconde i dettagli
function hideDetails(event) {
  const button = event.currentTarget;
  const toy = button.parentNode;
  const desc = toy.firstChild.nextSibling.nextSibling;
  desc.classList.remove("visible");
  desc.classList.add("hidden");
  button.removeEventListener("click", hideDetails);
  button.addEventListener("click", showDetails);
}

//funzione che aggiunge il giocattolo alla sezione preferiti
function makeFavorite(event) {
  const heart = event.currentTarget;
  const title = heart.previousSibling;
  const img = heart.parentNode.parentNode.firstChild.nextSibling;
  const description = img.nextSibling;
  const categoryB = document.querySelector("#categoryB");
  if (categoryB.classList.contains("hidden")) {
    categoryB.classList.remove("hidden");
    const titletoys2 = categoryB.parentNode.firstChild;
    titletoys2.classList.remove("hidden");
  }
  const toyfavorite = document.createElement('div');
  toyfavorite.classList.add("toy");
  const boxtitle = document.createElement('div');
  boxtitle.classList.add("boxtitle");
  const titlewishlist = document.createElement('h2');
  titlewishlist.classList.add("toytitles");
  titlewishlist.textContent = title.textContent;
  const heartyellow = document.createElement('img');
  heartyellow.src = "img/heartyellow.png";
  heartyellow.classList.add(heart.className);
  const imagewishlist = document.createElement('img');
  imagewishlist.src = img.src;
  const descwishlist = document.createElement('p');
  descwishlist.textContent = description.textContent;
  descwishlist.classList.add("hidden");
  const button = document.createElement('button');
  button.textContent = "Dettagli";
  button.classList.add("details");
  button.addEventListener("click", showDetails);
  heartyellow.addEventListener("click", deleteFavorite);
  heart.removeEventListener("click", makeFavorite);

  boxtitle.appendChild(titlewishlist);
  boxtitle.appendChild(heartyellow);
  toyfavorite.appendChild(boxtitle);
  toyfavorite.appendChild(imagewishlist);
  toyfavorite.appendChild(descwishlist);
  toyfavorite.appendChild(button);
  categoryB.appendChild(toyfavorite);
}

//funzione che rimuove il giocattolo dai preferiti
function deleteFavorite(event) {
  const heartyellow = event.currentTarget;
  const searchedclass = heartyellow.className;
  const toy = heartyellow.parentNode.parentNode;
  toy.remove();
  const heartred = document.getElementsByClassName(searchedclass);
  heartred[0].addEventListener("click", makeFavorite);
  const categoryB = document.querySelector("#categoryB");
  if (categoryB.hasChildNodes() != true) {
    categoryB.classList.add("hidden");
    const toys = categoryB.parentNode;
    toys.firstChild.classList.add("hidden");
  }
}
//funzione per la ricerca di un giocattolo
function Research(event) {
  let search = event.currentTarget;
  let input = search.value.toUpperCase();
  const categoryA = document.querySelector("#categoryA");
  const toys = categoryA.querySelectorAll('.toy');
  let len = input.length;
  for (toy of toys) {
    const title = toy.firstChild.firstChild;
    if (title.textContent.toUpperCase().indexOf(input) > -1) {
      toy.classList.remove("hidden");
      toy.classList.add("nohidden");
    }
    else {
      toy.classList.remove("nohidden");
      toy.classList.add("hidden");
    }
  }
}
