/* Shared site footer. See header.js for how the include works. */
(function () {
  var B = (typeof SITE_BASE === 'string') ? SITE_BASE : '';
  var year = new Date().getFullYear();

  var socials = [
    ['Facebook', 'http://www.facebook.com', '<path d="M13.5 9H16V6h-2.5C11.6 6 10 7.6 10 9.5V11H8v3h2v7h3v-7h2.2l.8-3H13v-1.2c0-.5.4-.8.7-.8Z"/>'],
    ['Instagram', 'http://www.instagram.com', '<rect x="4" y="4" width="16" height="16" rx="4"/><circle cx="12" cy="12" r="3.2" fill="none" stroke="#0A101E" stroke-width="1.4"/><circle cx="16.2" cy="7.8" r="1"/>'],
    ['YouTube', 'http://www.youtube.com', '<rect x="3.5" y="6.5" width="17" height="11" rx="3"/><path d="M10.5 9.5v5l4.3-2.5Z" fill="#0A101E"/>'],
    ['X', 'http://www.x.com', '<circle cx="12" cy="12" r="10"/><path d="M7 7l10 10M17 7 7 17" stroke="#0A101E" stroke-width="1.8" fill="none" stroke-linecap="round"/>'],
    ['LinkedIn', 'http://www.linkedin.com', '<rect x="4" y="4" width="16" height="16" rx="2.5"/><rect x="6.6" y="10" width="2.4" height="7.4" fill="#0A101E"/><circle cx="7.8" cy="7" r="1.4" fill="#0A101E"/><path d="M11.6 17.4V10h2.3v1.1c.5-.8 1.3-1.3 2.4-1.3 1.9 0 3 1.2 3 3.5v4.1h-2.4v-3.7c0-1-.4-1.7-1.3-1.7-.7 0-1.1.5-1.3 1-.1.2-.1.5-.1.8v3.6Z" fill="#0A101E"/>'],
    ['TikTok', 'http://www.tiktok.com', '<circle cx="12" cy="12" r="10"/><path d="M14.5 4.5c.3 1.7 1.4 2.9 3.2 3.1v2.3c-1.1 0-2.2-.3-3.2-1v5.1a4.6 4.6 0 1 1-4.6-4.6c.3 0 .6 0 .9.1v2.4a2.2 2.2 0 1 0 1.6 2.1V4.5Z" fill="#0A101E"/>']
  ];
  var socialHtml = socials.map(function (s) {
    return '<a href="' + s[1] + '" target="_blank" rel="noreferrer noopener" class="site-footer__social-link" aria-label="' + s[0] + '">' +
      '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">' + s[2] + '</svg></a>';
  }).join('');

  document.write('' +
'<footer id="comp-kbgakxmn" class="site-footer">' +
  '<div class="site-footer__row">' +
    '<a href="' + B + 'index.html" class="site-footer__brand">' +
      '<img src="' + B + 'assets/img/logo.png" alt="JR circuit-trace monogram logo" class="site-footer__logo"/>' +
      '<span class="site-footer__tagline">Crafting Digital Visions Daily</span>' +
    '</a>' +
    '<nav aria-label="Social Bar" class="site-footer__social">' + socialHtml + '</nav>' +
    '<div class="site-footer__contact">' +
      '<a href="mailto:hello@jrelec.io">hello@jrelec.io</a>' +
      '<span class="site-footer__dot" aria-hidden="true">&bull;</span>' +
      '<span>San Francisco, CA</span>' +
      '<span class="site-footer__dot" aria-hidden="true">&bull;</span>' +
      '<span class="site-footer__copyright">&copy; ' + year + ' Jonah Rosenbloom</span>' +
    '</div>' +
  '</div>' +
'</footer>');
})();
