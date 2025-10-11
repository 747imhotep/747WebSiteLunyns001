// ✅ UPLOAD US - JS


// ✅ 1. Generate numeric Serial Number: 0001 to 2000
function generateSerialNumber() {
  const number = Math.floor(Math.random() * 2000) + 1;  // 1 to 2000
  return String(number).padStart(4, '0');               // pad with zero to 4 digits
}

// ✅ 2. Attach serial number to redirect URL
function attachSerialToRedirect() {
  const serial = document.getElementById('serial-number')?.value || '';
  const redirectField = document.getElementById('redirectField');

  if (redirectField && serial) {
    redirectField.value = `https://lunyns.com/Thanks/Thanks.html?serial=${serial}`;
  }
}

// ✅ 3. Main logic
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactFormsPree');
  const serialInput = document.getElementById('serial-number');
  const clearBtn = document.getElementById('clearFormBtn');
  const thankYou = document.getElementById('thank-you');

  // Auto-generate Serial Number on page load
  if (serialInput) {
    serialInput.value = generateSerialNumber();
  }

  // ✅ Clear Form logic
  if (clearBtn && form) {
    clearBtn.addEventListener('click', () => {
      form.reset();
      form.style.display = 'block';

      if (thankYou) {
        thankYou.style.display = 'none';
      }

      // Re-generate serial number when form is cleared
      if (serialInput) {
        serialInput.value = generateSerialNumber();
      }
    });
  }

  // ✅ Form submit handler
  if (form && serialInput) {
    form.addEventListener('submit', function (e) {
      e.preventDefault(); // Prevent default form submission

      console.log("Serial Number being submitted:", serialInput.value);

      // Attach serial to redirect field
      attachSerialToRedirect();

      const data = new FormData(form);
      const action = form.action;
      const submitButton = form.querySelector('button[type="submit"]');

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
      }

      fetch(action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      })
      .then(response => {
        if (response.ok) {
          // Redirect to the Thank You page
          window.location.href = document.getElementById('redirectField').value;
        } else {
          alert('There was a problem submitting the form.');
        }
      })
      .catch(error => {
        console.error('Form submission error:', error);
        alert('An error occurred. Please try again.');
      })
      .finally(() => {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = 'Send Message';
        }
      });
    });
  }
});
