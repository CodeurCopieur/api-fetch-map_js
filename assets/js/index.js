const searchInput = document.getElementById('seacrh');
const results = document.getElementById('results');
const apiKey = '********************************';
const apiUrl = 'https://api.themoviedb.org/3/'

let currentPage = 1;
let totalResults = 0;
let movies;
let showloader = false;




// API REQUEST
const fetchMovies = async(paramSearch) => {
  movies = await fetch(`${apiUrl}${paramSearch}?api_key=${apiKey}&page=${currentPage}`)
    .then( data => data.json())
    .then( data => data.results)
}
const showMovies = async() => {
  await fetchMovies('movie/popular');

  if(movies == null) {
    results.innerHTML = `<span>Aucun resultat</span>`;
  }

  results.innerHTML += (
    movies
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
              <p></p>
            </div>
          </li>
          `
      )).join('')
  );
};

const scrollTriger = () => {
  const observer = new IntersectionObserver( (entries) => {
    entries.forEach( ({intersectionRatio}) => {
      if(intersectionRatio > 0 && currentPage < 200) {
        currentPage += 1;
        showMovies();
      }
    });
  });
  observer.observe(document.querySelector('[data-ref]'));
}

showMovies();

window.addEventListener('DOMContentLoaded', scrollTriger())
