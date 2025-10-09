//     UPLOAD US - JS
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
});

