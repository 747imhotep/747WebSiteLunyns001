  // ✅ ABOUT/about.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const modal = document.getElementById("RFQ-modal");
  const clearBtn = document.getElementById("clearFormBtn");

  // ----------------------------------------------------------------
  // 🧹 CLEAR FORM
  // ----------------------------------------------------------------
  clearBtn?.addEventListener("click", () => {
    form?.reset();
  });

  // ----------------------------------------------------------------
  // 💡 OPEN & CLOSE RFQ MODAL
  // ----------------------------------------------------------------
  function openRFQModal() {
    if (modal) modal.style.display = "block";
  }

  function closeRFQModal() {
    if (modal) modal.style.display = "none";
  }

  // Open modal when hash matches
  const hash = window.location.hash;
  if (hash === "#RFQ" || hash.startsWith("#RFQ-")) {
    openRFQModal();
  }

  // Handle modal trigger links
  document.querySelectorAll('a[href="#RFQ"], a[href^="#RFQ-"]').forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      openRFQModal();
      history.replaceState(null, "", link.getAttribute("href"));
    });
  });

  // Close modal actions
  modal?.querySelector(".close")?.addEventListener("click", closeRFQModal);

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeRFQModal();
  });

  window.addEventListener("click", e => {
    if (e.target === modal) closeRFQModal();
  });

  // ----------------------------------------------------------------
  // 🚀 FORM SUBMISSION → Sender.net → Formspree
  // ----------------------------------------------------------------
  form?.addEventListener("submit", async function (e) {
    e.preventDefault(); // stop immediate Formspree submission

    const formData = new FormData(this);
    //⚠️ const senderData = new FormData(this); // clone for Sender.net

    try {
      // Send to Sender.net via Cloudflare Worker
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

      // Submit to Formspree (keep fields intact)
      this.submit();

      // Optional: clear form after Formspree
      setTimeout(() => this.reset(), 1500);

    } catch (error) {
      console.error("❌ Sender.net submission failed:", error);
      alert("There was a problem submitting your request. Please try again.");
    }
  });
});
