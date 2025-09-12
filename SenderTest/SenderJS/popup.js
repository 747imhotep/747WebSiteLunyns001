// POPUP.js | POPUP FORM
document.addEventListener("DOMContentLoaded", function () {
  // Check if sender already exists to prevent duplicate script load
  if (!window.sender) {
    (function (s, e, n, d, er) {
      s['Sender'] = er;
      s[er] = s[er] || function () {
        (s[er].q = s[er].q || []).push(arguments)
      };
      s[er].l = 1 * new Date();
      var a = e.createElement(n),
          m = e.getElementsByTagName(n)[0];
      a.async = 1;
      a.src = d;
      m.parentNode.insertBefore(a, m);
    })(window, document, 'script', 'https://cdn.sender.net/accounts_resources/universal.js', 'sender');

    // Safe init after slight delay
    const interval = setInterval(() => {
      if (typeof window.sender === 'function') {
        sender('8ff476a5273454');
        clearInterval(interval);
      }
    }, 100);
  }
});




