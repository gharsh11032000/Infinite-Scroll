const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photoArray = [];

// Unsplash Api
const count = 30;
const apiKey = "Bbhq1hBp_npO-bSl2d-iU2HeO5ej573xmDD0EH9GqN8";
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

//Helper Function to set attributes on Dom elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

//Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

//Create elements for links and photos,Added to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photoArray.length;
  //Run function for each objects in photosArray
  photoArray.forEach((photo) => {
    //Create <a> to link to unsplash
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    //Create <img> for photo
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_discription,
      title: photo.alt_discription,
    });
    //Event Listener,check when each is finished loading
    img.addEventListener("load", imageLoaded);
    //Put <img> inside <a>,then put both inside the imageContainer Elements
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

//Getting photos from unsplash api
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photoArray = await response.json();
    displayPhotos();
  } catch (error) {}
}

//Check to see if scrolling near bottom of page, Load more photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

//onLoad
getPhotos();
