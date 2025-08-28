// INDEX.TS 

export default {
  async fetch(request: Request): Promise<Response> {
    if (request.method === "POST") {
      try {
        const data = await request.json();
        console.log("📨 Form received:", data);

        // Example: Return success response
        return Response.redirect("https://lunyns.com/thanks/thanks.html", 303);

      } catch (err) {
        console.error("❌ Error parsing request:", err);
        return new Response(JSON.stringify({ success: false, message: "Invalid JSON" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    return new Response("Ooooh Sorry, Method Not Allowed", {
      status: 405,
    });
  },
};

