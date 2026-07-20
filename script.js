(function(){
  const buttons=document.querySelectorAll('[data-filter]');
  const items=document.querySelectorAll('[data-category]');
  buttons.forEach(button=>button.addEventListener('click',()=>{const filter=button.dataset.filter;buttons.forEach(b=>b.setAttribute('aria-pressed','false'));button.setAttribute('aria-pressed','true');items.forEach(item=>{item.style.display=filter==='all'||item.dataset.category.includes(filter)?'':'none';});}));

  const PASSWORD='portfolio'; // Change before publishing. This is lightweight client-side gating only.
  const overlay=document.querySelector('[data-password-overlay]');
  if(!overlay) return;
  const unlocked=sessionStorage.getItem('sarahPortfolioUnlocked')==='true';
  if(unlocked){overlay.hidden=true;document.body.classList.remove('portfolio-locked');return;}
  overlay.hidden=false;document.body.classList.add('portfolio-locked');
  const input=overlay.querySelector('input[name="password"]');
  setTimeout(()=>input&&input.focus(),50);
  overlay.querySelector('[data-password-form]').addEventListener('submit',event=>{event.preventDefault();const error=overlay.querySelector('[data-password-error]');if(input.value===PASSWORD){sessionStorage.setItem('sarahPortfolioUnlocked','true');overlay.hidden=true;document.body.classList.remove('portfolio-locked');}else{error.textContent='That password did not work. Please try again or contact Sarah.';input.select();}});
})();