'use strict';
let series = [];
let favoritSeries = [];

const ulSearch = document.querySelector ('.js-ulSearch');
const btnSearch = document.querySelector ('.js-btnSearch');
const inputSearch = document.querySelector ('.js-search');
const ulFavorites = document.querySelector ('.js-favorites');


const btnResetFavorit = document.querySelector ('.js-btnFavorite');
const btnReset = document.querySelector ('.js-btnReset');


//BONUS

/*Al darle al boton X se elimina el elemento de la lista favofitos.Tambien se tiene que eliminar de LS .
   - Seleccionar todas las Xs
   - Recorrer cada una de las X
   -Saber cual es el id seleccionado y sacarlo del array (splice)
   -Actualizar LS 
   */

const handleClickX = (ev)=>{
  const btXClicked = parseInt(ev.target.parentElement.id);
  const favoritClicked = favoritSeries.find((item) => item.mal_id === btXClicked);
  favoritSeries.splice (favoritClicked, 1);
  localStorage.setItem('favoritesServer', JSON.stringify(favoritSeries)); 
  renderFavoritSeries (favoritSeries);
  renderSeries (series); 
 
}

const allBtnX = document.querySelectorAll ('.js-btnX');
for (const oneBtnX of allBtnX){
oneBtnX.addEventListener('click', handleClickX);
  
}

//Valores que hay que resetear y botones de reseteo

btnReset.addEventListener('click', (ev)=>{
  ev.preventDefault();
  ulSearch.innerHTML = "";
  inputSearch.value = "";
  ulFavorites.innerHTML ="";
  localStorage.removeItem('favoritesServer');
  favoritSeries = [];
  loadInitialSeries()

});

btnResetFavorit.addEventListener('click', (ev)=>{
  ev.preventDefault();
  ulFavorites.innerHTML ="";
  localStorage.removeItem('favoritesServer');
  favoritSeries = [];
 
});

//funcion para pintar los favoritos
function renderFavoritSeries (favorites){ 
  ulFavorites.innerHTML ="";
  for (const oneFav of favorites){
  ulFavorites.innerHTML += `
  <li id="${oneFav.mal_id}" >
            <div class="favorit_li" >
              <button class="btnX js-btnX" >&#215</button>
              <h3>${oneFav.title}</h3>
              <img class ="favorit_img" src="${oneFav.images.jpg.image_url}" alt="imagen de la serie">
             </div>
          </li>`;
  
  }
  const allBtnX = document.querySelectorAll ('.js-btnX');
for (const oneBtnX of allBtnX){
  oneBtnX.addEventListener('click', handleClickX);
  
}
 
}

//Funcion para seleccionar series en favoritos 
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
    //si el index no está,mételo y dibujalo 
    favoritSeries.push (serieSelected);
    ev.currentTarget.classList.add("favorites")
   
       } else {
        favoritSeries.splice(indexFavoritSeries, 1);
        ev.currentTarget.classList.remove("favorites") //Quitar clase favorites
      }
  
  localStorage.setItem('favoritesServer', JSON.stringify(favoritSeries));  
  renderFavoritSeries (favoritSeries);
  
  };

//Funcion para escuchar evento y seleccionar los favoritos
const listenerSelected = ()=>{
  const allSeriesLi = document.querySelectorAll ('.js-seriesLi');
  //devuelve un array y hay que recorrerlo
  for (const li of allSeriesLi){
    li.addEventListener("click", handleClickFav);
  }
 
}

// Cargar los datos de favoritos almacenado en el LS
function loadFavorites(){
const favoritSeriesLS = localStorage.getItem('favoritesServer');
if (favoritSeriesLS){
favoritSeries = JSON.parse (favoritSeriesLS);
renderFavoritSeries (favoritSeries);
}
}


//Funcion que pintar la lista de todas las series en la ul
function renderSeries (list){
    for (const serie of list){
      // en mi array de favoritos voy a buscar si la serie ya está en favoritos
    const findFav = favoritSeries.find ((serieFav) => serieFav.mal_id === serie.mal_id);
    const errorImg = serie.images.jpg.image_url ? serie.images.jpg.image_url : 'https://placehold.co/400x600';
    let cssClass = findFav ? 'favorites' : '';
     ulSearch.innerHTML += `
    <li id="${serie.mal_id}" class="js-seriesLi result_li ${cssClass} ">
      <img src="${errorImg}" alt="imagen de la serie" />
      <h3>${serie.title}</h3>
    </li>`;

    }
  listenerSelected();
  
 }
  
//Funcion para pedir datos de la Api la busqueda que se ha realizado
function getDataSearch(valueSearch) {
    fetch(
      `https://api.jikan.moe/v4/anime?q=${valueSearch}`
    )
      .then((resp) => resp.json())
      .then((info) => {
        series = info.data;
        //Se llama a la funcion que pinta los datos para que salgan una vez la api da los datos
        renderSeries (series);
        
      
      });
  }
     //Buscador, funcion para escuchar el evento y filtrar por titulo las series que busque la usuaria
  function handleSearch (event){
    event.preventDefault();
    ulSearch.innerHTML = "";
    const valueSearch = inputSearch.value.trim();
    if (valueSearch === "") {
      // Si el campo de búsqueda está vacío, recarga la lista inicial
      ulSearch.innerHTML = ""; // Limpia los resultados de búsqueda anteriores
      loadInitialSeries();
      return;
    }
     
      //llamo a la funcion que pinta los datos de la api con el parametro nuevo
    getDataSearch(valueSearch);   
    
    }

  btnSearch.addEventListener("click", handleSearch);
  loadFavorites();




// Función para obtener la lista inicial de series 
function loadInitialSeries() {
  fetch('https://api.jikan.moe/v4/anime') 
      .then(resp => resp.json())
      .then(info => {
          series = info.data;
          renderSeries(series);
      });
}

// Evento que se ejecuta cuando el DOM está completamente cargado
document.addEventListener('DOMContentLoaded', () => {
  loadFavorites(); // Carga los favoritos del localStorage
  loadInitialSeries(); // Carga la lista inicial de series
});




     