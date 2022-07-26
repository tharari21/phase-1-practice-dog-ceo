const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = "https://dog.ceo/api/breeds/list/all";

const dogImageContainer = document.querySelector("#dog-image-container");
const dogBreedContainer = document.querySelector("#dog-breeds");
const letterDropdown = document.querySelector("#breed-dropdown");
let breeds;
const colors = ["red", "green", "aqua", "violet", "blue", "orange"];

const fetchBreeds = async () => {
  // returns array of breeds
  const req = await fetch(breedUrl);
  const res = await req.json();
  breeds = Object.keys(res.message);
  return breeds;
};

const fetchImages = async () => {
  // returns array of images
  const req = await fetch(imgUrl);
  const res = await req.json();
  return res.message;
};
const renderImages = (images) => {
  images.forEach((imageSrc) => {
    const img = document.createElement("img");
    img.src = imageSrc;
    dogImageContainer.append(img);
  });
};
const loadImages = async () => {
  const images = await fetchImages();
  renderImages(images);
};

const clearBreeds = () => {
  dogBreedContainer.innerHTML = "";
};
const filterByLetter = async (e) => {
  console.log(breeds);
  clearBreeds();
  const letter = e.target[e.target.selectedIndex].value;
  const filteredBreeds = breeds.filter((breed) => breed.startsWith(letter, 0));
  renderBreeds(filteredBreeds);
};
const renderBreeds = (breeds) => {
  breeds.forEach((breed) => {
    const li = document.createElement("li");
    li.textContent = breed;
    li.addEventListener("click", () => {
      li.style.color = colors[Math.floor(Math.random() * colors.length)];
    });
    dogBreedContainer.append(li);
  });
};
const loadBreeds = async () => {
  // fetchBreeds sets the global breeds variable
  await fetchBreeds();
  renderBreeds(breeds);
};

letterDropdown.addEventListener("change", (e) => {
  filterByLetter(e);
});
loadBreeds();
loadImages();
