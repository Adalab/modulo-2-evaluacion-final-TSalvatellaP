'use strict';

let series = [];

const ulSearch = document.querySelector ('.js-ulSearch');
const btnSearch = document.querySelector ('.js-btnSearch');
const inputSearch = document.querySelector ('.js-search');


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
  

  //Funcion para escuchar el evento sobre el input del buscador con boton

  function handleSearch (event){
    event.preventDefault();
    ulSearch.innerHTML = "";
    const valueSearch = inputSearch.value;
    console.log(valueSearch);
    const filteredSeries = series.filter((item)=>item.title.toLowerCase().includes(valueSearch.toLowerCase()));
    renderSeries(filteredSeries);
          
    }

  btnSearch.addEventListener("click", handleSearch);


 