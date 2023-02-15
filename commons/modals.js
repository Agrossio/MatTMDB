// import { fetchJson } from "../utils/fetch";

// https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Modules


function modalArticle(article, mediaElement) {
  // Get the modal
  const modal = document.getElementById("trending-modal");

  // Get the modal content:

  const modalInnerContent = document.getElementById("modal-inner-content");

  //  Uso el article en lugar del boton del ejemplo, pero sin seleccionarlo sino recibindolo como parametro:

  // Get the button that opens the modal
  // var btn = document.getElementById("article");
  // VERSION MATI 1: var article = document.querySelector("article"); 

  // Get the <span> element that closes the modal
  const span = document.getElementsByClassName("close")[0];

  // When the user clicks on the button, open the modal
  // VERSION MATI 2: poner el onclick en el article recibido y no en el btn
  article.onclick = async function () {
    modal.style.display = "block";

    console.log(mediaElement);

    let { id, media_type } = mediaElement;

    modalInnerContent.innerHTML = '';

    // busco el detalle de la pelicula que recibo por props:
    let mediaResponse = await fetch(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=e65c4db5bae2b9b0565c97b1e317145e`)
    let mediaData = await mediaResponse.json();
    // console.log(mediaData);

    // NO SE PORQUE EN ESTE MODULO NO ME TOMA LA FUNCION QUE CREE:
    // let mediaData = await fetchJson(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=e65c4db5bae2b9b0565c97b1e317145e`, null)

    let title = mediaElement.media_type == "movie" ? "title" : "name";

    let image = document.createElement('img');
    image.setAttribute('id', 'big-card-image');
    image.setAttribute('src', `https://image.tmdb.org/t/p/w780${mediaElement.backdrop_path}`);
    // TMDB "poster_sizes": ["w92", "w154", "w185", "w342", "w500", "w780", "original"]
    image.setAttribute('alt', `${mediaElement[title]} Image`);
    // image.setAttribute('style','width:74%;');

    modalInnerContent.appendChild(image)

    // let favoriteButton = document.createElement('i');
    // favoriteButton.classList.add('star-btn');
    // modalInnerContent.appendChild(favoriteButton)

    let favoriteButton = document.createElement('a');
    favoriteButton.setAttribute('id', 'favorite-button');
    favoriteButton.innerText = 'Add to Favorites'
    modalInnerContent.appendChild(favoriteButton)


    let playVideo = document.createElement('a');
    playVideo.setAttribute('id', 'video-button');
    playVideo.innerText = 'Play video'
    playVideo.addEventListener('click', async () => {

      let videoResponse = await fetch(`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=e65c4db5bae2b9b0565c97b1e317145e&language=en-US`)
      let videoData = await videoResponse.json();
      let videoId = videoData.results[0].key;


      let youtubeVideo = document.createElement('iframe');
      youtubeVideo.setAttribute('id', 'youtube-video');
      youtubeVideo.setAttribute('type', 'text/html');
      youtubeVideo.setAttribute('width', '720');
      youtubeVideo.setAttribute('height', '405');
      youtubeVideo.setAttribute('frameborder', '0');
      youtubeVideo.setAttribute('allowfullscreen', '');

      // para que funcione el auto play hay que setear mute=1 y para que funcione el loop hay que agregar playlist=id_del_video:
      youtubeVideo.setAttribute('src', `https://www.youtube.com/embed/${videoId}?mute=1&autoplay=1&controls=1`);

      modalInnerContent.innerHTML = "";

      modalInnerContent.appendChild(youtubeVideo)


    })
    modalInnerContent.appendChild(playVideo)

    let description = document.createElement('div');
    description.classList.add('big-card-text-container');

    let heading = document.createElement('h1');
    heading.innerText = mediaData[title];

    let paragraph = document.createElement('p');
    paragraph.innerText = mediaData.overview;

    description.appendChild(heading);
    description.appendChild(paragraph);

    modalInnerContent.appendChild(description)

  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
    modalInnerContent.innerHTML = "";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {

    // console.log(event.target);

    if (event.target == modal) {
      modal.style.display = "none";
      modalInnerContent.innerHTML = "";
    }
  }

  // Cuando un usuario presiona la tecla "esc", cierra el modal:
  window.onkeydown = function (event) {
    // console.log(event);

    if (event.key == "Escape") {
      modal.style.display = "none";
      modalInnerContent.innerHTML = "";
    }

  }
}


async function gridModal(mediaArray) {
  // Get the modal
  const modal = document.getElementById("trending-modal");

  // Get the modal content:

  const modalInnerContent = document.getElementById("modal-inner-content");
  modalInnerContent.innerHTML = ''
  modalInnerContent.classList.add('grid')

  // Get the <span> element that closes the modal
  const span = document.getElementsByClassName("close")[0];

  // When the user clicks on the button, open the modal
  // VERSION MATI 2: poner el onclick en el article recibido y no en el btn

  modal.style.display = "block";

  console.log(mediaArray);

  let { id, media_type } = mediaArray;

  for (let i = 0; i < 5; i++) {

    let title = mediaArray[i].media_type == "movie" ? "title" : "name";
    let releaseDate = mediaArray[i].media_type == "movie" ? "release_date" : "first_air_date";
    let mediaType = mediaArray[i].media_type == "movie" ? "Movie" : "Tv Show";

    // console.log(mediaType);

    let image = document.createElement('img');
    image.src = `https://image.tmdb.org/t/p/w342${mediaArray[i].poster_path}`
    image.alt = `${mediaArray[i][title]} Poster`
    // TMDB "poster_sizes": ["w92", "w154", "w185", "w342", "w500", "w780", "original"]

    let rating = document.createElement('div');
    rating.classList.add('rating');
    rating.innerText = mediaArray[i].vote_average.toFixed(1);

    let imageContainer = document.createElement('div')
    imageContainer.classList.add("image-container")
    imageContainer.appendChild(rating);
    imageContainer.appendChild(image);

    let h3 = document.createElement('h3');
    h3.classList.add("title");
    h3.innerText = mediaArray[i][title];

    let pDate = document.createElement('p');
    pDate.classList.add("release-date");
    pDate.innerText = mediaArray[i][releaseDate];
modalArticle
    let pType = document.createElement('p');
    pType.classList.add("media-type");
    pType.innerText = mediaType;

    let article = document.createElement('article');
    article.classList.add("trending")
    article.classList.add("card")
    article.id = `article-${i}`

    article.appendChild(imageContainer);
    article.appendChild(h3);
    article.appendChild(pDate);
    article.appendChild(pType);

    modalInnerContent.appendChild(article);

    modalArticle(article, mediaArray[i]);
  };



  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
    modalInnerContent.innerHTML = "";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {

    // console.log(event.target);

    if (event.target == modal) {
      modal.style.display = "none";
      modalInnerContent.innerHTML = "";
    }
  }

  // Cuando un usuario presiona la tecla "esc", cierra el modal:
  window.onkeydown = function (event) {
    // console.log(event);

    if (event.key == "Escape") {
      modal.style.display = "none";
      modalInnerContent.innerHTML = "";
    }

  }
}



export { modalArticle, gridModal };