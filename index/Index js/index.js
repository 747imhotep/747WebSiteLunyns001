// INDEX JS LIVE VER. 2025-08-29-01  -  FRONTEND

console.log("Script loaded:", document.readyState);


// <!---------------------------------------------------------------------------------------->

// ✅ CLEAR FORM BUTTON
  document.getElementById('clearFormBtn').addEventListener('click', () => {
    const form = document.querySelector('contactForm');
    if (form) {
      form.reset();  // resets all input/textarea/select to their default values (empty in your case)
    }
  });

// <!---------------------------------------------------------------------------------------->

      // ✅ OPEN RFQ MODAL
      function openRFQModal(prefillProduct = null) {
        const modal = document.getElementById('RFQ-modal');
        if (modal) {
          modal.style.display = 'block';
        }

        if (prefillProduct) {
          const subjectInput = document.getElementById('subject');
          if (subjectInput) {
            subjectInput.value = `${prefillProduct.toUpperCase()}  Quotation Request`;
          }

          const messageInput = document.getElementById('message');
          if (messageInput) {
            messageInput.value = `Dear team,\n\nI would like to request a quotation for ${prefillProduct.toUpperCase()} \nKindly provide details regarding pricing, payment method, and minimum order quantity (MOQ) at your earliest convenience.\n\nThank you.`;
          }
        }
      }

      // ✅ OPEN MODAL BASED ON URL
      window.addEventListener('DOMContentLoaded', () => {
        const hash = window.location.hash;

        if (hash === '#RFQ') {
          openRFQModal(); // basic modal open
        } else if (hash.startsWith('#RFQ-')) {
          const product = hash.replace('#RFQ-', ''); // e.g., "10ppm"
          openRFQModal(product); // open and prefill
        }
      });

      // ✅ CLOSE MODAL BUTTON
      document.querySelector('#RFQ-modal .close')?.addEventListener('click', function () {
        const modal = document.getElementById('RFQ-modal');
        if (modal) {
          modal.style.display = 'none';
        }
      });

      // ✅ ESC KEY CLOSE
      document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
          const modal = document.getElementById('RFQ-modal');
          if (modal && modal.style.display === 'block') {
        modal.style.display = 'none';
          }
        }
      });

      // ✅ CLICK OUTSIDE MODAL TO CLOSE
      window.onclick = function (event) {
        const modal = document.getElementById('RFQ-modal');
        if (event.target === modal) {
          modal.style.display = 'none';
        }
      };

       // ✅ LINK TRIGGERS FOR RFQ
document.querySelectorAll('a[href="#RFQ"]').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    openRFQModal();
    history.replaceState(null, '', '#RFQ');
  });
});

document.querySelectorAll('a[href^="#RFQ-"]').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const product = this.getAttribute('href').replace('#RFQ-', '');
    openRFQModal(product);
    history.replaceState(null, '', `#RFQ-${product}`);
  });
});

// <!---------------------------------------------------------------------------------------->

// ✅ SUBMIT HANDLER — MAIN FORM
const form = document.querySelector('#contactForm');
form?.addEventListener('submit', async function(e) {
  e.preventDefault(); // ✅ prevents page reload

  // now you can use `form` safely
  const formElement = e.target;

// Convert form fields to a JS object
  const data = {
    email: form.email.value,
    name: form.name.value,
    list_ids: ["ZzmLgD5"], // 👈 Use this exact YOUR_LIST_ID from Sender.net
    fields: {
      userType: form.userType.value,
      productType: form.productType.value,
      subject: form.subject.value,
      message: form.message.value,
      marketing_consent: form.marketing_consent?.checked ?? true
    },
    tags: [form.userType.value], // e.g., "Buyer", "Seller", etc.
    status: "active" // required to trigger automations
  };

  try {
    const response = await fetch('https://rfq-worker.my-workerlunyns.workers.dev', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // Add authorization header if required by your API
      },
      body: JSON.stringify(data)
    });

  if (response.ok) {
  const result = await response.json();
    if (result.success) {
      // ✅ Success — redirect to thank-you page
      window.location.href = "https://lunyns.com/Thanks/Thanks.html";
    } else {
      // ⚠️ Backend returned 200 but success: false (edge case)
      console.error("Unexpected response:", result);
      alert("Error submitting form. Please try again.");
    }
    } else {
      // ❌ Server returned error status (e.g. 400)
      const error = await response.json();
      console.error("Sender API Error:", error);
      alert("Error submitting form. Please try again.");
    }
    } catch (err) {
      console.error("Request failed:", err);
      alert("Oh No! Network error. Please check your connection.");
    }
});



// <!---------------------------------------------------------------------------------------->

