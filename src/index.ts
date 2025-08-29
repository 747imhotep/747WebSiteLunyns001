// INDEX.TS - Cloudflare Worker

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

    // 🔐 Sender.net API credentials
    declare const SENDER_LIST_ID: string;
    const senderApiKey = "SENDER_API_KEY"; // Replace with secret later
    const senderListId = "ZzmLgD5"; // Replace with actual list ID

    // 📤 Send subscriber to Sender.net
    const senderResponse = await fetch("https://api.sender.net/v2/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${senderApiKey}`
      },
      body: JSON.stringify({
        email: data.email,
        name: data.name,
        list_ids: [senderListId]
      }),
    });

    if (!senderResponse.ok) {
      const senderError = await senderResponse.text();
      console.error("❌ Sender.net Error:", senderError);
      return new Response(JSON.stringify({ success: false, message: "Failed to add subscriber" }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": origin,
        },
      });
    }

    // ✅ All good — let frontend redirect
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
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


