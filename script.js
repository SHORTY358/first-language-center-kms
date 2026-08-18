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

function forceMobileLayoutOnNarrowDevice() {
  const deviceWidth = Math.min(window.screen?.width || window.innerWidth, window.screen?.height || window.innerHeight);
  if (deviceWidth > 700 || window.matchMedia('(max-width: 700px)').matches) return;

  let mobileCss = '';
  [...document.styleSheets].forEach((sheet) => {
    try {
      [...sheet.cssRules].forEach((rule) => {
        if (rule.type !== 4) return;
        const breakpoints = [...rule.conditionText.matchAll(/max-(?:device-)?width:\s*(\d+)px/g)].map((match) => Number(match[1]));
        if (breakpoints.some((breakpoint) => deviceWidth <= breakpoint)) mobileCss += [...rule.cssRules].map((nestedRule) => nestedRule.cssText).join('\n');
      });
    } catch (_) {}
  });

  if (mobileCss) {
    const fallback = document.createElement('style');
    fallback.dataset.mobileFallback = 'true';
    fallback.textContent = mobileCss;
    document.head.appendChild(fallback);
  }
}

forceMobileLayoutOnNarrowDevice();
