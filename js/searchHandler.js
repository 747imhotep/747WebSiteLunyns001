const hardcodedRedirects = {
  "home": "index.html",
  "about": "ABOUT/about2_us.html",
  "contact": "CONTACT/contact.html",
  "diesel": "PRODUCTS/PROD_DET/EN590/en590ppm20.html",
  "en590": "PRODUCTS/PROD_DET/EN590/en590ppm20.html",
  "jet": "PRODUCTS/PROD_DET/JET_A1_FUEL/jetA1fuel.html",
  "jet a1": "PRODUCTS/PROD_DET/JET_A1_FUEL/jetA1fuel.html",
  "coconuts": "PRODUCTS/PROD_DET/COCONUTS/coconuts.html",
  "cashew": "PRODUCTS/PROD_DET/CASHEW_NUTS/cashewNuts.html"
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
