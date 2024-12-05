const apiURL = "https://api.imgflip.com/get_memes";
const memeContainer = document.getElementById("meme-container");
const searchBar = document.getElementById("search-bar");

let memes = [];
async function fetchMemes() {
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    if (data.success) {
      memes = data.data.memes;
      renderMemes();
    } else {
      console.error("Failed to fetch memes");
    }
  } catch (error) {
    console.error("Error fetching memes:", error);
  }
}

function renderMemes(filter = "") {
  memeContainer.innerHTML = ""; // Clear previous memes
  const filteredMemes = memes.filter((meme) =>
    meme.name.toLowerCase().includes(filter.toLowerCase())
  );
  filteredMemes.forEach((meme) => {
    const memeCard = document.createElement("div");
    memeCard.classList.add("meme-card");
    memeCard.innerHTML = `
              <img src="${meme.url}" alt="${meme.name}">
              <p>${meme.name}</p>
          `;
    memeContainer.appendChild(memeCard);
  });
}

searchBar.addEventListener("input", (e) => {
  renderMemes(e.target.value);
});

fetchMemes();