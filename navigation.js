// Keep the section indicator in sync without intercepting native anchor links.
(() => {
  const nav = document.querySelector('.top-nav');
  const research = document.getElementById('research');
  const publications = document.getElementById('publications');
  if (!nav || !research || !publications) return;
  const links = Array.from(nav.querySelectorAll('a'));
  let pending = false;
  function update() {
    const threshold = document.querySelector('.site-header').offsetHeight + 48;
    const section = publications.getBoundingClientRect().top <= threshold
      ? '#publications' : research.getBoundingClientRect().top <= threshold
      ? '#research' : '#home';
    links.forEach(link => {
      const active = link.getAttribute('href') === section;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    pending = false;
  }
  function scheduleUpdate() {
    if (!pending) { pending = true; requestAnimationFrame(update); }
  }
  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate);
  window.addEventListener('load', update);
  update();
})();
