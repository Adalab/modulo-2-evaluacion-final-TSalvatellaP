'use strict';

let series = [];

const ulSearch = document.querySelector ('.js-search');


//Funcion que pinta la lista de todas las series en la ul
function renderSeries (list){
    for (const serie of list){
    ulSearch.innerHTML += `
    <li>
      <img src="${serie.images.jpg.image_url}" alt="imagen de la serie"/>
      <h3>${serie.title}</h3>
     
    </li>`;

    }
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
       
              
      });
  }
  getDataApi();
  

  