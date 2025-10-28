// 🟢 UPLOAD JAVA SCRIPT

// ✅ 1. Beginning
let form;
document.addEventListener('DOMContentLoaded', () => {
  form = document.getElementById('contactFormsPree');
  const clearBtn = document.getElementById('clearFormBtn');
  const thankYou = document.getElementById('thank-you');

// ✅ a) Clear Form logic
  if (clearBtn && form) {
    clearBtn.addEventListener('click', () => {
      form.reset();
      form.style.display = 'block';
      if (thankYou) {
        thankYou.style.display = 'none';
      }
    });
   }
  
// ✅ b) ✅ Debug: Until line Nr. 133 ❗🟢 CHECK this CONSOLE LOG
      if (form) {
        form.addEventListener('submit', function (e) {
          e.preventDefault();

 // ends of No 1 🔴🔴🔴 


// 🔁  ----- REPLACE FROM HERE -----
/* Build FormData properly (keep files) */
const formData = new FormData(form);

/* If you are using intl-tel-input, set the #phone value to E.164 first */
try {
  const phoneInput = form.querySelector('#phone');
  const iti = window.iti || (window.intlTelInputGlobals && phoneInput && window.intlTelInputGlobals.getInstance(phoneInput));
  if (iti && typeof iti.getNumber === 'function' && typeof intlTelInputUtils !== 'undefined') {
    const fullPhoneNumber = iti.getNumber(intlTelInputUtils.numberFormat.E164);
    if (phoneInput) formData.set('phone', fullPhoneNumber || '');
    console.log('➡️ Full phone number E164:', fullPhoneNumber);
  }
} catch (err) {
  console.warn('Phone formatting error (non-fatal):', err);
}

/* Remove redirect hidden field if you don't want it */
formData.delete('_redirect');

/* Debug: log formData entries (for dev only) */
for (const pair of formData.entries()) {
  console.log('FormData:', pair[0], pair[1]);
}

/* Submit using fetch with FormData body — DO NOT set Content-Type header */
fetch(action, {
  method: 'POST',
  body: formData,
  headers: { 'Accept': 'application/json' } // allow JSON response
})
.then(async (response) => {
  const contentType = response.headers.get('content-type') || '';
  let body = null;
  try {
    if (contentType.includes('application/json')) body = await response.json();
    else body = await response.text();
  } catch (err) {
    body = `Failed to parse response body: ${err}`;
  }

  console.log('Response status:', response.status, 'body:', body);

  if (response.ok) {
    form.style.display = 'none';
    if (thankYou) thankYou.style.display = 'block';
  } else {
    // show server-provided message if available
    const msg = (body && body.error) ? body.error : (body && body.message) ? body.message : 'There was a problem submitting the form.';
    alert('Submit error: ' + msg + ' (status ' + response.status + ')');
  }
})
.catch(error => {
  console.error('Form submission network/error:', error);
  alert('Network error occurred. Please try again.');
})
.finally(() => {
  if (submitButton) {
    submitButton.disabled = false;
    submitButton.textContent = 'Send Message';
  }
});
// ----- REPLACE TO HERE -----
}); // 🟡🟡🟡 DOMContent is closed here. From line Nr. 39
  }

// Activate before going live.  
//  const DEBUG = false;
//      if (DEBUG) {
//        console.log("➡️ Full phone number E164:", fullPhoneNumber);
        // etc.
//      } // END of before going live.  

}); // ✅ END of DOMContentLoaded

// in order to 
