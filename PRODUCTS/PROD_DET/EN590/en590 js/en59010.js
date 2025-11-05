
document.getElementById("contactForm").addEventListener("submit", function() {

  //✅ Prepare form data
  const formData = new FormData(this);

  //✅ Send to Sender.net via Cloudflare Worker
  fetch("https://sender-proxy-worker.my-workerlunyns.workers.dev/", {
      method: "POST",
      body: formData
  })
  .then(async (response) => {
      let result;
      try {
          result = await response.json();
      } catch (err) {
          console.error("❌ Invalid JSON from Worker:", err);
          const text = await response.text();
          console.error("Raw response:", text);
          return;
      }

      if (!response.ok) {
          console.error("❌ Sender.net error:", result);
      } else {
          console.log("✅ Sender.net response:", result);
      }
  })
  .catch(err => {
      console.error("🚨 Network or Worker error:", err);
  });

  //⚠️ Don’t prevent default — Formspree will submit normally
});


// <!---------------------------------------------------------------------------------------->
// Cloudflare dashboard → Workers & Pages → sender-proxy-worker → Routes / Preview URL.

// Name it something like sender-forwarder
// Log in to Sender.net

// Click on the Settings tab at the top.

// Scroll to Variables → Add variable.

// Paste your key in the Value field.

// Save it. e5905ec3  178.51.79.47
// name: John Doe
// email: test@example.com
// subject: Test
// message: Hello world

// body: JSON.stringify({
//   email: email,
//   first_name: name,
//   list_ids: [178.51.79.47],          // <-- Replace 12345 with your actual list ID
//   tags: ["quotation_form"],
//   custom_fields: {
//     subject: subject,
//     message: message
