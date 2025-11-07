// ✅ ABOUT/about.js / 📦 LUNYNS FORM HANDLER (2025-ready)
// THIS NEW CODE DOESN'T OPEN THE MODAL

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

      // ✅ Clone the data for Sender.net so it can also receive data (must be independent)
      const senderData = new FormData();
      for (const [key, value] of formData.entries()) {
        senderData.append(key, value);
      }

      try {
        // --- 1️⃣ Send to Sender.net via Cloudflare Worker ---
        const response = await fetch("https://sender-proxy-worker.my-workerlunyns.workers.dev/", {
          method: "POST",
          body: senderData,
        });

        const text = await response.text();
        let result;
        try {
          result = JSON.parse(text);
        } catch {
          result = text;
        }

        if (!response.ok) throw new Error(JSON.stringify(result));
        console.log("✅ Sender.net response:", result);

        // --- 2️⃣ Continue to Formspree submission ---
        // Uses the form's native action/method attributes
        this.submit();

        // Optional: clear form after Formspree sends
        setTimeout(() => this.reset(), 1500);

      } catch (error) {
        console.error("❌ Sender.net submission failed:", error);
        alert("There was a problem submitting your request. Please try again.");
      }
    });
  }); // End of DOMContentLoaded

