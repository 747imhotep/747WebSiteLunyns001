var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/68a8808ed6067019238eff16/1j393cbpd';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();

//     <script src="../COCONUTS/2COCONUTS_js/2coconuts.js"></script>
// <!---------------------------------------------------------------------------------------->



// <!-- CLEAR FORM -->
  // Clear all form fields when Clear Form button is clicked
  document.getElementById('clearFormBtn').addEventListener('click', () => {
    const form = document.querySelector('form[action^="mailto"]');
    if (form) {
      form.reset();  // resets all input/textarea/select to their default values (empty in your case)
    }
  });
// <!-- CLEAR FORM END -->


// <!-- OPEN RFQ -->
      // Function to open modal and optionally prefill form
      function openRFQModal(prefillProduct = null) {
        const modal = document.getElementById('RFQ-modal');
        if (modal) {
          modal.style.display = 'block';
        }

        // Prefill the subject if product info is provided
        if (prefillProduct) {
          const subjectInput = document.getElementById('subject');
          if (subjectInput) {
            subjectInput.value = `${prefillProduct.toUpperCase()}  Quotation Request`;
          }

          // Optional: Prefill the message textarea
          const messageInput = document.getElementById('message');
          if (messageInput) {
            messageInput.value = `Dear team,\n\nI would like to request a quotation for ${prefillProduct.toUpperCase()} \nKindly provide details regarding pricing, payment method, and minimum order quantity (MOQ) at your earliest convenience.\n\nThank you.`;
          }
        }
      }


      // Handle opening the modal on page load based on URL hash
      window.addEventListener('DOMContentLoaded', () => {
        const hash = window.location.hash;

        if (hash === '#RFQ') {
          openRFQModal(); // basic modal open
        } else if (hash.startsWith('#RFQ-')) {
          const product = hash.replace('#RFQ-', ''); // e.g., "10ppm"
          openRFQModal(product); // open and prefill
        }
      });

      // Close the modal when the close button is clicked
      document.querySelector('#RFQ-modal .close')?.addEventListener('click', function () {
        const modal = document.getElementById('RFQ-modal');
        if (modal) {
          modal.style.display = 'none';
        }
      });
      // Also close the modal when Escape key is pressed
      document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
          const modal = document.getElementById('RFQ-modal');
          if (modal && modal.style.display === 'block') {
        modal.style.display = 'none';
          }
        }
      });
      // Close the modal if user clicks outside of it
      window.onclick = function (event) {
        const modal = document.getElementById('RFQ-modal');
        if (event.target === modal) {
          modal.style.display = 'none';
        }
      };

       // Handle links like <a href="#RFQ">
document.querySelectorAll('a[href="#RFQ"]').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    openRFQModal();
    history.replaceState(null, '', '#RFQ');
  });
});

// Handle links like <a href="#RFQ-10ppm">
document.querySelectorAll('a[href^="#RFQ-"]').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const product = this.getAttribute('href').replace('#RFQ-', '');
    openRFQModal(product);
    history.replaceState(null, '', `#RFQ-${product}`);
  });
});


// <!-- OPEN RFQ END -->
