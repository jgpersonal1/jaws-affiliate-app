// frontend/src/services/api.ts
import axios from "axios";
const EBAY_CAMPAIGN_ID = "57258868747"; // 🔧 replace with your real campaign ID
const AMAZON_ASSOC_TAG = "jawsmovie1975-20";

// ✅ Amazon fallback items
const amazonFallbackItems = [
  {
    title: "Jaws Blu-ray (2012 Remaster)",
    asin: "B00UGQW8F2",
    image: "https://m.media-amazon.com/images/I/81kU9fNBYpL._AC_SL1500_.jpg",
    url: "https://www.amazon.com/dp/B00UGQW8F2",
  },
  {
    title: "Jaws (Novel by Peter Benchley)",
    asin: "B000FC2EGU",
    image: "https://m.media-amazon.com/images/I/71rO4vJZ8UL._AC_SL1500_.jpg",
    url: "https://www.amazon.com/dp/B000FC2EGU",
  },
  {
    title: "LEGO Jaws Shark Encounter Set",
    asin: "B0D5TK9HZR",
    image: "https://m.media-amazon.com/images/I/81Up5rWmZFL._AC_SL1500_.jpg",
    url: "https://www.amazon.com/dp/B0D5TK9HZR",
  },
  {
    title: "Jaws Amity Island Candy Tin",
    asin: "B098HPPDYK",
    image: "https://m.media-amazon.com/images/I/81W+9rEfMIL._AC_SL1500_.jpg",
    url: "https://www.amazon.com/dp/B098HPPDYK",
  },
  {
    title: "Jaws Movie Poster Vintage Style",
    asin: "B08Z7L4WJP",
    image: "https://m.media-amazon.com/images/I/71k7R5uTytL._AC_SL1500_.jpg",
    url: "https://www.amazon.com/dp/B08Z7L4WJP",
  },
  {
    title: "Jaws Amity Island T-Shirt",
    asin: "B0C5RNXW6T",
    image: "https://m.media-amazon.com/images/I/71kJQPNiU9L._AC_UL1500_.jpg",
    url: "https://www.amazon.com/dp/B0C5RNXW6T",
  },
  {
    title: "Funko Pop! Movies: Jaws - Quint with Shark",
    asin: "B07RJWFXQD",
    image: "https://m.media-amazon.com/images/I/71YffBv5pkL._AC_SL1500_.jpg",
    url: "https://www.amazon.com/dp/B07RJWFXQD",
  },
  {
    title: "Jaws 4K Ultra HD + Blu-ray + Digital",
    asin: "B0C52RZ5HB",
    image: "https://m.media-amazon.com/images/I/91upZsIfLGL._AC_SL1500_.jpg",
    url: "https://www.amazon.com/dp/B0C52RZ5HB",
  },
  {
    title: "Jaws Collector’s Edition SteelBook",
    asin: "B07TTTZVCM",
    image: "https://m.media-amazon.com/images/I/81yknYr2YVL._AC_SL1500_.jpg",
    url: "https://www.amazon.com/dp/B07TTTZVCM",
  },
  {
    title: "Jaws 19 Hat (Back to the Future Parody)",
    asin: "B01J3JGV6A",
    image: "https://m.media-amazon.com/images/I/71Jh1B4tFeL._AC_UL1500_.jpg",
    url: "https://www.amazon.com/dp/B01J3JGV6A",
  },
].map((item) => ({
  ...item,
  link: `https://www.amazon.com/dp/${item.asin}/?tag=YOUR_AMAZON_ASSOC_TAG`, // 🔧 replace with your Amazon Associate tag
}));

// ✅ eBay fallback items (real eBay listing image URLs)
const ebayFallbackItems = [
  {
    id: "127341180897",
    title: "Jaws 50th Anniversary Plush Shark w/ Barrel Collectible",
    image: "https://i.ebayimg.com/images/g/EUAAAOSwFzlm~jqE/s-l1600.jpg",
    url: "https://www.ebay.com/itm/127341180897",
  },
  {
    id: "336109578611",
    title: "Jaws 50th Anniversary Limited Edition 4K Steelbook NEW",
    image: "https://i.ebayimg.com/images/g/qZAAAOSwZ0tm4ZLR/s-l1600.jpg",
    url: "https://www.ebay.com/itm/336109578611",
  },
  {
    id: "326633363105",
    title: "Jaws 50th Anniversary Cup 32oz Great White Shark",
    image: "https://i.ebayimg.com/images/g/TXkAAOSw5GtmvK3Z/s-l1600.jpg",
    url: "https://www.ebay.com/itm/326633363105",
  },
  {
    id: "389030159954",
    title: "Jaws – 50th Anniversary 4K Ultra HD + Blu-ray",
    image: "https://i.ebayimg.com/images/g/kqgAAOSwNnxmvWYZ/s-l1600.jpg",
    url: "https://www.ebay.com/itm/389030159954",
  },
  {
    id: "146685533772",
    title: "Jaws 50th Anniversary AMC Limited Edition Popcorn Bucket",
    image: "https://i.ebayimg.com/images/g/65EAAOSwU0VmvYAx/s-l1600.jpg",
    url: "https://www.ebay.com/itm/146685533772",
  },
  {
    id: "187279378474",
    title: "Universal Studios Jaws 50th Anniversary Sipper Cup",
    image: "https://i.ebayimg.com/images/g/rvEAAOSwG8tmvYCT/s-l1600.jpg",
    url: "https://www.ebay.com/itm/187279378474",
  },
  {
    id: "406258842112",
    title: "NECA – Jaws – “The Game of Jaws” 50th Anniversary Edition",
    image: "https://i.ebayimg.com/images/g/bAwAAOSw1k9mvYEx/s-l1600.jpg",
    url: "https://www.ebay.com/itm/406258842112",
  },
  {
    id: "136160109675",
    title: "Jaws 50th Anniversary Coin 1975-2025",
    image: "https://i.ebayimg.com/images/g/bdcAAOSwXNRmvYEb/s-l1600.jpg",
    url: "https://www.ebay.com/itm/136160109675",
  },
  {
    id: "167564807124",
    title: "Jaws 50th Anniversary Shark Movie Cup Rare New",
    image: "https://i.ebayimg.com/images/g/fzIAAOSw~DpmvYEM/s-l1600.jpg",
    url: "https://www.ebay.com/itm/167564807124",
  },
  {
    id: "267121118086",
    title: "Jaws 50th Anniversary Movie Poster Men’s T-Shirt",
    image: "https://i.ebayimg.com/images/g/XQIAAOSwrztmvYDh/s-l1600.jpg",
    url: "https://www.ebay.com/itm/267121118086",
  },
].map((item) => ({
  ...item,
  link: `https://www.ebay.com/itm/${item.id}?campid=${EBAY_CAMPAIGN_ID}`,
}));

// ✅ Fetch from backend, or fallback to static items
export async function fetchProducts(source: "amazon" | "ebay", query: string, limit: number) {
  try {
    const response = await axios.get(`/api/search?source=${source}&q=${query}&limit=${limit}`);
    const data = response.data || [];

    if (Array.isArray(data) && data.length > 0) {
      return data.slice(0, limit);
    }

    // Fallback if no data
    return source === "amazon"
      ? amazonFallbackItems.slice(0, limit)
      : ebayFallbackItems.slice(0, limit);
  } catch (error) {
    console.error(`Error fetching ${source} products:`, error);
    return source === "amazon"
      ? amazonFallbackItems.slice(0, limit)
      : ebayFallbackItems.slice(0, limit);
  }
}
  