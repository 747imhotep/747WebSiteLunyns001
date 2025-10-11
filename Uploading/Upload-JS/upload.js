//   ✅ 1. UPLOAD US - JS
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactFormsPree');
  const serialInput = document.getElementById("serial-number");
  const clearBtn = document.getElementById('clearFormBtn');
  const thankYou = document.getElementById('thank-you');

  // ✅ a) Auto-generate Serial Number on page load
  if (serialInput) {
    serialInput.value = generateSerialNumber();
  }

  // ✅ b) Clear Form logic
  if (clearBtn && form) {
    clearBtn.addEventListener('click', () => {
      form.reset();
      form.style.display = 'block';

      if (thankYou) {
        thankYou.style.display = 'none';
      }

  // ✅ c) Re-generate serial number when form is cleared
      if (serialInput) {
        serialInput.value = generateSerialNumber();
      }
    });
  }
}) // ends of No 1

  // ✅ 2. Debug: Show Serial Number on submit
  if (form && serialInput) {
  form.addEventListener('submit', function (e) {
  
    // Your existing form submission logic goes here...
    // For example, if you're using fetch to send via AJAX:
    e.preventDefault();

    // Optional: show serial in console
    console.log("Serial Number being submitted:", serialInput.value);

    // Attach serial to redirect URL BEFORE form submission
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
        window.location.href = form.querySelector('#redirectField').value;
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

  // ✅ Generate numeric Serial Number: 0001 to 2000

  function generateSerialNumber() {
    const number = Math.floor(Math.random() * 2000) + 1;  // 1 to 2000
    return String(number).padStart(4, '0');               // pad with zero to 4 digits
  }


  function attachSerialToRedirect() {
    const serial = document.getElementById('serial-number')?.value || '';
    const redirectField = document.getElementById('redirectField');
    if (redirectField && serial) {
      redirectField.value = `https://lunyns.com/Thanks/Thanks.html?serial=${serial}`;
    }
  }


  // ✅ Example: Set the serial number on page load (if needed)
  const serialInput = document.getElementById('serial-number');
  if (serialInput) {
    serialInput.value = generateSerialNumber();
  }

  // ✅ Attach serial to redirect on form submit
  const form = document.getElementById('contactFormsPree');
  if (form && serialInput) {
    form.addEventListener('submit', function () {
      console.log("Serial Number being submitted:", serialInput.value);
      attachSerialToRedirect();
   }
  )};
