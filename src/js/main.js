'use strict';

let series = [];
let favoritSeries = [];

const ulSearch = document.querySelector ('.js-ulSearch');
const btnSearch = document.querySelector ('.js-btnSearch');
const inputSearch = document.querySelector ('.js-search');
const ulFavorites = document.querySelector ('.js-favorites');



const handleClickFav = (ev)=>{
  //obtener la informacion sobre el que se ha clickado
  //en mi array el id es un numero, hay que convertirlo
 const liClicked = parseInt (ev.currentTarget.id);
  //buscar la serie clicada a partir del id con find. De mi array de series buscame el id de la serie clickada.
 const serieSelected = series.find((item) => item.mal_id === liClicked);
//comprobar que la serie seleccionada no este ya en el array de favorit con findIndex
//de mi array de favoritos buscame la serie que se ha clicado
const indexFavoritSeries = favoritSeries.findIndex ((eachSerie)=> eachSerie.mal_id === liClicked)
  if (indexFavoritSeries === -1){
    favoritSeries.push (serieSelected);
    //console.log (favoritSeries);
  }
  //pintar las series favoritas
    ulFavorites.innerHTML += `
    <li id="${serieSelected.mal_id}">
              <div class="favorites">
                <button>X</button>
                <img src="${serieSelected.images.jpg.image_url}" alt="imagen de la serie">
                <h3>${serieSelected.title}</h3>
              </div>
            </li>`;
  
  };


//Funcion para escuchar evento y seleccionar los favoritos
const listenerFavorit = ()=>{
  const allSeriesLi = document.querySelectorAll ('.js-seriesLi');
  //devuelve un array y hay que recorrerlo
  for (const li of allSeriesLi){
    li.addEventListener("click", handleClickFav);
  }

}

//Funcion que pintar la lista de todas las series en la ul
function renderSeries (list){
    for (const serie of list){
    ulSearch.innerHTML += `
    <li id="${serie.mal_id}" class="js-seriesLi">
      <img src="${serie.images.jpg.image_url}" alt="imagen de la serie"/>
      <h3>${serie.title}</h3>
     
    </li>`;

    }
  listenerFavorit();

}
  
//Funcion para recoger los datos de la Api
function getDataApi() {
    fetch(
      'https://api.jikan.moe/v4/anime'
    )
      .then((resp) => resp.json())
      .then((info) => {
        series = info.data;
        //Se llama a la funcion que pinta los datos para que salgan una vez la api da los datos
        renderSeries (series);
        console.log(series);
                
      });
  }
  getDataApi();
  

  //Buscador, funcion para escuchar el evento y filtrar por titulo las series que busque la usuaria

  function handleSearch (event){
    event.preventDefault();
    ulSearch.innerHTML = "";
    const valueSearch = inputSearch.value;
    const filteredSeries = series.filter((item)=>item.title.toLowerCase().includes(valueSearch.toLowerCase()));
    //llamo a la funcion que pinta los datos de la api con el parametro nuevo
    renderSeries(filteredSeries);
          
    }

  btnSearch.addEventListener("click", handleSearch);


 