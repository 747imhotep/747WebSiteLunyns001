// INDEX.TS 

export default {
  async fetch(request: Request): Promise<Response> {
    const origin = request.headers.get("Origin") || "*";

    // 🔁 1. Handle preflight (OPTIONS)
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": origin,
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Max-Age": "86400",
        },
      });
    }

    // 📨 2. Handle POST request
    if (request.method === "POST") {
      try {
        const data = await request.json();
        console.log("📨 Form received:", data);

        return new Response(null, {
          status: 303,
          headers: {
            "Location": "https://lunyns.com/thanks/thanks.html", // Change to your real redirect
            "Access-Control-Allow-Origin": origin,
          },
        });
      } catch (err) {
        console.error("❌ Error parsing request:", err);
        return new Response(JSON.stringify({ success: false, message: "Invalid JSON" }), {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": origin,
          },
        });
      }
    }

    // 🚫 3. Method not allowed
    return new Response("Ooooh Sorry, Method Not Allowed", {
      status: 405,
      headers: {
        "Access-Control-Allow-Origin": origin,
      },
    });
  },
};


