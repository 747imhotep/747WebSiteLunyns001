// ✅ ABOUT/about.js / 📦 LUNYNS FORM HANDLER (2025-ready)
// ✅ THIS NEW CODE SUCCEED TO OPEN THE MODAL
// ✅ DATA can be seen in Formspree
// ❌ DATA cannot be seen in Sender.net (via Cloudflare)
// ⚠️ we still need to work on this

//function initLunynsForm(formId) {
  document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("lunyns-form");
  const modal = document.getElementById("RFQ-modal");
  const clearBtn = document.getElementById("clearFormBtn");

    // ----------------------------------------------------------------
    // 🧹 CLEAR FORM
    // ----------------------------------------------------------------
      clearBtn?.addEventListener("click", () => form?.reset());
      

    // ----------------------------------------------------------------
    // 💡 OPEN & CLOSE RFQ MODAL
    // ----------------------------------------------------------------
    function openRFQModal() {
      if (modal) modal.style.display = "block";
    }

    function closeRFQModal() {
      if (modal) modal.style.display = "none";
    }

    // ----------------------------------------------------------------
    // 🔗 OPEN MODAL BASED ON HASH
    // ----------------------------------------------------------------
    const hash = window.location.hash;
    if (hash === "#RFQ") {
      openRFQModal();
    } else if (hash.startsWith("#RFQ-")) {
      openRFQModal(hash.replace("#RFQ-", ""));
    }

    // ----------------------------------------------------------------
    // 🔗 HANDLE MODAL TRIGGER LINKS
    // ----------------------------------------------------------------
    document.querySelectorAll('a[href="#RFQ"]').forEach(link => {
      link.addEventListener("click", e => {
        e.preventDefault();
        openRFQModal();
        history.replaceState(null, "", "#RFQ");
      });
    });

    document.querySelectorAll('a[href^="#RFQ-"]').forEach(link => {
      link.addEventListener("click", e => {
        e.preventDefault();
        const product = link.getAttribute("href").replace("#RFQ-", "");
        openRFQModal(product);
        history.replaceState(null, "", `#RFQ-${product}`);
        });
    });

    // ----------------------------------------------------------------
    // ❌ CLOSE MODAL ACTIONS
    // ----------------------------------------------------------------
    modal?.querySelector(".close")?.addEventListener("click", closeRFQModal);

    document.addEventListener("keydown", e => e.key === "Escape" && closeRFQModal());

    window.addEventListener("click", e => e.target === modal && closeRFQModal());

    // ----------------------------------------------------------------
    // 🚀 FORM SUBMISSION → Sender.net → Formspree
    // ----------------------------------------------------------------
    form?.addEventListener("submit", async function (e) {
      e.preventDefault(); // stop default Formspree submission

      const formData = new FormData(this);
      const jsonData = Object.fromEntries(formData.entries());


      try {
        // --- 1️⃣ Send to Sender.net via Cloudflare Worker ---
        const senderRes = await fetch("https://sender-proxy-worker.my-workerlunyns.workers.dev/",{
          method: "POST",
          headers: { "Content-Type": "application/json"},
          body: JSON.stringify(jsonData),
        });


        if ( !senderRes.ok) throw new Error(await senderRes.text());
        console.log("✅ Sender.net OK");



        // --- 2️⃣ Continue to Formspree submission ---
        // Uses the form's native action/method attributes
        const fsRes = await fetch(this.action, {
          method: this.method,
          headers: { Accept: "application/json"},
          body: formData,
        });

        if (fsRes.ok) {
          alert(" ✅ Your request has been sent successfully!");
          this.reset();
          closeRFQModal();
        } else {
          alert(" ⚠️ Formspree submission failed.");
        }

        // Optional: clear form after Formspree sends
        // this delayed reset is set intentionally for UX purposes.
        setTimeout(() => this.reset(), 1500);

      } catch (error) {
        console.error("❌ Sender.net submission failed:", error);
        alert("There was a problem submitting your request. Please try again.");
      }
    }); // End of FORM SUBMISSION → Sender.net → Formspree
  }); // End of DOMContentLoaded

