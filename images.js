const client_id = 'GsM7sIcrCB3gXo-FrjFA4WQQV8IDZMOjp3kSpQy-z8k';
const client_secret = 's2GIZp5HivrpZPBJYeH3HSzg2W6hMoKaQ9CkqLFXBl8';
let counter = 0;

const images_button = document.querySelector('#images_button');
images_button.addEventListener('click',takeToken);

function takeToken(){
    fetch("https://unsplash.com/oauth/token",
    {
        method: 'post',
        body: 'grant_type=client_credentials&client_id=' + client_id + '&client_secret=' + client_secret,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }

    }).then(onResponse).then(saveToken);

    function onResponse(response) {
        return response.json();
    }
    function saveToken(json) {
        retrieveImages(json);
    } 
}
function retrieveImages(token) {
    images_button.remove();
    const text = document.querySelector("#change_text");
    text.textContent = "Clicca su un'immagine per selezionarla:";
    fetch('https://api.unsplash.com/search/photos?query=christmas&per_page=20&content_filter=high&orientation=landscape&client_id=' + client_id + '&client_secret=' + client_secret,
    {
        headers:
            {
                'Authorization': token.token_type + ' ' + token.access_token,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
    }).then(onResponse2).then(onJSON); 
    function onResponse2(response) {
        return response.json();
    }
    function onJSON(json) {
       
        const sec = document.querySelector('#letter_section');
        const album_images = document.createElement('div');
        album_images.id = "album_images";
        let i;
        for(i = counter; i< counter + 3; i++){
            const image = document.createElement('img');
            image.id = i;
            image.classList.add("imagesOfDiv");
            image.src = json.results[i].urls.small;
            image.addEventListener('click', selectImage);
            album_images.appendChild(image);
        }
        counter = i;
        const button = document.createElement('input');
        button.type = "button";
        button.id= "more";
        const form = document.querySelector("#letter_form");
        button.value= "Mostra altre immagini";
        form.appendChild(button);
        
        button.addEventListener('click',function(){
            for(i = counter; i< counter + 3; i++){
                const image = document.createElement('img');
                image.id = i;
                image.classList.add("imagesOfDiv");
                image.src = json.results[i].urls.small;
                image.addEventListener('click', selectImage);
                album_images.appendChild(image);  
            }
            counter = i;
        });
        sec.appendChild(album_images);
        
    }
    function selectImage(event)
    {
        const image = event.currentTarget;
        const div = document.querySelector("#text_image");
        div.appendChild(image);
        const images = document.querySelectorAll(".imagesOfDiv");
        for(im of images){ 
            im.removeEventListener('click', selectImage);
        }
        image.addEventListener('click', removeImage);
    }
    function removeImage(event)
    {
        const image = event.currentTarget;
        const album = document.querySelector("#album_images");
        image.removeEventListener('click', removeImage);
        album.appendChild(image);
        const images = document.querySelectorAll(".imagesOfDiv");
        for(ima of images){
            ima.addEventListener('click', selectImage);
        }
    }
}

   