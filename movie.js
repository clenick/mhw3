const movie_apiKey = '4d0b0fc2';
function onJson(json){ 
    const movie_section = document.querySelector("#movie_section");
    movie_section.innerHTML = '';

    if(json.Response === "False"){
        const errore = document.createElement('p');
        errore.textContent= "Nessun risultato.";
        movie_section.appendChild(errore);
    }
    else{
    const movie = document.createElement('div');
    movie.id = "movie";
    const title_movie = document.createElement('h2');
    const image_movie = document.createElement('img');
    const plot = document.createElement('p');

    title_movie.textContent = json.Title;
    title_movie.classList.add("title_m");
    title_movie.id="title_movie";
    image_movie.src = json.Poster;
    plot.textContent = json.Plot;
    plot.classList.add("text");

    movie.appendChild(title_movie);
    movie.appendChild(image_movie);
    movie.appendChild(plot);
    movie_section.appendChild(movie);
    }
}
function onResponse(response) {
    return response.json();
}
function search(event){
    event.preventDefault();
    const input = document.querySelector('#search_movie');
    const value = encodeURIComponent(input.value);
    let rest_url = 'http://www.omdbapi.com/?t=' + value + '&apikey=' + movie_apiKey + '&format=json';  
    fetch(rest_url).then(onResponse).then(onJson);
}

const search_movie = document.querySelector('#movie_form');
search_movie.addEventListener('submit',search);