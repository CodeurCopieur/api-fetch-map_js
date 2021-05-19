const searchInput = document.getElementById('seacrh');
const results = document.getElementById('results');

console.log(results);

let movie;
let searchTerm = '';

// API REQUEST
const fetchMovies = async() => {
  movies = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=cc4c125990f5777406886df6fdb3e266')
    .then( data => data.json())
    .then( data => data.results)
}
const showMovies = async() => {
  await fetchMovies();

  if(movies == null) {
    results.innerHTML = `<span>Aucun resultat</span>`;
  }

  results.innerHTML = (
    movies
      .filter(movie => movie.title.toLowerCase().includes(searchTerm.toLowerCase()))
      .map( movie => (
          ` 
          <li class="component__wrap-movie" data-genres="${movie.genre_ids}">
            <div class="component__wrap-picture">
                <picture>
                  <img src="https://www.themoviedb.org/t/p/w440_and_h660_face${movie.poster_path}" alt="">
                <picture>
            </div>
            <div class="component__wrap-texts">
              <h3 class="component__wrap-title">${movie.original_title}</h3>
              <p>${movie.overview}</p>
            </div>
          </li>
          `
      )).join('')
  );
};

showMovies();