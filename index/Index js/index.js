// INDEX JS LIVE VER. 2025-08-29-01

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
document.querySelector('contactForm')?.addEventListener('submit', async function(e) {
  e.preventDefault();

  const form = e.target;

// Convert form fields to a JS object
  const data = {
    email: form.email.value,
    name: form.name.value,
    list_ids: ["ZzmLgD5"], // 👈 Use this exact ID from Sender.net
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
      alert("Thank you! Your request has been submitted.");
      form.reset(); // optional
      window.location.href = "https://lunyns.com/thanks/thanks.html"; // redirect to thank you page
    } else {
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
// ✅ TAWK.TO SCRIPT — (LEAVE AS IS)
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/68a8808ed6067019238eff16/1j393cbpd';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();
//     Tawk.to Script End
