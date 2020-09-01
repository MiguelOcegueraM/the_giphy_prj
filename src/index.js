import "./styles.css";
const searchOnGiphy = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const resultsElements = document.getElementById("gifGallery");
const buttonModal = document.getElementById("btnModal");
let counter;

waitingSearch();
showModal();

function waitingSearch() {
  searchOnGiphy.addEventListener("submit", function (event) {
    event.preventDefault();
    const query = searchInput.value;
    searchGifs(query);
  });
}

function searchGifs(query) {
  counter = 0;
  const apiKey = "w7UCWH7F6LrdbMAiKBgvWA6oqD7vXb4v";
  const giphyUrl = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&rating=g&limit=28`;
  fetch(giphyUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      let htmlElements = " ";

      json.data.forEach(function (object) {
        const gifUrl = object.images.fixed_width.url;
        htmlElements += `
        <div class="card gifs" id="gifCard">
          <img src="${gifUrl}" id="gif" height="200" width="200" class="htmlGif">
          <input type="checkbox" name="gif[${counter}]" id="likeCheckBox" value="1" >
          <div class="like">
            <i class="fas fa-heart"></i>
          </div>
        </div>`;
        counter++;
      });
      resultsElements.innerHTML = htmlElements;
    })
    .catch(function (errorMessage) {
      alert(errorMessage.message);
    });
}

function showModal() {
  buttonModal.addEventListener("click", function (event) {
    event.preventDefault();
    modal();
  });
}

function modal() {
  if (document.getElementById("btnModal")) {
    let modalContainer = document.getElementById("modalContainer");
    let btnModal = document.getElementById("btnModal");
    let closeButton = document.getElementsByClassName("close")[0];
    let content = document.getElementsByTagName("body")[0];

    btnModal.onclick = function () {
      modalContainer.style.display = "block";

      content.style.position = "static";
      content.style.height = "100%";
      content.style.overflow = "hidden";
    };

    closeButton.onclick = function () {
      modalContainer.style.display = "none";

      content.style.position = "inherit";
      content.style.height = "auto";
      content.style.overflow = "visible";
    };

    window.onclick = function (event) {
      if (event.target === modalContainer) {
        modalContainer.style.display = "none";

        content.style.position = "inherit";
        content.style.height = "auto";
        content.style.overflow = "visible";
      }
    };
  }
}
