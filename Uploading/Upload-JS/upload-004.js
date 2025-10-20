// UPLOAD.JS - ORIGINAL restored with only the Clear button fixed
// Changes: only the clear button handler was enhanced to also reset intl-tel-input,
// file inputs, hidden temporary fields and restore UI state. Submit logic left intact.
// This file is intentionally minimal and non-invasive: only Clear logic is improved.

// 🟢 1. Beginning
console.log("✅ Clear button clicked");


let form;
document.addEventListener('DOMContentLoaded', () => {
  form = document.getElementById('contactFormsPree');
  const clearBtn = document.getElementById('clearFormBtn');
  const thankYou = document.getElementById('thank-you');

  // a) Clear Form logic (ENHANCED - minimal, non-invasive changes)
  if (clearBtn && form) {
    // Remove any previously-attached listeners to avoid duplicates
    try {
      const existing = clearBtn.cloneNode(true);
      clearBtn.parentNode.replaceChild(existing, clearBtn);
    } catch (err) {
      // ignore if replace fails
    }

    // Re-query the button after potential replace
    const clearBtnCurrent = document.getElementById('clearFormBtn');

    clearBtnCurrent.addEventListener('click', (e) => {
      // For type="button" this isn't required, but harmless and defensive:
      try { e.preventDefault(); } catch (err) { /* ignore */ }

      // 0) Quick debug - uncomment if you need console proof this ran
      // console.log('[Clear] clicked');

      // Native reset first (keeps original behaviour)
      form.reset();

      // Restore original form display and hide thank-you
      form.style.display = 'block';
      if (thankYou) thankYou.style.display = 'none';

      // 1) Reset intl-tel-input field (if present)
      try {
        const phoneInput = form.querySelector('#phone');
        let itiInstance = window.iti;
        if (!itiInstance && window.intlTelInputGlobals?.getInstance && phoneInput) {
          itiInstance = window.intlTelInputGlobals.getInstance(phoneInput);
        }
        if (itiInstance && typeof itiInstance.setNumber === 'function') {
          // clears displayed number and internal state
          itiInstance.setNumber('');
        } else if (phoneInput) {
          // fallback: clear the raw input value
          phoneInput.value = '';
        }
      } catch (err) {
        // Keep silent in production, but you can uncomment the next line for debugging:
        // console.warn('Clear: failed to reset intl-tel-input', err);
      }

      // 2) Reset file inputs (replace with clone to bypass browser restrictions)
      try {
        const fileInputs = form.querySelectorAll('input[type="file"]');
        fileInputs.forEach(f => {
          // cloneNode(true) preserves attributes such as name/id/class
          const newInput = f.cloneNode(true);
          // If there were event listeners on file inputs, they will be lost.
          // That is acceptable for form reset - if you need to rebind listeners, do that in init code.
          f.replaceWith(newInput);
        });
      } catch (err) {
        // console.warn('Clear: file input reset failed', err);
      }

      // 3) Reset any temporary hidden fields (pattern used in previous iterations)
      try {
        const tempHidden = form.querySelectorAll('input.temp-reset, input[data-temp-reset="true"]');
        tempHidden.forEach(i => i.value = '');
      } catch (err) {
        // ignore
      }

      // 4) Reset submit button to original state
      try {
        const submitButton = form.querySelector('button[type="submit"]');
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = 'Send Message';
        }
      } catch (err) {
        // ignore
      }

      // 5) Focus the first visible input for convenience (UX)
      try {
        const firstField = form.querySelector('input:not([type="hidden"]):not([disabled]), textarea, select');
        if (firstField) firstField.focus();
      } catch (err) {
        // ignore
      }

      // finished
      return false;
    });
  }

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
        if (phoneInput) phoneInput.value = fullPhoneNumber;

        // Console debug (kept from original)
        console.log("➡️ Full phone number E164:", fullPhoneNumber);
      } else {
        // If iti not available, we still proceed with the raw input value
        console.warn('[Submit] window.iti not found; sending raw phone input value');
      }
      if (phoneInput) console.log("Phone input value after assignment:", phoneInput.value);

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