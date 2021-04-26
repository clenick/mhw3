const music_apiKey = 'f7ccd1784de9a425dd67553edf6bfc15';
function onJson(json){ 
    const music_section = document.querySelector("#music_section");
    music_section.innerHTML = '';
    const results = json.results.trackmatches.track;
    let num_results = results.length; 
    if( num_results===0){
        const errore = document.createElement('p');
        errore.textContent= "Nessun risultato.";
        music_section.appendChild(errore);
    }  
    else{
        if(num_results>4){
            num_results = 4;
        }
        const music_album = document.createElement('div');
        music_album.id = "music_album";
        for(let i = 0; i<num_results; i++){
            const title = document.createElement('h2');
            const link  = document.createElement('a');
            const artist = document.createElement('p');
        
            const music_box = document.createElement('div');
            music_box.id = "music_box";

            title.textContent = json.results.trackmatches.track[i].name;
            artist.textContent = json.results.trackmatches.track[i].artist;
            link.href = json.results.trackmatches.track[i].url;
            link.target = "_blank";
            title.classList.add("title_m");
            artist.classList.add("text");

            link.appendChild(title);
            music_box.appendChild(link);
            music_box.appendChild(artist);
            music_album.appendChild(music_box);
        }
        music_section.appendChild(music_album);
    }
}
function onResponse(response) {
    return response.json();
}
function search(event){
    event.preventDefault();
    const input = document.querySelector('#search_music');
    const value = encodeURIComponent(input.value);
    let rest_url = 'http://ws.audioscrobbler.com/2.0/?method=track.search&track=' + value + '&api_key=' + music_apiKey + '&format=json';  
    fetch(rest_url).then(onResponse).then(onJson);
}

const search_music = document.querySelector('#music_form');
search_music.addEventListener('submit',search);