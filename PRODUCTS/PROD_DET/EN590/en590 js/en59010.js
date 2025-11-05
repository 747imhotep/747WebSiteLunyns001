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
        const text = await response.text(); // read body once

        try {
            result = JSON.parse(text); // try parse as JSON
        } catch {
            result = text; // fallback to raw text
        }

        if (!response.ok) throw new Error(JSON.stringify(result));

        console.log("✅ Sender.net response:", result);

        // clear form after successful submission
        this.reset();

        // After Sender.net succeeds, submit Formspree
        this.submit();

    } catch (error) {
        console.error("❌ Sender.net submission failed:", error);
        alert("There was a problem submitting your request. Please try again.");
    }
});



//⚠️ 

//    
//    
//    
//    


// <!---------------------------------------------------------------------------------------->
