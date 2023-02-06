// https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Modules

function modalArticle(article) {
  // Get the modal
  var modal = document.getElementById("trendingModal");

  // Get the button that opens the modal
  // var btn = document.getElementById("article");

  var article = document.querySelector("article");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on the button, open the modal
  article.onclick = function () {
    modal.style.display = "block";
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    console.log(event);
    console.log(event.target);

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