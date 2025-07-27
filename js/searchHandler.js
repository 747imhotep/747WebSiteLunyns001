const hardcodedRedirects = {
      // CONTACT US
      "contact": "CONTACT/contact.html",
      // ABOUT US
      "about": "ABOUT/about2_us.html",
      "L.O.I.": "ABOUT/about2_us.html",
      "Letter of Intent": "ABOUT/about2_us.html",
      // PRODUCTS EN590
      "diesel": "PRODUCTS/PROD_DET/EN590/en590ppm20.html",
      "590": "PRODUCTS/PROD_DET/EN590/en590ppm20.html",
      "en590": "PRODUCTS/PROD_DET/EN590/en590ppm20.html",
      "ppm": "PRODUCTS/PROD_DET/EN590/en590ppm20.html",
      "10ppm": "PRODUCTS/PROD_DET/EN590/en590ppm20.html",
      "50ppm": "PRODUCTS/PROD_DET/EN590/en590ppm20.html",
      "500ppm": "PRODUCTS/PROD_DET/EN590/en590ppm20.html",
      "5000ppm": "PRODUCTS/PROD_DET/EN590/en590ppm20.html",
      "5,000ppm": "PRODUCTS/PROD_DET/EN590/en590ppm20.html",
      "Sulfur": "PRODUCTS/PROD_DET/EN590/en590ppm20.html",
      "Low Sulfur": "PRODUCTS/PROD_DET/EN590/en590ppm20.html",
      "Ultra Low Sulfur": "PRODUCTS/PROD_DET/EN590/en590ppm20.html",
      // PRODUCTS JET A1 FUEL
      "jet": "PRODUCTS/PROD_DET/JET_A1_FUEL/jetA1fuel.html",
      "jetA1": "PRODUCTS/PROD_DET/JET_A1_FUEL/jetA1fuel.html",
      "jet A1": "PRODUCTS/PROD_DET/JET_A1_FUEL/jetA1fuel.html",
      "jet fuel": "PRODUCTS/PROD_DET/JET_A1_FUEL/jetA1fuel.html",
      "jetA1 fuel": "PRODUCTS/PROD_DET/JET_A1_FUEL/jetA1fuel.html",
      "jet A1 fuel": "PRODUCTS/PROD_DET/JET_A1_FUEL/jetA1fuel.html",
      "JP54": "PRODUCTS/PROD_DET/JET_A1_FUEL/jetA1fuel.html",
      "JP 54": "PRODUCTS/PROD_DET/JET_A1_FUEL/jetA1fuel.html",
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

const searchablePages = Object.keys(hardcodedRedirects).map(key => ({
  keyword: key,
  path: hardcodedRedirects[key]
}));

const fuse = new Fuse(searchablePages, {
  keys: ['keyword'],
  threshold: 0.3
});

function handleSearch() {
  const input = document.querySelector("input[name='q'], #search");
  if (!input) return;

  const query = input.value
  .toLowerCase()
  .replace(/\s+/g, ' ')
  .replace(/[^a-z0-9 ]/gi, '')
  .trim();

  // ✅ LOG the normalized query
  console.log("Query:", query);


  if (hardcodedRedirects[query]) {
    console.log("Exact match found. Redirecting to:", hardcodedRedirects[query]);
    window.location.href = hardcodedRedirects[query];
    return;
  }

  const results = fuse.search(query);

  // ✅ LOG the search results
  console.log("Fuse Results:", results);


  if (results.length > 0 && results[0].score < 0.3) {
    console.log("Redirecting to best match:", results[0].item.path);
    window.location.href = results[0].item.path;
    return;
  }

  // Fallback to search results page
  console.log("No match found. Redirecting to search-results.html with query.");
  window.location.href = `search-results.html?query=${encodeURIComponent(query)}`;
}
