// TV-friendly JS: D-pad navigation, Enter as click, Back handling
(function(){
  const FOCUSABLE = 'button, a[href], [tabindex]:not([tabindex="-1"])';
  const btnSupport = document.getElementById('btnSupport');
  const btnAbout = document.getElementById('btnAbout');
  const btnBack = document.getElementById('btnBack');
  const mainScreen = document.getElementById('main-screen');
  const aboutScreen = document.getElementById('about-screen');

  if (!mainScreen || !aboutScreen) return;

  // Ensure buttons are focusable for remote
  [btnSupport, btnAbout, btnBack].forEach(el => {
    if (el) el.setAttribute('tabindex', '0');
  });

  // Explicit initial state (main visible, about hidden)
  function setInitial() {
    mainScreen.classList.remove('hidden');
    mainScreen.classList.add('visible');
    mainScreen.setAttribute('aria-hidden','false');

    aboutScreen.classList.remove('visible');
    aboutScreen.classList.add('hidden');
    aboutScreen.setAttribute('aria-hidden','true');
  }
  setInitial();

  // Small helper: move focus in DOM order
  function focusNext(direction = 1) {
    const focusables = Array.from(document.querySelectorAll(FOCUSABLE)).filter(el => isVisible(el));
    const idx = focusables.indexOf(document.activeElement);
    let next = 0;
    if (idx === -1) {
      next = (direction === 1) ? 0 : focusables.length - 1;
    } else {
      next = (idx + direction + focusables.length) % focusables.length;
    }
    focusables[next].focus();
  }

  function isVisible(el) {
    return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
  }

  // Map arrow keys to focus movement; Enter to activate; Back to go back
  document.addEventListener('keydown', (ev) => {
    const k = ev.key;
    // Arrow keys + D-pad codes
    if (k === 'ArrowDown' || k === 'ArrowRight' || k === 'PageDown') {
      ev.preventDefault();
      focusNext(1);
      return;
    }
    if (k === 'ArrowUp' || k === 'ArrowLeft' || k === 'PageUp') {
      ev.preventDefault();
      focusNext(-1);
      return;
    }
    if (k === 'Enter' || k === ' ' || k === 'Select') {
      // activate focused element
      const el = document.activeElement;
      if (el) {
        ev.preventDefault();
        el.click();
      }
      return;
    }
    // Back / Escape -> if in about screen, go back; else do nothing
    if (k === 'Backspace' || k === 'Escape' || k === 'BrowserBack') {
      if (aboutScreen && !aboutScreen.classList.contains('hidden')) {
        ev.preventDefault();
        // simulate back button
        if (btnBack) btnBack.click();
      }
      return;
    }
  });

  // Make show/hide functions that work with TV CSS (.hidden/.visible)
  function showAbout() {
    mainScreen.classList.remove('visible');
    mainScreen.classList.add('hidden');
    mainScreen.setAttribute('aria-hidden','true');

    aboutScreen.classList.remove('hidden');
    aboutScreen.classList.add('visible');
    aboutScreen.setAttribute('aria-hidden','false');
    // focus first element in about
    const f = aboutScreen.querySelector(FOCUSABLE);
    (f || btnBack || document.body).focus();
  }
  function showMain() {
    aboutScreen.classList.remove('visible');
    aboutScreen.classList.add('hidden');
    aboutScreen.setAttribute('aria-hidden','true');

    mainScreen.classList.remove('hidden');
    mainScreen.classList.add('visible');
    mainScreen.setAttribute('aria-hidden','false');
    const f = mainScreen.querySelector(FOCUSABLE);
    (f || btnSupport || document.body).focus();
  }

  // Wire buttons (they already existed)
  btnAbout && btnAbout.addEventListener('click', (e) => { e.preventDefault(); showAbout(); });
  btnBack && btnBack.addEventListener('click', (e) => { e.preventDefault(); showMain(); });
  // Support button: keep previous openExternal behavior (create anchor)
  btnSupport && btnSupport.addEventListener('click', (e) => {
    e.preventDefault();
    const url = "https://github.com/Holox-co/FireOS-WebApp/";
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    setTimeout(()=>a.remove(),400);
  });

  // On load, focus first main button for D-pad
  window.addEventListener('load', () => {
    const f = mainScreen.querySelector(FOCUSABLE);
    (f || btnSupport).focus();
  });

  // expose debug
  window.__FireOSWebAppTV = { showAbout, showMain };
})();