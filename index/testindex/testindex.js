var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/68a8808ed6067019238eff16/1j393cbpd';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();

//     <script src="/index/Index js/index.js"> </script>

// <!---------------------------------------------------------------------------------------->


// <!-- CLEAR FORM -->

  document.addEventListener("DOMContentLoaded", function () {
  // 👇 All your code goes here, like:
  
  // Clear form button
  document.getElementById('clearFormBtn').addEventListener('click', () => {
    const form = document.getElementById('contactForm');
    if (form) {
      form.reset();
    }
  });

  // Submit handler
  document.getElementById("contactForm").addEventListener("submit", async function(e) {
    e.preventDefault();
    // your fetch logic here
  });

  // And all other modal logic, etc.
});


