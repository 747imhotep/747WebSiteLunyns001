console.log("Script loaded:", document.readyState);


// <!---------------------------------------------------------------------------------------->


// <!-- CLEAR FORM -->

  // Clear all form fields when Clear Form button is clicked
  document.getElementById('clearFormBtn').addEventListener('click', () => {
    const form = document.querySelector('form[action^="mailto"]');
    if (form) {
      form.reset();  // resets all input/textarea/select to their default values (empty in your case)
    }
  });

// <!-- CLEAR FORM END -->


// <!-- OPEN RFQ -->

      // Function to open modal and optionally prefill form
      function openRFQModal(prefillProduct = null) {
        const modal = document.getElementById('RFQ-modal');
        if (modal) {
          modal.style.display = 'block';
        }

        // Prefill the subject if product info is provided
        if (prefillProduct) {
          const subjectInput = document.getElementById('subject');
          if (subjectInput) {
            subjectInput.value = `${prefillProduct.toUpperCase()}  Quotation Request`;
          }

          // Optional: Prefill the message textarea
          const messageInput = document.getElementById('message');
          if (messageInput) {
            messageInput.value = `Dear team,\n\nI would like to request a quotation for ${prefillProduct.toUpperCase()} \nKindly provide details regarding pricing, payment method, and minimum order quantity (MOQ) at your earliest convenience.\n\nThank you.`;
          }
        }
      }


      // Handle opening the modal on page load based on URL hash
      window.addEventListener('DOMContentLoaded', () => {
        const hash = window.location.hash;

        if (hash === '#RFQ') {
          openRFQModal(); // basic modal open
        } else if (hash.startsWith('#RFQ-')) {
          const product = hash.replace('#RFQ-', ''); // e.g., "10ppm"
          openRFQModal(product); // open and prefill
        }
      });

      // Close the modal when the close button is clicked
      document.querySelector('#RFQ-modal .close')?.addEventListener('click', function () {
        const modal = document.getElementById('RFQ-modal');
        if (modal) {
          modal.style.display = 'none';
        }
      });
      // Also close the modal when Escape key is pressed
      document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
          const modal = document.getElementById('RFQ-modal');
          if (modal && modal.style.display === 'block') {
        modal.style.display = 'none';
          }
        }
      });
      // Close the modal if user clicks outside of it
      window.onclick = function (event) {
        const modal = document.getElementById('RFQ-modal');
        if (event.target === modal) {
          modal.style.display = 'none';
        }
      };

       // Handle links like <a href="#RFQ">
document.querySelectorAll('a[href="#RFQ"]').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    openRFQModal();
    history.replaceState(null, '', '#RFQ');
  });
});

// Handle links like <a href="#RFQ-10ppm">
document.querySelectorAll('a[href^="#RFQ-"]').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const product = this.getAttribute('href').replace('#RFQ-', '');
    openRFQModal(product);
    history.replaceState(null, '', `#RFQ-${product}`);
  });
});





document.getElementById("contactForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const form = e.target;

  // Get values from form
  const email = form.email.value;
  const name = form.name.value;
  const userType = form.userType.value;
  const productType = form.productType.value;
  const subject = form.subject.value;
//  const message = form.message.value;

  // Build the data object
  const data = {
    email: email,
    name: name,
    fields: {
      userType: userType,
      productType: productType,
      subject: subject,
      message: message
    },
    tags: [userType], // e.g., "Buyer", "Seller", etc.
    status: "active" // required to trigger automations
  };

  try {
    const response = await fetch("https://lunyns.workers.dev", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMWY3YmFiNThkNjA2YTBjZDIzNWYyNDU4ZGJjY2Y1MWRjYTBhMDc2NTQ3NDZkZDJiYzIxNTBlYzc4MjVmMTgzYTI5NzU5ODY1NzllYTUwZmMiLCJpYXQiOjE3NTU5NTE5NzIuNzQ4ODk0LCJuYmYiOjE3NTU5NTE5NzIuNzQ4ODk2LCJleHAiOjQ5MDk1NTE5NzIuNzQ2OTc3LCJzdWIiOiIxMDA0NzM4Iiwic2NvcGVzIjpbXX0.HJqBlaqRemjd7qDjAOepLvHSVcm5YsZMuJjOw4f0Jp_AkHuYaG1l9PmFe6EE8_SfLXdWE41u_vKU1_yoMo_Amal0yUHadaIZSNpDQIjrGArwZHLS5YnMKVZsid__QK_DP-MkTUW6skSWyRofilxsdpOb7Lk89DegIUgGCi16WLdli43Fy7LMN5XIKPp6RmE6iAw4BhGufxDsjqFZRxYlG93pIaEixxsqnnA3kV43M8QxDex9n61S_Llp5tP6wbzOmvdLwf1K1zu7cmLGkm21AvpYrJCZjFLSx9-HEjtuT_hw3KF0FUSp33M1Tfgmtld4XdZhkq5XyVhFtSomH2FuQgKphEbS-KEUVYvgTccbL8sPsbRCxRnh5Md18esLFP0nxLzfHJ1bdK8DYY4UTL_cOMNvdxMNwPLV_FnjSuYuadQ_8jKCmHZ3SGVfB8sSfLOI335-ou3_5nVO1Pa0Uehg7aSeGZMHXUYVlx7CcG8GStKnkBb9KzYYxNsK70sOo7PYv2cdyWjmjC0mKWevbdXN08_N8XtCjgS3sTdqxEfc2nGZspsLLpoSBNLnZHQRJJl6Fk03ZOGDClVbdTpsnKRBOBxNG0WO3PQ_bZeOf6TqP92IhrbuPnYpkikLHXxWDsNOq4POco8xOCOuJcmXUzrOYaDJIrO83hdkhxst9CW1lMY"
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      alert("Thank you! Your request has been submitted.");
      form.reset(); // optional
      window.location.href = "https://lunyns.com/Thanks/Thanks.html"; // redirect to thank you page
    } else {
      const error = await response.json();
      console.error("Sender API Error:", error);
      alert("Error submitting form. Please try again.");
    }
  } catch (err) {
    console.error("Request failed:", err);
    alert("Network error. Please check your connection.");
  }
});



// <!---------------------------------------------------------------------------------------->
//     Tawk.to Script START
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/68a8808ed6067019238eff16/1j393cbpd';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();
//     Tawk.to Script End
