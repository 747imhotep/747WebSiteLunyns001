(function (s, e, n, d, er) {
  s['Sender'] = er;
  s[er] = s[er] || function () {
    (s[er].q = s[er].q || []).push(arguments);
  };
  s[er].l = 1 * new Date();
  var a = e.createElement(n),
      m = e.getElementsByTagName(n)[0];
  a.async = 1;
  a.src = d;
  m.parentNode.insertBefore(a, m);
})(window, document, 'script', 'https://cdn.sender.net/accounts_resources/universal.js', 'sender');


const API_KEY = 'SENDER_API_KEY'; // <-- Replace with your real API key
    const LIST_ID = 'ZzmLgD5'; // <-- Replace with your real List ID

    document.getElementById('subscribeForm').addEventListener('submit', async function(e) {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const name = document.getElementById('name').value;

      const response = await fetch('https://api.sender.net/v2/subscribers', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          name: name,
          listIds: [LIST_ID]
        })
      });

      const resultDiv = document.getElementById('result');
      if (response.ok) {
        resultDiv.innerText = '✅ Subscriber added successfully!';
      } else {
        const error = await response.json();
        resultDiv.innerText = '❌ Error: ' + (error.message || 'Something went wrong');
      }
    });