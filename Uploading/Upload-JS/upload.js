// 🟢 UPLOAD JAVA SCRIPT

// ✅ 1. Beginning
let form, serialInput;
document.addEventListener('DOMContentLoaded', () => {
  form = document.getElementById('contactFormsPree');
  serialInput = document.getElementById("serial-number");
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
// ends of No 1
// 🔴🔴🔴 the issue is here. If this line is removed, it says "There was a problem submittin the form"

// ✅ 2.0 Debug: Show Serial Number on submit
  if (form && serialInput) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

// 🔁 2.1 Get full phone number with country code 
    const phoneInput = document.querySelector("#phone");
    const iti = window.intlTelInput(phoneInput, {
    initialCountry: "auto",
    separateDialCode: false,
    nationalMode: false,
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
});

    // 🟡 const iti = window.intlTelInputGlobals.getInstance(phoneInput);
    const fullPhoneNumber = iti.getNumber(intlTelInputUtils.numberFormat.E164); // E.g., +123456789
    
// 2.2 Set the phone input value to the full international number
    phoneInput.value = fullPhoneNumber;

    const data = new FormData(form);
    

// 🔧 2.3 Debug 🟡
      console.log("Serial Number being submitted:", serialInput.value);

// 2.4 Attach serial to redirect URL BEFORE form submission
    attachSerialToRedirect();


// 🔧 2.5 Optional: show serial in console 
    const action = form.action;
    const submitButton = form.querySelector('button[type="submit"]');

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
    }

// Debug: log all form data before submission
    for (let pair of data.entries()) {
    console.log(`${pair[0]}:`, pair[1]);
    }

// Update the submit button before the fetch begins
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'sending...';
    }// END of Debug

// ✅ Log the action URL (to double-check Formspree URL)
    console.log("Form action URL:", action);

    fetch(action, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    })
    .then(response => {
      if (response.ok) {

        // ❗ MODIFICATION ❗window.location.href = form.querySelector('#redirectField').value;// ❗ MODIFICATION ❗
        
        const redirectURL = document.getElementById('redirectField')?.value;
        if (redirectURL) {
          window.location.href = redirectURL;
      } else {
        alert("Form submitted, but redirect URL missing.");
        }
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
  }); // 🟡🟡🟡 DOMContent is closed here.

// ✅ 3. Serial number generator: 0001 to 2000
  function generateSerialNumber() {
    const number = Math.floor(Math.random() * 2000) + 1;  // 1 to 2000
    return String(number).padStart(4, '0');               // pad with zero to 4 digits
  }

// ✅ 4. Attach serial number to redirect URL
  function attachSerialToRedirect() {
    // ❗ MODIFICATION ❗const serial = document.getElementById('serial-number')?.value || '';
    const serial = serialInput?.value || '';
    const redirectField = document.getElementById('redirectField');
    if (redirectField && serial) {
      redirectField.value = `https://lunyns.com/Thanks/Thanks.html?serial=${serial}`;
    }
  }
}); // ✅ END of DOMContentLoaded 

