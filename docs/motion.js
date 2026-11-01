const systemMotion=matchMedia('(prefers-reduced-motion: reduce)');
let savedMotion;try{savedMotion=localStorage.getItem('pantry-atlas-motion');}catch{}
let reduced=savedMotion?savedMotion==='off':systemMotion.matches;
let observer;
function updateMotion(){document.documentElement.dataset.motion=reduced?'off':'on';const b=document.querySelector('#motionButton');if(b){b.textContent=reduced?'✧ Effects off':'✧ Effects on';b.setAttribute('aria-pressed',String(!reduced));}if(reduced){document.querySelectorAll('.card').forEach(c=>{c.classList.add('is-visible');c.style.removeProperty('--rx');c.style.removeProperty('--ry');});}}
updateMotion();
export function animateCards(){if(!observer&&'IntersectionObserver'in window)observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}},{threshold:0.06});for(const card of document.querySelectorAll('.card')){if(reduced||!observer)card.classList.add('is-visible');else observer.observe(card);}}
export function installMotion(){
 updateMotion();
 document.querySelector('#motionButton').addEventListener('click',()=>{reduced=!reduced;savedMotion=reduced?'off':'on';try{localStorage.setItem('pantry-atlas-motion',savedMotion);}catch{}updateMotion();});
 systemMotion.addEventListener('change',e=>{if(!savedMotion){reduced=e.matches;updateMotion();}});
 const grid=document.querySelector('#cards');let frame=0;
 grid.addEventListener('pointermove',e=>{if(reduced||e.pointerType!=='mouse'||!matchMedia('(hover:hover)').matches)return;const card=e.target.closest('.card');if(!card)return;cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{const box=card.getBoundingClientRect();const x=(e.clientX-box.left)/box.width,y=(e.clientY-box.top)/box.height;card.style.setProperty('--rx',((.5-y)*6).toFixed(2)+'deg');card.style.setProperty('--ry',((x-.5)*8).toFixed(2)+'deg');card.style.setProperty('--shine-x',x*100+'%');card.style.setProperty('--shine-y',y*100+'%');});});
 grid.addEventListener('pointerout',e=>{const card=e.target.closest('.card');if(card&&!card.contains(e.relatedTarget)){cancelAnimationFrame(frame);card.style.setProperty('--rx','0deg');card.style.setProperty('--ry','0deg');}});
 document.querySelectorAll('.hero-actions a').forEach(a=>a.addEventListener('click',e=>{const section=document.querySelector(a.getAttribute('href'));if(section){e.preventDefault();section.scrollIntoView({behavior:reduced?'instant':'smooth',block:'start'});if(a.dataset.focus==='ingredient')document.querySelector('#ingredient').focus({preventScroll:true});}}));
 document.addEventListener('error',e=>{if(e.target instanceof HTMLImageElement&&e.target.classList.contains('dish-photo')){e.target.hidden=true;e.target.parentElement.classList.add('photo-unavailable');}},{capture:true});
}
