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

      const data = new FormData(form);
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
});
  




// 📌 
