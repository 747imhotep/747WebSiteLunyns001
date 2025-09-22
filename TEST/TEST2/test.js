// TEST TEST TEST

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

  // Move the injected Sender form into the shadow box once it loads
  const wrapper = document.getElementById('form-wrapper');

  if (!wrapper) return;

  const observer = new MutationObserver((mutations, obs) => {
    const injectedForm = document.querySelector('[id^="sender-widget-"]');

    if (injectedForm && !wrapper.contains(injectedForm)) {
      wrapper.appendChild(injectedForm); // Move it inside the shadow box
      obs.disconnect(); // Stop watching
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
});
