const menu = document.querySelector('[data-menu]');
const nav = document.querySelector('[data-nav]');

menu?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  document.body.classList.toggle('lock', open);
  menu.setAttribute('aria-expanded', String(open));
});

nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  document.body.classList.remove('lock');
  menu?.setAttribute('aria-expanded', 'false');
}));
