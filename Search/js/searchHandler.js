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

  const query = input.value.toLowerCase().trim();

  if (hardcodedRedirects[query]) {
    window.location.href = hardcodedRedirects[query];
    return;
  }

  const results = fuse.search(query);
  if (results.length > 0 && results[0].score < 0.3) {
    window.location.href = results[0].item.path;
    return;
  }

  // Fallback to search results page
  window.location.href = `search-results.html?query=${encodeURIComponent(query)}`;
}
