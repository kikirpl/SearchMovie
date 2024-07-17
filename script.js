var userInput = document.getElementById("user-input");
var searchButton = document.getElementById("search-button");
var movieList = document.getElementById("movie-list");
var modalContainer = document.getElementById("modal-container");

function getUserInput() {
  return userInput.value;
}

userInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    searchButton.click();
  }
});

function searchMovies() {
  movieList.innerHTML = `<h2 class='text-2xl'>Mohon tunggu sebentar...</h2>`;

  fetch("http://www.omdbapi.com/?apikey=d186ee7a&s=" + getUserInput())
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      movieList.innerHTML = "";
      var movies = res.Search;
      movies.forEach((movie) => {
        movieList.innerHTML += `
       <div onclick="showDetailMovie('${movie.imdbID}')" class="border text-center mx-2 my-2 w-[128px] hover:cursor-pointer">
        <img src="${movie.Poster}" alt="" /> 
        <h3 class="font-semibold">${movie.Title}</h3>
      </div>
            `;
      });
    });
}

async function showDetailMovie(imdbID) {
  var movie = await (
    await fetch(`http://www.omdbapi.com/?apikey=d186ee7a&i=` + imdbID)
  ).json();
  modalContainer.style.display = "flex";
  modalContainer.innerHTML = `
  <div class="border bg-white border-black w-2/3 p-5">
        <h1 class="text-black text-center mt-4 font-bold text-2xl">
          ${movie.Title}
        </h1>
        <div class="flex">
          <div class="w-2/3">
           <p>Rilis : ${movie.Released}</p>
          <p>Tahun : ${movie.Year}</p>
            <p>Sutradara : ${movie.Director}</p>
            <p>Type : ${movie.Type}</p>
             <p>Ratings : ${movie.imdbRating}</p>
             <p>Plot : ${movie.Plot}</p>
          </div>
          <img class="w-[128px]" src="${movie.Poster}" alt="Ini gambar film" />
        </div>
      </div>`;
}

function hilang() {
  modalContainer.style.display = "none";
}
