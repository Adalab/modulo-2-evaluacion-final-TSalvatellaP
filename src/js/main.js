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
//Valores que hay que resetear
function resetValues (){
  ulSearch.innerHTML = "";
 
}

function resetFavoritValue (){
  ulFavorites.innerHTML ="";
  localStorage.removeItem('favoritesServer');
}

//funcion para escuchar el evento reset y ejecutar funciones de reseteo
function handleClickReset(ev){
  ev.preventDefault();
  resetValues ();
  resetFavoritValue ();
}

btnReset.addEventListener('click', handleClickReset);

//escuchar evento de boton reset favoritos
//NO REFRESCA BIEN, CREO QUE TENGO MAL PUESTA LS
function handleClickResetFavorit(ev){
  ev.preventDefault();
  resetFavoritValue ();
}

btnResetFavorit.addEventListener('click', handleClickResetFavorit);


//funcion para pintar los favoritos
function renderFavoritSeries (favorites){ 
  ulFavorites.innerHTML ="";
  for (const oneFav of favorites){
  ulFavorites.innerHTML += `
  <li id="${oneFav.mal_id}" class=" favorites" >
            <div class="favorit_li" >
              <button class="btnX" >&#215</button>
              <h3>${oneFav.title}</h3>
              <img class ="favorit_img" src="${oneFav.images.jpg.image_url}" alt="imagen de la serie">
             </div>
          </li>`;
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
    //console.log (favoritSeries);
    renderFavoritSeries (favoritSeries);
     }
  
  localStorage.setItem('favoritesServer', JSON.stringify(favoritSeries));  
    
  };

//Funcion para escuchar evento y seleccionar los favoritos
const listenerFavorit = ()=>{
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
  ulSearch.innerHTML = "";
    for (const serie of list){
      // en mi array de favoritos voy a buscar si la serie ya está en favoritos
    const findFav = favoritSeries.find((serieFav) => serieFav.id === serie.id);

// NO SE POR QUE NO ME FUNCIONA, NO ME COJE LA CLASE
    let css = findFav ? 'favorites' : '' ;
    
    ulSearch.innerHTML += `
    <li id="${serie.mal_id}" class="${css} js-seriesLi result_li ">
      <img src="${serie.images.jpg.image_url}" 
      alt="imagen de la serie" 
      onerror="this.onerror=null; this.src='https://placehold.co/400x600';"/>
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
        loadFavorites();
        
       //console.log(series);
             
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

