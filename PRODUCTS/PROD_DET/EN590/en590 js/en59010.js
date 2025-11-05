document.getElementById("contactForm").addEventListener("submit", async function(e) {
    e.preventDefault(); // stop immediate Formspree submission

    const formData = new FormData(this);

    try {
        // Send to Sender.net via Worker
        const response = await fetch("https://sender-proxy-worker.my-workerlunyns.workers.dev/", {
            method: "POST",
            body: formData
        });

        let result;
        try {
            result = await response.json();
        } catch {
            result = await response.text(); // fallback
        }

        if (!response.ok) throw new Error(JSON.stringify(result));

        console.log("✅ Sender.net response:", result);

        // After Sender.net succeeds, submit Formspree
        this.submit();

    } catch (error) {
        console.error("❌ Sender.net submission failed:", error);
        alert("There was a problem submitting your request. Please try again.");
    }
});


  //⚠️ 

//    You don’t prevent the default form submission, which is correct for Formspree. ✅
//    However, this means the browser immediately navigates away to Formspree’s redirect after the form submits.
//    That causes the fetch() to get aborted mid-request, exactly like your old NS_BINDING_ABORTED issue.
//    So the Worker never fully completes the Sender.net submission.


// <!---------------------------------------------------------------------------------------->
// Cloudflare dashboard → Workers & Pages → sender-proxy-worker → Routes / Preview URL.

// Name it something like sender-forwarder
// Log in to Sender.net

// Click on the Settings tab at the top.

// Scroll to Variables → Add variable.

// Paste your key in the Value field.

// Save it. e5905ec3  178.51.79.47
// name: John Doe
// email: test@example.com
// subject: Test
// message: Hello world

// body: JSON.stringify({
//   email: email,
//   first_name: name,
//   list_ids: [178.51.79.47],          // <-- Replace 12345 with your actual list ID
//   tags: ["quotation_form"],
//   custom_fields: {
//     subject: subject,
//     message: message
