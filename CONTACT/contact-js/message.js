//     MASSAGE US - JS
// <!---------------------------------------------------------------------------------------->



  // Clear all form fields when Clear Form button is clicked
  document.getElementById('clearFormBtn').addEventListener('click', () => {
    //const form = document.querySelector('form[action^="mailto"]');
    // Select the form by tag, ID, or any other appropriate selector
    const form = document.getElementById('contactFormsPree');
 // if it's the only form

    if (form) {
      form.reset();  // resets all input/textarea/select to their default values (empty in your case)
    }
  });

  const form = document.getElementById('contactFormsPree');
  const thankYou = document.getElementById('thank-you');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const data = new FormData(form);
    const action = form.action;
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
    }
    if (form) form.reset();
    if (thankYou) {
      thankYou.style.display = 'none';
      form.style.display = 'block'; // re-show the form if hidden
    }
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    if (response.ok) {
      form.style.display = 'none';
      thankYou.style.display = 'block';
    } else{
      alert('There was a problem submitting the form.');
      submitButton.disabled = false;
      submitButton.textContent = 'Send';
    }
  });


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