import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import axios from "axios";

import warningIcon from "./img/warning.svg";

const form = document.querySelector("form");
const input = document.querySelector("input");
const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".loader-container");

const loadMoreBtn = document.querySelector(".load-more");

const API_KEY = "53924687-b44856628e08e8da659106943";

let lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});

let currentPage = 1;
let searchKeyword = ""; //keeping search data from the user

loadMoreBtn.style.display = "none";

const PER_PAGE = 40;

//Search Button Event Listener
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  currentPage = 1;
  searchKeyword = input.value.trim();

  if (searchKeyword === "") {
    iziToast.error({
      message: `Please search a word!`,
      position: "topRight",
      backgroundColor: "#ef4040",
      messageColor: "#fafafb",
      messageSize: "16px",
      iconUrl: warningIcon,
      maxWidth: 432,
      progressBarColor: "#b51b1b",
      displayMode: 2,
      close: true,
      closeOnEscape: true,
      closeOnClick: true,
      onOpening: function (instance, toast) {
        toast.style.borderBottom = "2px solid #ffbebe";
      },
    });
    return;
  }
  try {
    loader.style.display = "flex";
    gallery.innerHTML = "";
    loadMoreBtn.style.display = "none";

    const responseData = await fetchImages(searchKeyword, currentPage);

    if (responseData.hits.length === 0) {
      iziToast.error({
        message: `Sorry, there are no images matching your search query. Please try again!`,
        position: "topRight",
        backgroundColor: "#ef4040",
        messageColor: "#fafafb",
        messageSize: "16px",
        iconUrl: warningIcon,
        maxWidth: 432,
        progressBarColor: "#b51b1b",
        displayMode: 2,
        close: true,
        closeOnEscape: true,
        closeOnClick: true,
        onOpening: function (instance, toast) {
          toast.style.borderBottom = "2px solid #ffbebe";
        },
      });
      return;
    }
    const markup = createMarkup(responseData.hits);
    gallery.insertAdjacentHTML("beforeend", markup);
    lightbox.refresh();

    if (
      responseData.totalHits > 0 &&
      responseData.totalHits <= currentPage * PER_PAGE
    ) {
      loadMoreBtn.style.display = "none";
      iziToast.error({
        message: "We're sorry, but you've reached the end of search results.",
        position: "bottomRight",
        backgroundColor: "#ef4040",
        messageColor: "#fafafb",
        messageSize: "16px",
        iconUrl: warningIcon,
        maxWidth: 432,
        progressBarColor: "#b51b1b",
        displayMode: 2,
        close: true,
        closeOnEscape: true,
        closeOnClick: true,
        onOpening: function (instance, toast) {
          toast.style.borderBottom = "2px solid #ffbebe";
        },
      });
    } else if (responseData.totalHits > PER_PAGE) {
      loadMoreBtn.style.display = "block";
    }
  } catch (error) {
    console.log(`Error occurred: `, error);
    iziToast.error({
      message: `An error occurred, please try again later!`,
      position: "topRight",
      backgroundColor: "#ef4040",
      messageColor: "#fafafb",
      messageSize: "16px",
      iconUrl: warningIcon,
      maxWidth: 432,
      progressBarColor: "#b51b1b",
      displayMode: 2,
      close: true,
      closeOnEscape: true,
      closeOnClick: true,
      onOpening: function (instance, toast) {
        toast.style.borderBottom = "2px solid #ffbebe";
      },
    });
  } finally {
    loader.style.display = "none";
  }
});

//Load more Button Event Listener
loadMoreBtn.addEventListener("click", async () => {
  currentPage += 1; //increasing page number

  loadMoreBtn.style.display = "none";
  loader.style.display = "flex";

  try {
    const responseData = await fetchImages(searchKeyword, currentPage); //calling fetchImages with newPage

    const newPageMarkup = createMarkup(responseData.hits);
    gallery.insertAdjacentHTML("beforeend", newPageMarkup);

    lightbox.refresh(); //refreshing lightbox

    const galleryItem = document.querySelector(".gallery-item");

    //smooth scroll
    if (galleryItem) {
      const cardHeight = galleryItem.getBoundingClientRect().height;

      window.scrollBy({
        top: cardHeight * 2, //twice of size of the card
        behavior: "smooth",
      });
    }

    const loadedImages = currentPage * PER_PAGE;

    if (
      loadedImages >= responseData.totalHits ||
      responseData.hits.length < PER_PAGE
    ) {
      loadMoreBtn.style.display = "none";
      iziToast.error({
        message: "We're sorry, but you've reached the end of search results.",
        position: "bottomRight",
        backgroundColor: "#ef4040",
        messageColor: "#fafafb",
        messageSize: "16px",
        iconUrl: warningIcon,
        maxWidth: 432,
        progressBarColor: "#b51b1b",
        displayMode: 2,
        close: true,
        closeOnEscape: true,
        closeOnClick: true,
        onOpening: function (instance, toast) {
          toast.style.borderBottom = "2px solid #ffbebe";
        },
      });
    } else {
      loadMoreBtn.style.display = "block";
    }
  } catch (error) {
    console.log(`Error occurred: `, error);

    if (error.response && error.response.status === 400) {
      loadMoreBtn.style.display = "none";
    }
    iziToast.error({
      message: `An error occurred, please try again later!`,
      position: "topRight",
      backgroundColor: "#ef4040",
      messageColor: "#fafafb",
      messageSize: "16px",
      iconUrl: warningIcon,
      maxWidth: 432,
      progressBarColor: "#b51b1b",
      displayMode: 2,
      close: true,
      closeOnEscape: true,
      closeOnClick: true,
      onOpening: function (instance, toast) {
        toast.style.borderBottom = "2px solid #ffbebe";
      },
    });
  } finally {
    loader.style.display = "none";
  }
});

//Helper function
async function fetchImages(query, page) {
  const response = await axios.get("https://pixabay.com/api/", {
    params: {
      key: API_KEY,
      q: query,
      image_type: "photo",
      orientation: "horizontal",
      safesearch: true,
      page: page,
      per_page: 40,
    },
  });
  return response.data;
}

//helper function
function createMarkup(images) {
  return images
    .map((image) => {
      return `<li class="gallery-item">
              <a class="gallery-link" href=${image.largeImageURL}>
                <img
                  class="gallery-image"
                  src="${image.webformatURL}"
                  alt="${image.tags}"
                />
              </a>
              <div class="info">
                <p class="info-item"><b>Likes</b>${image.likes}</p>
                <p class="info-item"><b>Views</b>${image.views}</p>
                <p class="info-item"><b>Comments</b>${image.comments}</p>
                <p class="info-item"><b>Downloads</b>${image.downloads}</p>
              </div>
            </li>`;
    })
    .join("");
}
