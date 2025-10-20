// 🟢 UPLOAD VER. 005.3 JAVA SCRIPT

// upload-003.js — production-ready upload + clear handler for #contactFormsPree
// - Uses FormData so file uploads are preserved
// - Formats phone to E.164 using intl-tel-input if available
// - Robust Clear button resets phone widget and file inputs
// - After successful submit: show thank-you, wait 5s, reset form and redirect to home
const DEBUG = false;
const AUTO_RESET_MS = 5000; // milliseconds to wait before auto-reset + redirect

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactFormsPree');
  if (!form) {
    if (DEBUG) console.warn('upload-005.3.js: form #contactFormsPree not found.');
    return;
  }

  const clearBtn = document.getElementById('clearFormBtn');
  const thankYou = document.getElementById('thank-you');

  // ---------- Clear button ----------
  if (clearBtn) {
    try {
      const clone = clearBtn.cloneNode(true);
      clearBtn.parentNode.replaceChild(clone, clearBtn);
    } catch (err) { /* ignore */ }

    const btn = document.getElementById('clearFormBtn');
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (DEBUG) console.log('[Clear] clicked');

      // native reset
      form.reset();

      // restore UI states
      try { form.style.display = 'block'; } catch (e) {}
      if (thankYou) try { thankYou.style.display = 'none'; } catch (e) {}

      // reset intl-tel-input instance if present
      try {
        const phoneInput = form.querySelector('#phone');
        let itiInstance = window.iti;
        if (!itiInstance && window.intlTelInputGlobals && phoneInput && typeof window.intlTelInputGlobals.getInstance === 'function') {
          itiInstance = window.intlTelInputGlobals.getInstance(phoneInput);
        }
        if (itiInstance && typeof itiInstance.setNumber === 'function') {
          itiInstance.setNumber('');
          if (DEBUG) console.log('[Clear] intl-tel-input cleared');
        } else if (phoneInput) {
          phoneInput.value = '';
        }
      } catch (err) {
        if (DEBUG) console.warn('[Clear] phone reset error', err);
      }

      // clear file inputs robustly (clone+replace)
      try {
        const fileInputs = form.querySelectorAll('input[type="file"]');
        fileInputs.forEach(f => {
          const newInput = f.cloneNode(true);
          f.replaceWith(newInput);
        });
        if (DEBUG) console.log('[Clear] file inputs cleared');
      } catch (err) {
        if (DEBUG) console.warn('[Clear] file clear error', err);
      }

      // clear temporary hidden fields (if any)
      try {
        const tempHidden = form.querySelectorAll('input.temp-reset, input[data-temp-reset="true"]');
        tempHidden.forEach(i => i.value = '');
      } catch (err) { /* ignore */ }

      // restore submit button
      try {
        const submitButton = form.querySelector('button[type="submit"]');
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = 'Send Message';
        }
      } catch (err) { /* ignore */ }

      // focus first visible input
      try {
        const firstField = form.querySelector('input:not([type="hidden"]):not([disabled]), textarea, select');
        if (firstField) firstField.focus();
      } catch (err) { /* ignore */ }

      if (DEBUG) console.log('[Clear] done');
    });
  } else {
    if (DEBUG) console.warn('upload-003.js: #clearFormBtn not found.');
  }

  // ---------- Submit handler ----------
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (DEBUG) console.log('[Submit] start');

    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
    }

    // Build FormData and set phone to E.164 if possible
    const formData = new FormData(form);
    try {
      const phoneInput = form.querySelector('#phone');
      const iti = window.iti || (window.intlTelInputGlobals && phoneInput && window.intlTelInputGlobals.getInstance && window.intlTelInputGlobals.getInstance(phoneInput));
      if (iti && typeof iti.getNumber === 'function' && typeof intlTelInputUtils !== 'undefined') {
        const full = iti.getNumber(intlTelInputUtils.numberFormat.E164);
        if (phoneInput) formData.set('phone', full || '');
        if (DEBUG) console.log('➡️ Full phone E164:', full);
      } else {
        if (DEBUG) console.warn('[Submit] intl-tel-input or utils not available; sending raw phone value');
      }
    } catch (err) {
      if (DEBUG) console.warn('[Submit] phone formatting error', err);
    }

    try { formData.delete('_redirect'); } catch (e) {}

    // basic client-side validity check
    if (!form.checkValidity()) {
      if (typeof form.reportValidity === 'function') form.reportValidity();
      if (submitButton) { submitButton.disabled = false; submitButton.textContent = 'Send Message'; }
      return;
    }

    const action = form.action;
    try {
      const resp = await fetch(action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      let body = null;
      const contentType = resp.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        body = await resp.json().catch(() => null);
      } else {
        body = await resp.text().catch(() => null);
      }

      if (DEBUG) console.log('[Submit] response status:', resp.status, 'body:', body);

      if (resp.ok) {
        // success: show thank-you immediately
        try { form.style.display = 'none'; } catch (e) {}
        if (thankYou) try { thankYou.style.display = 'block'; } catch (e) {}

        // After AUTO_RESET_MS milliseconds: reset form (clear widget + files) and redirect to home
        setTimeout(() => {
          try {
            // reset form fields
            form.reset();

            // clear intl-tel-input (if present)
            try {
              const phoneInput = form.querySelector('#phone');
              let itiInstance = window.iti;
              if (!itiInstance && window.intlTelInputGlobals && phoneInput && typeof window.intlTelInputGlobals.getInstance === 'function') {
                itiInstance = window.intlTelInputGlobals.getInstance(phoneInput);
              }
              if (itiInstance && typeof itiInstance.setNumber === 'function') {
                itiInstance.setNumber('');
              } else if (phoneInput) {
                phoneInput.value = '';
              }
            } catch (err) {
              if (DEBUG) console.warn('[AutoReset] phone clear error', err);
            }

            // clear file inputs
            try {
              const fileInputs = form.querySelectorAll('input[type="file"]');
              fileInputs.forEach(f => {
                const newInput = f.cloneNode(true);
                f.replaceWith(newInput);
              });
            } catch (err) {
              if (DEBUG) console.warn('[AutoReset] file clear error', err);
            }

            // restore submit button
            try {
              if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
              }
            } catch (err) { /* ignore */ }
          } catch (err) {
            if (DEBUG) console.warn('[AutoReset] reset sequence error', err);
          }

          // Redirect to home (change '/' to any other path if you prefer)
          window.location.href = '/';
        }, AUTO_RESET_MS);
      } else {
        // server returned error (403 etc). Show server message if available
        const serverMsg = (body && (body.error || body.message || body.detail)) ? (body.error || body.message || body.detail) : null;
        const alertMsg = serverMsg ? `Server error: ${serverMsg} (status ${resp.status})` : `Submit failed (status ${resp.status})`;
        alert(alertMsg);
        if (DEBUG) console.warn('[Submit] server rejected:', resp.status, body);
      }
    } catch (networkErr) {
      console.error('[Submit] network/error:', networkErr);
      alert('Network error occurred. Please try again.');
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
      }
      if (DEBUG) console.log('[Submit] finished');
    }
  });
});