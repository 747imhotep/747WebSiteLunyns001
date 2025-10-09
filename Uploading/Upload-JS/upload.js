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
  // ✅ Generate the Serial Number automatically
  document.addEventListener("DOMContentLoaded", () => {
    const serialInput = document.getElementById("serial-number");

    if (serialInput) {
      const serialNumber = generateSerialNumber();
      serialInput.value = serialNumber;
    }

    function generateSerialNumber() {
      const date = new Date();
      const dateStr = date.toISOString().slice(0,10).replace(/-/g, "");
      const random = Math.floor(1000 + Math.random() * 9000);
      return `SN-${dateStr}-${random}`;
    }
  });




  // 📦 Optional: Add Submit Debugging
  document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactFormsPree');
  const serialInput = document.getElementById("serial-number");

  if (form && serialInput) {
    serialInput.value = generateSerialNumber();

    form.addEventListener('submit', (e) => {
      console.log("Serial Number being submitted!", serialInput.value);
    });
  }
  function generateSerialNumber(){
    const now = new Date();
    const date = now.toISOString().slice(0, 10).replace(/-/g, "");
    const rand = Math.floor(1000 + Math.random() * 9000);
    return `SN-${date}-${rand}`;
  }
    });

});

