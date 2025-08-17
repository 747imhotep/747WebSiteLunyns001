// CLEAR FORM 
  
  // Clear all form fields when Clear Form button is clicked
  document.getElementById('clearFormBtn').addEventListener('click', () => {
    document.getElementById('contactForm')?.reset();  // resets all input/textarea/select to their default values (empty in your case)
    document.getElementById('requiredForm')?.reset();
    const form = document.querySelector('form[action^="mailto"]');
    
    if (form) {
      form.reset();  // resets all input/textarea/select to their default values (empty in your case)
    }
  });

// CLEAR FORM END 



// <!-- FIXED SCRIPT -->

  document.addEventListener('DOMContentLoaded', function () {
    // --- MODAL 1: RFQ-modal ---
    const RFQ_modal = document.getElementById('RFQ-modal');
    const openRFQBtn = document.getElementById('openRFQModal');
    const closeRFQBtn = RFQ_modal?.querySelector('.close');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');

    function openRFQModal(prefillProduct = null) {
      if (RFQ_modal) {
        RFQ_modal.style.display = 'block';

        if (prefillProduct && subjectInput && messageInput) {
          subjectInput.value = `${prefillProduct.toUpperCase()} Quotation Request`;
          messageInput.value =
            `Dear team,\n\nI would like to request a quotation for ${prefillProduct.toUpperCase()}.\nKindly provide details regarding pricing, payment method, and MOQ.\n\nThank you.`;
        }
      }
    }

    if (openRFQBtn) {
      openRFQBtn.addEventListener('click', () => {
        openRFQModal();
        history.replaceState(null, '', '#RFQ');
      });
    }

    if (closeRFQBtn) {
      closeRFQBtn.addEventListener('click', () => {
        RFQ_modal.style.display = 'none';
      });
    }

    // Handle hash-based RFQ modal opening
    const hash = window.location.hash;
    if (hash === '#RFQ') {
      openRFQModal();
    } else if (hash.startsWith('#RFQ-')) {
      const product = hash.replace('#RFQ-', '');
      openRFQModal(product);
    }

    // Handle all <a href="#RFQ">
    document.querySelectorAll('a[href="#RFQ"]').forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        openRFQModal();
        history.replaceState(null, '', '#RFQ');
      });
    });

    // Handle all <a href="#RFQ-something">
    document.querySelectorAll('a[href^="#RFQ-"]').forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const product = this.getAttribute('href').replace('#RFQ-', '');
        openRFQModal(product);
        history.replaceState(null, '', `#RFQ-${product}`);
      });
    });


    // --- MODAL 2: requiredModal ---
    const requiredModal = document.getElementById('requiredModal');
    const openRequiredBtn = document.getElementById('openrequiredModal');
    const closeRequiredBtn = requiredModal?.querySelector('.close');

    if (openRequiredBtn) {
      openRequiredBtn.addEventListener('click', () => {
        requiredModal.style.display = 'block';
      });
    }

    if (closeRequiredBtn) {
      closeRequiredBtn.addEventListener('click', () => {
        requiredModal.style.display = 'none';
      });
    }

    // --- Universal Escape Key to Close Modals ---
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        if (RFQ_modal?.style.display === 'block') RFQ_modal.style.display = 'none';
        if (requiredModal?.style.display === 'block') requiredModal.style.display = 'none';
      }
    });

    // --- Universal Click Outside to Close Modals ---
    window.addEventListener('click', function (event) {
      if (event.target === RFQ_modal) RFQ_modal.style.display = 'none';
      if (event.target === requiredModal) requiredModal.style.display = 'none';
    });

    // --- Clear Form Button Logic (Form with mailto or FormSubmit) ---
    const clearBtn = document.getElementById('clearFormBtn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        const form = document.querySelector('form[action^="mailto"], form[action*="formsubmit"]');
        if (form) {
          form.reset();
        }
      });
    }
  });

