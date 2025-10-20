//   ✅ line 21
form.addEventListener('submit', function (e) {
  e.preventDefault();
//   ✅ line 30
  const phoneInput = document.querySelector("#phone");
  const iti = window.iti;
  if (iti) {
    const fullPhoneNumber = iti.getNumber(intlTelInputUtils.numberFormat.E164);
    phoneInput.value = fullPhoneNumber;
    console.log("➡️ Full phone number E164:", fullPhoneNumber);
  }

  const data = new FormData(form);
  data.delete('_redirect');
  const action = form.action;
  const submitButton = form.querySelector('button[type="submit"]');

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
  }

  for (let pair of data.entries()) {
    console.log(`${pair[0]}:`, pair[1]);
  }

  console.log("Form action URL:", action);
//   ✅ line 66
  fetch(action, {
    method: 'POST',
    body: data,
    headers: { 'Accept': 'application/json' }
  })
  .then(response => {
    if (response.ok) {
      form.style.display = 'none';
      thankYou.style.display = 'block';
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

}); // ✅ THIS closes submit handler — ADD THIS LINE

// 🟢 THIS stays — it closes DOMContentLoaded
}); 

