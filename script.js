(function(){
  const buttons=document.querySelectorAll('[data-filter]');
  const items=document.querySelectorAll('[data-category]');
  buttons.forEach(button=>button.addEventListener('click',()=>{const filter=button.dataset.filter;buttons.forEach(b=>b.setAttribute('aria-pressed','false'));button.setAttribute('aria-pressed','true');items.forEach(item=>{item.style.display=filter==='all'||item.dataset.category.includes(filter)?'':'none';});}));

  const PASSWORD='portfolio'; // Placeholder password. Replace before publishing. This is lightweight client-side gating only.
  const overlay=document.querySelector('[data-password-overlay]');
  const unlocked=sessionStorage.getItem('sarahPortfolioUnlocked')==='true';
  const isProtectedPage=document.body.classList.contains('protected-page');

  if(isProtectedPage&&!overlay&&!unlocked){
    const current=window.location.pathname.split('/').pop()+window.location.search+window.location.hash;
    window.location.replace(`work.html?next=${encodeURIComponent(current)}`);
    return;
  }

  if(!overlay) return;
  if(unlocked){overlay.hidden=true;document.body.classList.remove('portfolio-locked');return;}
  overlay.hidden=false;document.body.classList.add('portfolio-locked');
  const input=overlay.querySelector('input[name="password"]');
  setTimeout(()=>input&&input.focus(),50);
  overlay.querySelector('[data-password-form]').addEventListener('submit',event=>{
    event.preventDefault();
    const error=overlay.querySelector('[data-password-error]');
    if(input.value===PASSWORD){
      sessionStorage.setItem('sarahPortfolioUnlocked','true');
      const next=new URLSearchParams(window.location.search).get('next');
      if(next&&/^[a-z0-9-]+\.html(?:[?#].*)?$/i.test(next)){window.location.href=next;return;}
      overlay.hidden=true;
      document.body.classList.remove('portfolio-locked');
    }else{
      error.textContent='That password did not work. Please try again or contact Sarah.';
      input.select();
    }
  });
})();