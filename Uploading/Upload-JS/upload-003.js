//   🟢 UPLOAD JAVA SCRIPT


// UPLOAD.JS - ORIGINAL restored with only the Clear button fixed
// Changes: only the clear button handler was enhanced to also reset intl-tel-input,
// file inputs, hidden temporary fields and restore UI state. Submit logic left intact.
// 🔴🔴🔴 This JAVA Code works fine, except for the "Clear Form" Button. I need this button 
// works fully, so we can end this upload.js editing cycle. 🔴🔴🔴
// 🟢 1. Beginning
let form;
document.addEventListener('DOMContentLoaded', () => {
  form = document.getElementById('contactFormsPree');
  const clearBtn = document.getElementById('clearFormBtn');
  const thankYou = document.getElementById('thank-you');


  

// 🔴🔴🔴 new CODE PASTE HERE ENDS
// ---------- REPLACE the existing Clear block with this exact code ----------
if (clearBtn && form) {
  // Defensive replace to remove duplicate listeners if any
  try {
    const cleaned = clearBtn.cloneNode(true);
    clearBtn.parentNode.replaceChild(cleaned, clearBtn);
  } catch (err) {
    // ignore if replace fails
  }

  // Re-query the button in case of replacement
  const clearBtnCurrent = document.getElementById('clearFormBtn');

  clearBtnCurrent.addEventListener('click', (e) => {
    // Defensive preventDefault (button is type="button" so not strictly necessary)
    try { e.preventDefault(); } catch (err) { /* ignore */ }

    // 1) Native reset (preserves original behaviour)
    form.reset();

    // Restore original form display and hide thank-you
    try {
      if (form.style) form.style.display = 'block';
      if (thankYou) thankYou.style.display = 'none';
    } catch (err) { /* ignore */ }

    // 2) Reset intl-tel-input widget if present
    try {
      const phoneInput = form.querySelector('#phone');
      let itiInstance = window.iti;
      if (!itiInstance && window.intlTelInputGlobals?.getInstance && phoneInput) {
        itiInstance = window.intlTelInputGlobals.getInstance(phoneInput);
      }
      if (itiInstance && typeof itiInstance.setNumber === 'function') {
        // Clears displayed number and internal widget state
        itiInstance.setNumber('');
      } else if (phoneInput) {
        // Fallback: clear the raw input value
        phoneInput.value = '';
      }
    } catch (err) {
      // keep silent in production; uncomment for debugging:
      // console.warn('Clear: failed to reset intl-tel-input', err);
    }

    // 3) Clear file inputs reliably (clone+replace)
    try {
      const fileInputs = form.querySelectorAll('input[type="file"]');
      fileInputs.forEach(f => {
        const newInput = f.cloneNode(true); // preserve name/id/class
        f.replaceWith(newInput);
      });
    } catch (err) {
      // console.warn('Clear: file input reset failed', err);
    }

    // 4) Clear temporary hidden fields (if any)
    try {
      const tempHidden = form.querySelectorAll('input.temp-reset, input[data-temp-reset="true"]');
      tempHidden.forEach(i => i.value = '');
    } catch (err) { /* ignore */ }

    // 5) Restore submit button to original state
    try {
      const submitButton = form.querySelector('button[type="submit"]');
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
      }
    } catch (err) { /* ignore */ }

    // 6) Focus first visible input
    try {
      const firstField = form.querySelector('input:not([type="hidden"]):not([disabled]), textarea, select');
      if (firstField) firstField.focus();
    } catch (err) { /* ignore */ }

    return false;
  });
}
// ---------- END replacement ----------
 //🟡 🟡
        
 //🟡 🟡
  // b) Submit handler (original logic preserved)
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // SUBMIT HANDLER: Get full phone number with country code 
      const phoneInput = document.querySelector("#phone");
      // try to use the global instance (set by your intlTelInput initializer)
      const iti = window.iti;
      if (iti) {
        // Get full phone number in E.164 format (e.g., +18449498192)
        const fullPhoneNumber = iti.getNumber(intlTelInputUtils.numberFormat.E164);

        // Set the phone input value to the full international number
        phoneInput.value = fullPhoneNumber;

        // Console debug (kept from original)
        console.log("➡️ Full phone number E164:", fullPhoneNumber);
      }
      console.log("Phone input value after assignment:", phoneInput.value);

      const data = new FormData(form);
      data.delete('_redirect'); // This line removes the hidden redirect field
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

      // Log the action URL (to double-check Formspree URL)
      console.log("Form action URL:", action);

      fetch(action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      })
      .then(response => {
        if (response.ok) {
          form.style.display = 'none'
          if (thankYou) thankYou.style.display = 'block'
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
    }); // end submit listener
  }

  // Note: leave intl-tel-input initialization in its dedicated script block.
}); // end DOMContentLoaded

