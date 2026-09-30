
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav-links');
if(menuBtn && nav){
  menuBtn.addEventListener('click',()=>nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
}

const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{ if(entry.isIntersecting) entry.target.classList.add('visible'); });
},{threshold:.08});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const backTop=document.querySelector('.back-top');
if(backTop){
  window.addEventListener('scroll',()=>backTop.classList.toggle('show',window.scrollY>500));
  backTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
}

const form=document.querySelector('#serviceForm');
if(form){
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const data=new FormData(form);
    const service=data.get('service') || 'General Enquiry';
    const name=data.get('name') || '';
    const message=data.get('message') || '';
    const subject=encodeURIComponent(`Service Request – Master Digital Solutions & IT`);
    const body=encodeURIComponent(`Name: ${name}\nPhone: ${data.get('phone')||''}\nEmail: ${data.get('email')||''}\nService: ${service}\n\nMessage:\n${message}`);
    window.location.href=`mailto:YOUR_EMAIL@example.com?subject=${subject}&body=${body}`;
  });
}
