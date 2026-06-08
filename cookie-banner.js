(function () {
  var STORAGE_KEY = 'bulle-zen-cookie-consent';
  var GA_ID = 'G-XXXXXXXXXX'; // Remplacer par l'ID Google Analytics de Caroline

  var style = document.createElement('style');
  style.textContent = [
    '#cookie-banner {',
    '  position: fixed; bottom: 0; left: 0; right: 0; z-index: 9999;',
    '  background: #FEFCF9; border-top: 2px solid #E5B4A0;',
    '  box-shadow: 0 -4px 24px rgba(44,24,16,0.10);',
    '  padding: 20px 24px; display: flex; align-items: center;',
    '  justify-content: space-between; gap: 24px; flex-wrap: wrap;',
    '  font-family: Lato, system-ui, sans-serif;',
    '}',
    '#cookie-banner p { font-size: 0.88rem; color: #7A4830; line-height: 1.6; margin: 0; flex: 1; min-width: 200px; }',
    '#cookie-banner a { color: #9A4E38; text-decoration: underline; text-underline-offset: 3px; }',
    '#cookie-banner__actions { display: flex; gap: 12px; flex-shrink: 0; }',
    '#cookie-accept, #cookie-refuse {',
    '  padding: 10px 24px; border-radius: 50px;',
    '  font-family: Lato, system-ui, sans-serif; font-size: 0.88rem; font-weight: 700;',
    '  cursor: pointer; border: 2px solid #BF7055; transition: all 0.25s ease;',
    '}',
    '#cookie-accept { background: #BF7055; color: #FEFCF9; }',
    '#cookie-accept:hover { background: #9A4E38; border-color: #9A4E38; }',
    '#cookie-refuse { background: transparent; color: #BF7055; }',
    '#cookie-refuse:hover { background: #FBF3EE; }',
    '@media (max-width: 600px) {',
    '  #cookie-banner { flex-direction: column; align-items: flex-start; }',
    '  #cookie-banner__actions { width: 100%; }',
    '  #cookie-accept, #cookie-refuse { flex: 1; text-align: center; }',
    '}'
  ].join('\n');
  document.head.appendChild(style);

  function loadGA() {
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_ID, { anonymize_ip: true });
  }

  function showBanner() {
    var banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.innerHTML =
      '<p>Ce site utilise Google Analytics pour mesurer son audience. Ces cookies nécessitent votre consentement. <a href="cookies.html">En savoir plus</a></p>' +
      '<div id="cookie-banner__actions">' +
      '<button id="cookie-refuse">Refuser</button>' +
      '<button id="cookie-accept">Accepter</button>' +
      '</div>';
    document.body.appendChild(banner);

    document.getElementById('cookie-accept').addEventListener('click', function () {
      localStorage.setItem(STORAGE_KEY, 'accepted');
      banner.remove();
      loadGA();
    });

    document.getElementById('cookie-refuse').addEventListener('click', function () {
      localStorage.setItem(STORAGE_KEY, 'refused');
      banner.remove();
    });
  }

  var consent = localStorage.getItem(STORAGE_KEY);
  if (consent === 'accepted') {
    loadGA();
  } else if (!consent) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', showBanner);
    } else {
      showBanner();
    }
  }
})();
