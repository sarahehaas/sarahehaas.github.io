const PASSWORD = 'portfolio'; // Change this before publishing.
const KEY = 'sarahPortfolioUnlocked';
function unlockPortfolio(password){
  if(password === PASSWORD){sessionStorage.setItem(KEY,'true');document.querySelector('.modal-backdrop')?.classList.remove('open');document.querySelector('.protected-content')?.classList.remove('is-locked');return true;}return false;
}
document.addEventListener('DOMContentLoaded',()=>{
  const protectedContent=document.querySelector('.protected-content');
  const modal=document.querySelector('.modal-backdrop');
  if(protectedContent && modal && sessionStorage.getItem(KEY)!=='true'){protectedContent.classList.add('is-locked');modal.classList.add('open');}
  document.querySelector('#portfolio-password-form')?.addEventListener('submit',e=>{e.preventDefault();const input=document.querySelector('#portfolio-password');const error=document.querySelector('.modal-error');if(!unlockPortfolio(input.value)){error.textContent='That password didn’t work. Please try again.';input.focus();}});
});
