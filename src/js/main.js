'use strict';
let series = [];
let favoritSeries = [];

const ulSearch = document.querySelector ('.js-ulSearch');
const btnSearch = document.querySelector ('.js-btnSearch');
const inputSearch = document.querySelector ('.js-search');
const ulFavorites = document.querySelector ('.js-favorites');

const btnResetFavorit = document.querySelector ('.js-btnFavorite');
const btnReset = document.querySelector ('.js-btnReset');
const btnX = document.querySelector ('.js-btnX');

//BONUS
//Valores que hay que resetear
function resetValues (){
  ulSearch.innerHTML = "";
 
}

function resetFavoritValue (){
  ulFavorites.innerHTML ="";
  localStorage.removeItem('favoritesServer');
  favoritSeries = [];
 
}


function handleClickX(){
  const favSelected = favoritSeries.find((item) => item.mal_id === liClicked);
console.log(favSelected);
}


//btnX.addEventListener('click', handleClickX);


//funcion para escuchar el evento reset y ejecutar funciones de reseteo
function handleClickReset(ev){
  ev.preventDefault();
  resetValues ();
  resetFavoritValue ();
}

btnReset.addEventListener('click', handleClickReset);

//escuchar evento de boton reset favoritos
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
  <li id="${oneFav.mal_id}" >
            <div class="favorit_li" >
              <button class="btnX js-btnX" >&#215</button>
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
  renderSeries (series);  
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
  //console.log(favoritSeries);
    for (const serie of list){
      // en mi array de favoritos voy a buscar si la serie ya está en favoritos
    const findFav = favoritSeries.find ((serieFav) => serieFav.mal_id === serie.mal_id);
    console.log(findFav);
// NO SE POR QUE NO ME FUNCIONA, NO ME COJE LA CLASE
    let cssClass = findFav ? 'favorites' : '';
    
    ulSearch.innerHTML += `
    <li id="${serie.mal_id}" class="js-seriesLi result_li ${cssClass} ">
      <img src="${serie.images.jpg.image_url}" 
      alt="imagen de la serie" 
      onerror="this.onerror=null; this.src='https://placehold.co/400x600';"/>
      <h3>${serie.title}</h3>
     
    </li>`;

    }
  listenerFavorit();
  
 }
  
//Funcion para pedir datos de la Api la busqueda que se ha realizado
function getDataApi(valueSearch) {
    fetch(
      `https://api.jikan.moe/v4/anime?q=${valueSearch}`
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
 
 
    //Buscador, funcion para escuchar el evento y filtrar por titulo las series que busque la usuaria
  function handleSearch (event){
    event.preventDefault();
    ulSearch.innerHTML = "";
    const valueSearch = inputSearch.value;
     
      //llamo a la funcion que pinta los datos de la api con el parametro nuevo
    getDataApi(valueSearch);   
    renderSeries(valueSearch);  
    }

  btnSearch.addEventListener("click", handleSearch);


     