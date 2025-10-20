//   🟢 UPLOAD 002 JAVA SCRIPT

//   ✅ 1. Beginning
let form;
document.addEventListener('DOMContentLoaded', () => {
  form = document.getElementById('contactFormsPree');
  const clearBtn = document.getElementById('clearFormBtn');
  const thankYou = document.getElementById('thank-you');

//   ✅ a) Clear Form logic
  if (clearBtn && form) {
    clearBtn.addEventListener('click', () => {
      form.reset();
      form.style.display = 'block';
      if (thankYou) {
        thankYou.style.display = 'none';
      }
    });
   }
  
//   ✅ b) ✅ Debug: Until line Nr. 133 ❗🟢 CHECK this CONSOLE LOG
      if (form) {
        form.addEventListener('submit', function (e) {
          e.preventDefault();



//   🔁 c) SUBMIT HANDLER: Get full phone number with country code 
    const phoneInput = document.querySelector("#phone");
    const iti = window.iti;
    if(iti) {

//   🟢 Get full phone number in E.164 format (e.g., +18449498192)
    const fullPhoneNumber = iti.getNumber(intlTelInputUtils.numberFormat.E164);
    
//   2.2 Set the phone input value to the full international number
    phoneInput.value = fullPhoneNumber;

// few icons 🟡 ❗🟢  🔗 


// 🔧 2.3 Console Debugging 🟡
      console.log("➡️ Full phone number E164:", fullPhoneNumber); // ❗🟢 CHECK this CONSOLE LOG
    }



    const data = {};
    const FormData = new FormData(form);
    FormDatadata.delete('_redirect'); // 👈 This line removes the hidden redirect field

    FormData.forEach((value, key) => {
      data[key] = value;
    });
    
    const action = form.action;
    const submitButton = form.querySelector('button[type="submit"]');

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
    }

//   Debug: log all form data before submission
    for (let pair of data.entries()) {
    console.log(`${pair[0]}:`, pair[1]); // ❗🟢 CHECK this CONSOLE LOG
    }

  // ✅ Log the action URL (to double-check Formspree URL)
  console.log("Form action URL:", action); // ❗🟢 CHECK this CONSOLE LOG
  // Only submit when the form is valid
  if (form.checkValidity()) {

    fetch(action, {
      method: 'POST',
      body: data,
      headers: {
        'content-type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    })

    .then(response => {
      if (response.ok) {
        form.style.display = 'none'
        if (thankYou) {
          thankYou.style.display = 'block'
        }
      } else {
        alert('Oh noo! There was a problem submitting the form.');
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

  } else {
    // show validation errors to the user and re-enable the submit button
    if (typeof form.reportValidity === 'function') {
      form.reportValidity();
    } else {
      alert('Please fill out the form correctly before submitting.');
    }
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = 'Send Message';
    }
  }

}); // 🟡🟡🟡 THIS closes submit handler — ADD THIS LINE

} // 🟢 THIS stays — it closes if(form) {



// Activate before going live.  And we're live now
  const DEBUG = false;
  if (DEBUG) {
    console.log("Debug mode enabled");
  } // END of before going live.

}); // ✅ END of DOMContentLoaded




// ✅ 
// ✅ 
// ✅ 
