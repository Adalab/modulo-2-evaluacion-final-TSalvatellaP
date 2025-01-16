let r=[],i=[];const o=document.querySelector(".js-ulSearch"),S=document.querySelector(".js-btnSearch"),l=document.querySelector(".js-search"),a=document.querySelector(".js-favorites"),m=document.querySelector(".js-btnFavorite"),h=document.querySelector(".js-btnReset");function g(){o.innerHTML="",l.value=""}function d(){a.innerHTML="",localStorage.removeItem("favoritesServer"),i=[]}function j(t){t.preventDefault(),g(),d()}h.addEventListener("click",j);function p(t){t.preventDefault(),d()}m.addEventListener("click",p);function u(t){a.innerHTML="";for(const e of t)a.innerHTML+=`
  <li id="${e.mal_id}" >
            <div class="favorit_li" >
              <button class="btnX js-btnX" >&#215</button>
              <h3>${e.title}</h3>
              <img class ="favorit_img" src="${e.images.jpg.image_url}" alt="imagen de la serie">
             </div>
          </li>`}const L=t=>{const e=parseInt(t.currentTarget.id),s=r.find(n=>n.mal_id===e);i.findIndex(n=>n.mal_id===e)===-1&&(i.push(s),u(i)),localStorage.setItem("favoritesServer",JSON.stringify(i)),v(r)},F=()=>{const t=document.querySelectorAll(".js-seriesLi");for(const e of t)e.addEventListener("click",L)};function _(){const t=localStorage.getItem("favoritesServer");t&&(i=JSON.parse(t),u(i))}function v(t){for(const e of t){const s=i.find(f=>f.mal_id===e.mal_id),c=e.images.jpg.image_url?e.images.jpg.image_url:"https://placehold.co/400x600";let n=s?"favorites":"";o.innerHTML+=`
    <li id="${e.mal_id}" class="js-seriesLi result_li ${n} ">
      <img src="${c}" alt="imagen de la serie" />
      <h3>${e.title}</h3>
     
    </li>`}F()}function b(t){fetch(`https://api.jikan.moe/v4/anime?q=${t}`).then(e=>e.json()).then(e=>{r=e.data,v(r)})}function k(t){t.preventDefault(),o.innerHTML="";const e=l.value;b(e)}S.addEventListener("click",k);_();
//# sourceMappingURL=main.js.map
