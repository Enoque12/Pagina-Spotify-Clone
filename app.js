const searchInput = document.getElementById("search-input");
const resultArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById("result-playlist");

function requestApi(searchTerm) {
  const url = `http://localhost:3000/artists?name_like=${searchTerm}`;
  fetch(url)
    .then((response) => response.json())
    .then((result) => displayResults(result, searchTerm));
}

function displayResults(result, searchTerm) {
  resultPlaylist.classList.add("hidden");
  const artistName = document.getElementById("artist-name");
  const artistImage = document.getElementById("artist-img");

  // Se não encontrou nenhum artista, mostra a playlist
  if (result.length === 0) {
    resultArtist.classList.add("hidden");
    resultPlaylist.classList.remove("hidden");
    return;
  }

  // Procura por uma correspondência mais precisa
  const matchedArtist = result.find((artist) =>
    artist.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Se encontrou um artista correspondente, exibe-o
  if (matchedArtist) {
    artistName.innerText = matchedArtist.name;
    artistImage.src = matchedArtist.urlImg;
    resultArtist.classList.remove("hidden");
  } else {
    // Se não encontrou correspondência precisa, mostra a playlist
    resultArtist.classList.add("hidden");
    resultPlaylist.classList.remove("hidden");
  }
}

document.addEventListener("input", function () {
  const searchTerm = searchInput.value.toLowerCase().trim();
  if (searchTerm === "") {
    resultPlaylist.classList.remove("hidden");
    resultArtist.classList.add("hidden");
    return;
  }

  requestApi(searchTerm);
});
