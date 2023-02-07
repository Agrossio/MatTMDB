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

    // console.log(mediaElement);

    let { id, media_type } = mediaElement;
    
    let mediaResponse = await fetch(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=e65c4db5bae2b9b0565c97b1e317145e`)

    // console.log(mediaResponse);

    let mediaData = await mediaResponse.json();

    console.log(mediaData);

    modalInnerContent.innerHTML = JSON.stringify(mediaData);


  }



  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {

    // console.log(event.target);

    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  window.onkeydown = function (event) {
    // console.log(event);

    if (event.key == "Escape") {
      modal.style.display = "none";
    }

  }
}

export { modalArticle };