import{a as m,S as p,i as a}from"./assets/vendor-CrlV4O_2.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const g="50367186-ce245e32e2c7fc274bc460135",y="https://pixabay.com/api/";async function h(r){const o={key:g,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:40};return(await m.get(y,{params:o})).data.hits}const c=document.querySelector(".gallery");let L=new p(".gallery a",{captionsData:"alt",captionDelay:250});function v(r){const o=r.map(({webformatURL:s,largeImageURL:i,tags:e,likes:t,views:n,comments:f,downloads:d})=>`
        <li class="gallery-item">
            <a href="${i}">
                <img src="${s}" alt="${e}" title="${e}" />
            </a>
        <div class="img-container">
            <div class="stats">
                <p><strong>Likes:</strong> ${t}</p>
                <p><strong>Views:</strong> ${n}</p>
                <p><strong>Comments:</strong> ${f}</p>
                <p><strong>Downloads:</strong> ${d}</p>
            </div>
        </div>
        </li>`).join("");c.insertAdjacentHTML("afterbegin",o),L.refresh()}function b(){c.innerHTML=""}function S(){document.querySelector(".loader").classList.add("is-active")}function q(){document.querySelector(".loader").classList.remove("is-active")}const l=document.querySelector(".form"),P=l.querySelector('input[name="search-text"]');let u="";l.addEventListener("submit",r=>{r.preventDefault();const o=P.value.trim();if(o===""){a.info({title:"Warning",message:"Please enter a search term."});return}u=o,b(),$()});function $(){S(),h(u).then(r=>{if(r.length===0){a.warning({title:"No results",message:"Sorry, there are no images matching your search query. Please try again.",position:"topRight",backgroundColor:" #ef4040",messageColor:" #fafafb",maxWidth:"432px",timeout:3e3});return}v(r)}).catch(r=>{a.error({title:"Error",message:"An error occurred. Please try again later."}),console.error(r)}).finally(()=>{q()})}
//# sourceMappingURL=index.js.map
