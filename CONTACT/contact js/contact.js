var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/68a8808ed6067019238eff16/1j393cbpd';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();

//     <script src="../COCONUTS/2COCONUTS_js/2coconuts.js"></script>
// <!---------------------------------------------------------------------------------------->



  // Clear all form fields when Clear Form button is clicked
  document.getElementById('clearFormBtn').addEventListener('click', () => {
    //const form = document.querySelector('form[action^="mailto"]');
    // Select the form by tag, ID, or any other appropriate selector
    const form = document.getElementById('contactForm');
 // if it's the only form

    if (form) {
      form.reset();  // resets all input/textarea/select to their default values (empty in your case)
    }
  });


  // Prefill the RFQ form based on URL hash like #RFQ-10ppm
    window.addEventListener('DOMContentLoaded', () => {
      const hash = window.location.hash;

      if (hash.startsWith('#RFQ-')) {
        const product = decodeURIComponent(hash.replace('#RFQ-', ''));

        // Set subject
        const subjectInput = document.getElementById('subject');
        if (subjectInput) {
          subjectInput.value = `${product.toUpperCase()} Quotation Request`;
        }

        // Set message
        const messageInput = document.getElementById('message');
        if (messageInput) {
          messageInput.value = `Dear team,\n\nI would like to request a quotation for ${product.toUpperCase()}.\nKindly provide details regarding:\n- Pricing\n- Payment terms\n- Minimum order quantity (MOQ)\n\nThank you.`;
        }

        // Optional: Scroll smoothly to the RFQ form
        const rfqSection = document.getElementById('RFQ');
        if (rfqSection) {
          rfqSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
