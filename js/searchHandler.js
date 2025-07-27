// 🔍 Define your keyword-to-page redirect mapping
const hardcodedRedirects = {
      // CONTACT US
      "contact": "CONTACT/contact.html",
      // ABOUT US
      "about": "ABOUT/about2_us.html",
      "loi": "ABOUT/about2_us.html",
      "letter of Intent": "ABOUT/about2_us.html",
      // PRODUCTS EN590
      "diesel": "PRODUCTS/PROD_DET/EN590/en590ppm20.html",
      "590": "PRODUCTS/PROD_DET/EN590/en590ppm20.html",
      "en590": "PRODUCTS/PROD_DET/EN590/en590ppm20.html",
      "ppm": "PRODUCTS/PROD_DET/EN590/en590ppm20.html",
      "10 ppm": "PRODUCTS/PROD_DET/EN590/en590ppm20.html",
      "50 ppm": "PRODUCTS/PROD_DET/EN590/en590ppm20.html",
      "500 ppm": "PRODUCTS/PROD_DET/EN590/en590ppm20.html",
      "5000 ppm": "PRODUCTS/PROD_DET/EN590/en590ppm20.html",
      "5,000 ppm": "PRODUCTS/PROD_DET/EN590/en590ppm20.html",
      "sulfur": "PRODUCTS/PROD_DET/EN590/en590ppm20.html",
      "low sulfur": "PRODUCTS/PROD_DET/EN590/en590ppm20.html",
      "ultra low sulfur": "PRODUCTS/PROD_DET/EN590/en590ppm20.html",
      // PRODUCTS JET A1 FUEL
      "jet": "PRODUCTS/PROD_DET/JET_A1_FUEL/jetA1fuel.html",
      "jetA1": "PRODUCTS/PROD_DET/JET_A1_FUEL/jetA1fuel.html",
      "jet A1": "PRODUCTS/PROD_DET/JET_A1_FUEL/jetA1fuel.html",
      "jet fuel": "PRODUCTS/PROD_DET/JET_A1_FUEL/jetA1fuel.html",
      "jetA1 fuel": "PRODUCTS/PROD_DET/JET_A1_FUEL/jetA1fuel.html",
      "jet A1 fuel": "PRODUCTS/PROD_DET/JET_A1_FUEL/jetA1fuel.html",
      "jp54": "PRODUCTS/PROD_DET/JET_A1_FUEL/jetA1fuel.html",
      "jp 54": "PRODUCTS/PROD_DET/JET_A1_FUEL/jetA1fuel.html",
      // PRODUCTS COCONUTS
      "coconuts": "PRODUCTS/PROD_DET/COCONUTS/coconuts.html",
      "husks": "PRODUCTS/PROD_DET/COCONUTS/coconuts.html",
      "dry": "PRODUCTS/PROD_DET/COCONUTS/coconuts.html",
      "shell": "PRODUCTS/PROD_DET/COCONUTS/coconuts.html",
      // PRODUCTS CASHEW NUTS
      "cashew": "PRODUCTS/PROD_DET/CASHEW_NUTS/cashewNuts.html",
      "180": "PRODUCTS/PROD_DET/CASHEW_NUTS/cashewNuts.html",
      "w180": "PRODUCTS/PROD_DET/CASHEW_NUTS/cashewNuts.html",
      "320": "PRODUCTS/PROD_DET/CASHEW_NUTS/cashewNuts.html",
      "w320": "PRODUCTS/PROD_DET/CASHEW_NUTS/cashewNuts.html",
      "raw": "PRODUCTS/PROD_DET/CASHEW_NUTS/cashewNuts.html"
};

// 🔍 Create a searchable array for Fuse.js fuzzy matching
const searchablePages = Object.keys(hardcodedRedirects).map(key => ({
  keyword: key,
  path: hardcodedRedirects[key]
}));

// 🔍 Setup Fuse.js search instance
const fuse = new Fuse(searchablePages, {
  keys: ['keyword'],
  threshold: 0.3
});

// 🔍 Search button handler
function handleSearch() {
  const input = document.getElementById("searchInput"); // Poroblem with this line, it should be "search" not "searchInput"

// 🔍 Normalize the input for searching  
  const query = input.value
  .toLowerCase()
  .replace(/\s+/g, ' ')
  .replace(/[^a-z0-9 ]/gi, '')
  .trim();

// ✅ LOG the normalized query
  console.log("Query:", query); // 🔍 Logging normalized input


// 🔍 Check for exact match
  if (hardcodedRedirects[query]) {
    console.log("Exact match found. Redirecting to:", hardcodedRedirects[query]);
    window.location.href = hardcodedRedirects[query];
    return;
  }

// 🔍 Try fuzzy match
  const results = fuse.search(query);

  // ✅ LOG the search results
  console.log("Fuse Results:", results);


  if (results.length > 0 && results[0].score < 0.3) {
    console.log("Redirecting to best match:", results[0].item.path);
    window.location.href = results[0].item.path;
    return;
  }

// 🔍 Fallback to search-results page with query in URL
  console.log("No match found. Redirecting to search-results.html with query.");
  window.location.href = `search-results.html?query=${encodeURIComponent(query)}`;
}

// 🔁 Auto-run if query is in the URL (e.g., search-results.html?query=jet%20fuel)
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const queryFromURL = params.get("query");

// 🔍 Normalize for matching
  if (queryFromURL) {
    const normalized = queryFromURL
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .replace(/[^a-z0-9 ]/gi, '')
      .trim();

// 👁️ Set the user's original input back into the input box (preserves casing/punctuation)
    const input = document.getElementById("searchInput");
    if (input) {
      input.value = queryFromURL; // 👍 This keeps the original text the user typed
    }

// 🔍 Try exact match from URL
    // ✅ First check exact match
    if (hardcodedRedirects[normalized]) {
      console.log("Exact match (from URL query). Redirecting to:", hardcodedRedirects[normalized]);
      window.location.href = hardcodedRedirects[normalized];
      return;
    }

// 🔍 Fuzzy match from URL
    // ✅ Fuzzy search using Fuse.js
    const results = fuse.search(normalized);
    if (results.length > 0 && results[0].score < 0.3) {
      console.log("Best fuzzy match (from URL query). Redirecting to:", results[0].item.path);
      window.location.href = results[0].item.path;
    } else {
      // No redirect, let the user try again
      console.log("No match found. Waiting for user input.");
// 👁️ Display error message to user
      const output = document.getElementById("search-output");
      if (output) {
        output.innerText = `No match found for "${queryFromURL}". Please try another keyword.`;
      }
    }
  }
});

// | Icon | Meaning                                                                    |
// | ---- | -------------------------------------------------------------------------- |
// | 🔍   | Used for **matching/searching**, requires cleaned/normalized values        |
// | 👁️   | Used for **user display**, should preserve original casing and punctuation |

