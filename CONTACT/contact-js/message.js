//     MASSAGE US - JS
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
// 📌 Optional Next Steps (When You're Ready)

//1. Add a “Thank You” message after submission
//   So users know the form worked (I can help you add this via JS or Formspree redirect).

//2. Upgrade to Personal Plan when:
//   You want file uploads
//   Need more than 50 submissions/month
//   Want advanced features (spam protection, confirmation emails, etc.)

//3. Connect a custom domain with GitHub Pages + Cloudflare (optional but very polished setup)