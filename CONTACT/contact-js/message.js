//     MASSAGE US - JS
// <!---------------------------------------------------------------------------------------->



  document.addEventListener('DOMContentLoaded', () =>{

  
  // Clear all form fields when Clear Form button is clicked
  document.getElementById('clearFormBtn').addEventListener('click', () => {
    const form = document.getElementById('contactFormsPree');
    const thankYou = document.getElementById('thank-you');

    if (form) {
      form.reset();
      form.style.display = 'block';
    }

    if (thankYou) {
      thankYou.style.display = 'none';
    }
  });

  const form = document.getElementById('contactFormsPree');
  const thankYou = document.getElementById('thank-you');

  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      const data = new FormData(form);
      const action = form.action;
      const submitButton = form.querySelector('button[type="submit"]');

      // Disable submit button to prevent double click
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
      }

      try {
        const response = await fetch(action, {
          method: 'POST',
          body: data,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          form.style.display = 'none';
          thankYou.style.display = 'block';
        } else {
          alert('There was a problem submitting the form.');
          if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = 'Send';
          }
        }
      } catch (error) {
        alert('An error occurred. Please try again.');
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = 'Send';
        }
      }
    });
  }

  // Prefill the RFQ form based on URL hash like #RFQ-10ppm
  window.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash;

    if (hash.startsWith('#RFQ-')) {
      const product = decodeURIComponent(hash.replace('#RFQ-', ''));

      // Set subject
      const subjectInput = document.getElementById('subject');
      if (subjectInput) {
        subjectInput.value = `${product.toUpperCase()} Quotation Request`;
      }

      // Set message
      const messageInput = document.getElementById('message');
      if (messageInput) {
        messageInput.value = `Dear team,\n\nI would like to request a quotation for ${product.toUpperCase()}.\nKindly provide details regarding:\n- Pricing\n- Payment terms\n- Minimum order quantity (MOQ)\n\nThank you.`;
      }

      // Optional: Scroll smoothly to the RFQ form
      const rfqSection = document.getElementById('RFQ');
      if (rfqSection) {
        rfqSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });


// 📌 
});