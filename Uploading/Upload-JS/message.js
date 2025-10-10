//     🟢 MASSAGE US - JS
// <!---------------------------------------------------------------------------------------->


  
  // ✅ Clear all form fields when Clear Form button is clicked
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactFormsPree');
  const thankYou = document.getElementById('thank-you');

  // ✅ Clear Form button logic
  const clearBtn = document.getElementById('clearFormBtn');
  if (clearBtn && form) {
    clearBtn.addEventListener('click', () => {
      form.reset();
      form.style.display = 'block';

      if (thankYou) {
        thankYou.style.display = 'none';
      }
    });
  }

  // ✅ Submit handler
  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      // Validate and set internatonal phone number vefore collection form data
      if (!iti.isValidNumber()) {
        alert; // Stop submission if invalid
      }

      phoneInput.value = iti.getNumber(); // Set the correct international format

      const data = new FormData(form); // ✅ Now it will include the updated phone number
      const action = form.action;
      const submitButton = form.querySelector('button[type="submit"]');

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
          if (thankYou) thankYou.style.display = 'block';
        } else {
          alert('There was a problem submitting the form.');
        }
      } catch (error) {
        console.error('Form submission error:', error);
        alert('An error occurred. Please try again.');
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = 'Send Message';
        }
      }
    });
  }
  // ✅ PHONE NUMBER
      const phoneInput = document.querySelector("#phone");
      const iti = window.intlTelInput(phoneInput, {
        initialCountry: "auto",
        geoIpLookup: function (callback) {
          fetch("https://ipinfo.io/json?token=64aa12a0b8c627")
            .then(resp => resp.json())
            .then(resp => callback(resp.country || "us"));
        },
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js"
      });

      // Attach listener to form submission
  const form2 = document.querySelector("#contactFormsPree");
  form2.addEventListener("submit", function (e) {
    // Replace input value with full international number
    if (iti.isValidNumber()) {
      phoneInput.value = iti.getNumber(); // e.g. +11234567890
    } else {
      alert("Please enter a valid phone number.");
      e.preventDefault(); // Prevent submission if invalid
    }
});
  




// 📌 
