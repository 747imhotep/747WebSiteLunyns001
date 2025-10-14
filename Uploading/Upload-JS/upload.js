// 🟢 UPLOAD JAVA SCRIPT

// ✅ 1. Beginning
let form, serialInput;
document.addEventListener('DOMContentLoaded', () => {
  form = document.getElementById('contactFormsPree');
  serialInput = document.getElementById("serial-number");
  const clearBtn = document.getElementById('clearFormBtn');
  const thankYou = document.getElementById('thank-you');

// ✅ a) Auto-generate Serial Number on page load
  if (serialInput && serialInput.value.trim() === '') {
    serialInput.value = generateSerialNumber();
    console.log("✅ Serial generated on page load:", serialInput.value); // ❗ where to place this ?
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
        console.log("🔁 Serial after clear:", serialInput.value); // ❗🟢 CHECK this CONSOLE LOG
      }
  });
}
// ends of No 1
// 🔴🔴🔴 


// ✅ 2  Debug: Show Serial Number on submit. Until line Nr. 133
if (form && serialInput) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

// 🔁 2.1 Get full phone number with country code 
    const phoneInput = document.querySelector("#phone");
// ✅ Fix It: In upload.js, get the existing instance using:   (BACKUP: const iti = window.intlTelInput(phoneInput, {)
    const iti = window.intlTelInputGlobals.getInstance(phoneInput);
    
// 🟡 const iti = window.intlTelInputGlobals.getInstance(phoneInput);
    const fullPhoneNumber = iti.getNumber(intlTelInputUtils.numberFormat.E164); // E.g., +123456789
    
// 2.2 Set the phone input value to the full international number
    phoneInput.value = fullPhoneNumber;

// 🟡 Explicitly set serial input value BEFORE calling attachSerialToRedirect in submit:
    if (serialInput.value === '') {
  serialInput.value = generateSerialNumber();
  console.log("Generated serial on submit:", serialInput.value); // ❗🟢 CHECK this CONSOLE LOG
}


// 🔗 2.4 Attach serial to redirect URL AFTER form submission
    attachSerialToRedirect();

// 🛠️ Your function attachSerialToRedirect() must be called before FormData is created:
    const redirectField = document.getElementById('redirectField');
    

// 🔧 2.3 Debug 🟡

      console.log("➡️ Redirect URL before FormData:", redirectField?.value); // ❗🟢 CHECK this CONSOLE LOG
      console.log("➡️ Full phone number E164:", fullPhoneNumber); // ❗🟢 CHECK this CONSOLE LOG
      console.log("📦 Serial Number being submitted:", serialInput.value); // ❗🟢 CHECK this CONSOLE LOG
      
      console.log("➡️ Redirect URL:", document.getElementById('redirectField').value); // ❗🟢 CHECK this CONSOLE LOG
      console.log("Serial on page load:", serialInput.value); // ❗ where to place this line ?
      console.log("Phone input value after assignment:", phoneInput.value); // ❗ where to place this line ?





// 🔧 2.5 Optional: show serial in console 

    const data = new FormData(form);
    const action = form.action;
    const submitButton = form.querySelector('button[type="submit"]');

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
    }

// Debug: log all form data before submission
    for (let pair of data.entries()) {
    console.log(`${pair[0]}:`, pair[1]); // ❗🟢 CHECK this CONSOLE LOG
    }

// ✅ Log the action URL (to double-check Formspree URL)
    console.log("Form action URL:", action); // ❗🟢 CHECK this CONSOLE LOG

// Update the submit button before the fetch begins
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'sending...';
    }


    fetch(action, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    })
    .then(response => {
      if (response.ok) {

        // ❗ MODIFICATION ❗window.location.href = form.querySelector('#redirectField').value;// ❗ MODIFICATION ❗
        
        const redirectURL = redirectField?.value
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
  }); // 🟡🟡🟡 DOMContent is closed here. From line Nr. 39
}

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
