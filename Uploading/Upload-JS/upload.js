// ✅ UPLOAD US - JS
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactFormsPree');
  const serialInput = document.getElementById("serial-number");
  const clearBtn = document.getElementById('clearFormBtn');
  const thankYou = document.getElementById('thank-you');

  // ✅ 1. Auto-generate Serial Number on page load
  if (serialInput) {
    serialInput.value = generateSerialNumber();
  }

  // ✅ 2. Clear Form logic
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

  // ✅ 3. Debug: Show Serial Number on submit
  if (form && serialInput) {
    form.addEventListener('submit', () => {
      console.log("Serial Number being submitted:", serialInput.value);
    });
  }

  // ✅ Generate numeric Serial Number: 0001 to 2000
  function generateSerialNumber() {
    const number = Math.floor(Math.random() * 2000) + 1;  // 1 to 2000
    return String(number).padStart(4, '0');               // pad with zero to 4 digits
  }

  // 
  function attachSerialToRedirect() {
    const serial = document.getElementById('serial-number')?.value || '';
    const redirectField = document.getElementById('redirectField');

    if(redirectField && serial) {
      // Add serial as query param
      redirectField.value = 'https://lunyns.com/Thanks/Thanks.html?serial=${serial}' ;
    }
  }

});
