/**
 * Page chrome shared by every page here: the theme control and the page menu.
 *
 * Lifted from the Expressive Assets site, which is why the two feel like one
 * hand. Two differences, both because this site is smaller and points outward:
 * the menu carries links to the library site as well as this one, and those
 * are marked so a click that leaves is not a surprise.
 *
 * The theme is deliberately two states rather than three. There is no "follow
 * the system", because a system guess is the thing this control exists to
 * override, and because checking artwork against both grounds is the job here
 * rather than a preference.
 *
 * Applied before first paint via applyStoredTheme(), which every page calls
 * inline in its head. A toggle that flashes the wrong theme on load is worse
 * than no toggle.
 */
(function () {
  /* Same storage key as the library site. They are different origins so the
     value does not actually travel; keeping the key identical costs nothing
     and means one less thing to reconcile if they ever share a host. */
  var KEY = 'expressive-assets-theme';
  var MODES = ['light', 'dark'];

  function stored() {
    try {
      var v = localStorage.getItem(KEY);
      return MODES.indexOf(v) === -1 ? 'light' : v;
    } catch (e) {
      return 'light';
    }
  }

  function apply(mode) { document.documentElement.setAttribute('data-theme', mode); }
  function save(mode) { try { localStorage.setItem(KEY, mode); } catch (e) { /* not fatal */ } }

  window.applyStoredTheme = function () { apply(stored()); };

  var ART = {
    light: '<circle cx="12" cy="12" r="4.2"/><path d="M12 2.6v2.6M12 18.8v2.6M2.6 12h2.6M18.8 12h2.6M5.4 5.4l1.8 1.8M16.8 16.8l1.8 1.8M18.6 5.4l-1.8 1.8M7.2 16.8l-1.8 1.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" fill="none"/>',
    dark: '<path d="M20 13.4A8.2 8.2 0 0 1 10.6 4a8.4 8.4 0 1 0 9.4 9.4Z"/>',
  };

  function svg(path) {
    return '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' + path + '</svg>';
  }

  window.mountThemeSwitch = function () {
    var hosts = document.querySelectorAll('[data-theme-switch]');
    if (!hosts.length) return;
    var current = stored();

    hosts.forEach(function (host) {
      host.classList.add('theme-switch');
      host.setAttribute('role', 'group');
      host.setAttribute('aria-label', 'Theme');
      host.innerHTML = '';

      MODES.forEach(function (mode) {
        var label = mode[0].toUpperCase() + mode.slice(1);
        var b = document.createElement('button');
        b.type = 'button';
        b.innerHTML = svg(ART[mode]);
        b.title = label;
        b.setAttribute('aria-label', label);
        b.setAttribute('data-mode', mode);
        b.setAttribute('aria-pressed', String(mode === current));
        b.addEventListener('click', function () {
          current = mode;
          apply(mode);
          save(mode);
          document.querySelectorAll('[data-theme-switch] button').forEach(function (o) {
            o.setAttribute('aria-pressed', String(o.getAttribute('data-mode') === mode));
          });
          document.dispatchEvent(new CustomEvent('themechange', { detail: { mode: mode } }));
        });
        host.appendChild(b);
      });
    });
  };

  /* --- Page menu ------------------------------------------------------ */

  var EA = 'https://masoncattdesign.github.io/expressive-assets-library/';

  var PAGES = [
    { group: 'Work', items: [
      { href: 'index.html', label: 'All work' },
      { href: 'updates.html', label: 'Updates' },
    ] },
    { group: 'Prototypes', items: [
      { href: 'bentos.html', label: 'BentoOS' },
    ] },
    { group: 'Expressive Assets', items: [
      { href: EA + 'index.html', label: 'Gallery', out: true },
      { href: EA + 'customizer.html', label: 'Customizer', out: true },
      { href: EA + 'about.html', label: 'About', out: true },
      { href: EA + 'system-map.html', label: 'System Map', out: true },
      { href: EA + 'asset-anatomy.html', label: 'Asset Anatomy', out: true },
    ] },
  ];

  function here() {
    var file = location.pathname.split('/').pop();
    return file === '' ? 'index.html' : file;
  }

  window.mountAppMenu = function () {
    var hosts = document.querySelectorAll('[data-app-menu]');
    if (!hosts.length) return;
    var current = here();

    hosts.forEach(function (host) {
      host.classList.add('app-menu');
      host.innerHTML = '';

      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'app-menu-btn';
      btn.title = 'Go to';
      btn.setAttribute('aria-label', 'Go to');
      btn.setAttribute('aria-haspopup', 'true');
      btn.setAttribute('aria-expanded', 'false');
      btn.innerHTML = svg('<rect x="4" y="5.4" width="16" height="2.2" rx="1.1"/><rect x="4" y="10.9" width="16" height="2.2" rx="1.1"/><rect x="4" y="16.4" width="16" height="2.2" rx="1.1"/>');

      var pop = document.createElement('div');
      pop.className = 'app-menu-pop';
      pop.hidden = true;

      PAGES.forEach(function (section) {
        var h = document.createElement('div');
        h.className = 'app-menu-group';
        h.textContent = section.group;
        pop.appendChild(h);

        section.items.forEach(function (item) {
          var a = document.createElement('a');
          a.href = item.href;
          a.textContent = item.label;
          if (item.out) {
            a.target = '_blank';
            a.rel = 'noopener';
            var m = document.createElement('span');
            m.className = 'out';
            m.textContent = '↗';
            m.setAttribute('aria-hidden', 'true');
            a.appendChild(m);
          } else if (item.href === current) {
            a.className = 'on';
            a.setAttribute('aria-current', 'page');
          }
          pop.appendChild(a);
        });
      });

      function open(yes) {
        pop.hidden = !yes;
        btn.setAttribute('aria-expanded', String(yes));
      }

      btn.addEventListener('click', function (e) { e.stopPropagation(); open(pop.hidden); });
      pop.addEventListener('click', function (e) { e.stopPropagation(); });
      document.addEventListener('click', function () { open(false); });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !pop.hidden) { open(false); btn.focus(); }
      });

      host.appendChild(btn);
      host.appendChild(pop);
    });
  };

  function mount() {
    window.mountThemeSwitch();
    window.mountAppMenu();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
