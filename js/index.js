// API Key b2e6bf1d
// API Link http://www.omdbapi.com/?apikey=[b2e6bf1d]&

$(document).ready(() => {
  // 1. Get the info from the search box when submitted
  $("#searchForm").on("submit", e => {
    let searchText = $("#searchText").val();
    getMovies(searchText);
    e.preventDefault();
  });
});

// Function to Get the movies
function getMovies(searchText) {
  axios
    .get("http://www.omdbapi.com/?i=tt3896198&apikey=b2e6bf1d&s=" + searchText)
    .then(response => {
      console.log(response);
      // response is an object, and response.data.Search is where the search we just performed is located
      let movies = response.data.Search;
      let output = "";
      $.each(movies, (index, movie) => {
        output += `
        <div class="col-md-3">
        <div class="well text-center">
          <img src="${movie.Poster}">
          <h5>${movie.Title}</h5>
          <a onclick="movieSelected('${
            movie.imdbID
          }')" class="btn btn-primary" href="#">Movie Details</a>
        </div>
      </div>
        `;
      }); //End Each Loop
      $("#movies").html(output);
    })
    .catch(err => {
      console.log(err);
    });
}

function movieSelected(id) {
  //Pass info from one page to the other using session storage, similar to local storage but clears when browser closes
  sessionStorage.setItem("movieId", id);
  window.location = "movie.html";
  return false;
}

function getMovie() {
  let movieId = sessionStorage.getItem("movieId");
  axios
    .get("http://www.omdbapi.com/?i=" + movieId + "&apikey=b2e6bf1d&")
    .then(response => {
      let movie = response.data;
      let output = `
        <div class='row'>
          <div class='col-md-4'>
            <img src='${movie.Poster}' class='thumbnail'>
          </div>
          <div class='col-md-8'>
            <h2>${movie.Title}</h2>
            <ul class='list-group'>
              <li class='list-group-item'><strong>Genre</strong>: ${
                movie.Genre
              }</li>
              <li class='list-group-item'><strong>Released</strong>: ${
                movie.Released
              }</li>
              <li class='list-group-item'><strong>Rated</strong>: ${
                movie.Rated
              }</li>
              <li class='list-group-item'><strong>IMDB Rating</strong>: ${
                movie.imdbRating
              }</li>
              <li class='list-group-item'><strong>Director</strong>: ${
                movie.Director
              }</li>
              <li class='list-group-item'><strong>Writer</strong>: ${
                movie.Writer
              }</li>
              <li class='list-group-item'><strong>Actors</strong>: ${
                movie.Actors
              }</li>
            </ul>
          </div>
        </div>
        <div class='row'>
          <div class='well'>
            <h3>Plot</h3>
            ${movie.Plot}
            <hr>
            <a href='http://imdb.com/title/${
              movie.imdbID
            }' target='_blank' class='btn btn-primary'>View IMDB</a>
            <a href='index.html' class='btn btn-default'>Go Back to Search</a>
          </div>
        </div>
      `;
      $("#movie").html(output);
    })
    .catch(err => {
      console.log(err);
    });
}
