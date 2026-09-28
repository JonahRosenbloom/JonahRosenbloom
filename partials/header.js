/* Shared site header, included on every page with:
     <script>var SITE_BASE = "";</script>          (or "../" from inside /about/)
     <script>var SITE_PAGE = "home";</script>       (or "about")
     <script src="partials/header.js"></script>     (or "../partials/header.js")
   Uses document.write so it lands exactly where the <script> tag sits, and
   ships its own CSS classes (site-header__*) rather than reusing the captured
   Wix markup: that markup's layout depends on component IDs Wix generates
   separately per page, so it only ever renders correctly on the page it was
   captured from. Plain, hand-written CSS is what makes one header file safe
   to share across pages. Styling lives in overrides.css. */
(function () {
  var B = (typeof SITE_BASE === 'string') ? SITE_BASE : '';
  var PAGE = (typeof SITE_PAGE === 'string') ? SITE_PAGE : '';
  var cur = function (id) { return PAGE === id ? ' aria-current="page"' : ''; };

  var links = [
    ['home', 'Home', B + 'index.html'],
    ['about', 'About', B + 'about/index.html'],
    ['blog', 'Blog', 'https://jerinfo88.wixsite.com/jonahrosenbloom/blog'],
    ['portfolio', 'Portfolio Page', 'https://jerinfo88.wixsite.com/jonahrosenbloom/portfolio']
  ];
  var navHtml = links.map(function (l) {
    return '<li><a class="site-header__link" data-part="menu-item-link" href="' + l[2] + '"' + cur(l[0]) + '>' + l[1] + '</a></li>';
  }).join('');

  document.write('' +
'<header class="site-header">' +
  '<div class="site-header__row">' +
    '<a href="' + B + 'index.html" class="site-header__brand" aria-label="Home">' +
      '<img src="' + B + 'assets/img/logo.png" alt="JR circuit-trace monogram logo" class="site-header__logo"/>' +
    '</a>' +
    '<nav class="navbar" aria-label="Site">' +
      '<ul class="site-header__nav-list">' + navHtml + '</ul>' +
    '</nav>' +
    '<button type="button" class="hamburger-open-button site-header__burger" aria-label="Menu">' +
      '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>' +
    '</button>' +
  '</div>' +
'</header>');
})();
