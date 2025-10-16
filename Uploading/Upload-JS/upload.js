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


// 🔁 c) SUBMIT HANDLER: Get full phone number with country code 
    const phoneInput = document.querySelector("#phone");
    const iti = window.intlTelInputGlobals.getInstance(phoneInput);
    if(iti) {


// 🟢 Get full phone number in E.164 format (e.g., +18449498192)
    const fullPhoneNumber = iti.getNumber(intlTelInputUtils.numberFormat.E164);
    
    
// 2.2 Set the phone input value to the full international number
    phoneInput.value = fullPhoneNumber;

// 🟡  ❗🟢 CHECK this CONSOLE LOG 🔗 
    

// 🔧 2.3 Console Debugging 🟡
      console.log("➡️ Full phone number E164:", fullPhoneNumber); // ❗🟢 CHECK this CONSOLE LOG
    }
      console.log("Phone input value after assignment:", phoneInput.value); // ❗ Need to delete ?



    const data = new FormData(form);
    data.delete('_redirect'); // 👈 This line removes the hidden redirect field
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

    fetch(action, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    })

    .then(response => {
      if (response.ok) {
      form.style.display = 'none'
      thankYou.style.display = 'block'
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

// Activate before going live.  
//  const DEBUG = false;
//      if (DEBUG) {
//        console.log("➡️ Full phone number E164:", fullPhoneNumber);
        // etc.
//      } // END of before going live.  

}); // ✅ END of DOMContentLoaded



// remove that <script> block (where intlTelInput() is initialized)
// ✅ Submit the form

// ✅ Check Network > Request > Form Data

// ✅ Look at what value is sent for the phone field