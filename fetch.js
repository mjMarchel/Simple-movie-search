const searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", async function(){
  try{
    const inputKeyword = document.querySelector("#search-input");
    const movie = await getMovie(inputKeyword.value);
    updateUI(movie);
  }catch(err){
    alert(err);
  };
});                              

function getMovie(get){
  return fetch("http://www.omdbapi.com/?apikey=426beae7&s=" + get)
  .then(response => {
    if(response.ok === "False"){
      throw new Error(response.statusText)
    }
    return response.json();
  })
  .then(response => {
    if(response.Response === "False"){
      throw new Error(response.Error);
    }
    return response.Search;
  })
};

function updateUI(movies){
  let card = '';
  movies.forEach(m => card+= showCard(m));
  const movieContainer = document.querySelector("#movie-list");
  movieContainer.innerHTML = card;
};

//event binding
document.addEventListener("click", async function(e){
  if(e.target.classList.contains("see-detail")){
    try{
      const imdbid = e.target.dataset.id;
      const movieDetail = await getMovieDetail(imdbid);
      updateUIDetail(movieDetail);
    }catch(err){
      alert(err)
    } 
  };
});

function getMovieDetail(m){
  return fetch("http://www.omdbapi.com/?apikey=426beae7&i=" + m)
  .then(response => {
    if(response.ok === "False"){
      throw new Error(response.statusText)
    }
    return response.json()
  })
  .then(m => m)
};

function updateUIDetail(m){
  const movieDetail = showDetail(m);
  const modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML = movieDetail;
};


function showCard(mo) {
  return `
  <div class="col-md-4">
    <div class="card">
        <img src=" ${mo.Poster} " class="card-img-top">
            <div class="card-body">
                <h5 class="card-title"> ${mo.Title} </h5>
                <h6 class="card-text">${mo.Year}</h6>
                <a href="#" class="card-link see-detail" data-bs-toggle="modal"
                data-bs-target="#exampleModal" data-id="${mo.imdbID}">See Detail</a>
            </div>
    </div>
  </div>`
};


function showDetail(m){
    return `
    <div class="container-fluid">
    <div class="row">
      <div class="col-md-4">
        <img src="${m.Poster}" class="img-fluid">
      </div>

      <div class="col-md-8">
        <ul class="list-group">
          <li class="list-group-item"><h4>${m.Title}</h4></li>
          <li class="list-group-item">Released : ${m.Released}</li>
          <li class="list-group-item">Genre : ${m.Genre}</li>
          <li class="list-group-item">Type : ${m.Type}</li>
          <li class="list-group-item">RunTime : ${m.Runtime}</li>
          <li class="list-group-item">Author : ${m.Writer}</li>
          <li class="list-group-item">Rating : ${m.imdbRating}</li>
          <li class="list-group-item"><p>Plot : ${m.Plot}</p></li>
        </ul>
      </div>
    </div>
  </div>`
};