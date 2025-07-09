document.addEventListener('DOMContentLoaded', () => {

  /* =========  HAMBURGER  ========= */
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu    = document.getElementById('nav-menu').querySelector('ul');
  const body       = document.body;

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    body.classList.toggle('no-scroll');
  });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      menuToggle.classList.remove('active');
      body.classList.remove('no-scroll');
    });
  });

  /* =========  SMOOTH SCROLL (native via CSS, but prevent iOS bug)  ========= */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth'});
      }
    });
  });

  /* =========  DARK MODE  ========= */
  const toggle   = document.getElementById('dark-mode-toggle');
  const saved    = localStorage.getItem('theme');
  const prefers  = window.matchMedia('(prefers-color-scheme: dark)');

  const setTheme = dark => {
    body.classList.toggle('dark-mode', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
    if (toggle) toggle.checked = dark;
  };

  // initial
  saved ? setTheme(saved === 'dark') : setTheme(prefers.matches);

  toggle.addEventListener('change', () => setTheme(toggle.checked));
  prefers.addEventListener('change', e => {
    if (!localStorage.getItem('theme')) setTheme(e.matches);
  });

  /* =========  CONTACT VALIDATION  ========= */
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name  = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const msg   = form.querySelector('#message').value.trim();

    if (!name || !email.includes('@') || !msg) {
      alert('Please fill out all fields correctly 🙂');
      return;
    }

    // Simulate success (replace w/ real service or Formspree)
    alert('Thanks! Your message has been sent.');
    form.reset();
  });

  /* =========  SCROLL-REVEAL  ========= */
  const observer = new IntersectionObserver((entries,obs)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  },{threshold:.2});

  document.querySelectorAll('.animate-on-scroll').forEach(el=>observer.observe(el));

});