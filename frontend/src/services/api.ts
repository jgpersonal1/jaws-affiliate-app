// frontend/src/services/api.ts
import axios from "axios";
const EBAY_CAMPAIGN_ID = "57258868747"; // 🔧 replace with your real campaign ID
const AMAZON_ASSOC_TAG = "jawsmovie1975-20";

// ✅ Amazon fallback items
const amazonFallbackItems = [
  {
    title: "Jaws Amity Island Hallmark Christmas Ornament",
    asin: "B0DPGRLFTP",
    image: "https://m.media-amazon.com/images/I/A1zkxU5V58L._AC_SL1500_.jpg",
    url: "https://www.amazon.com/dp/B0DPGRLFTP",
  },
  {
    title: "Jaws (Novel by Peter Benchley)",
    asin: "0345544145",
    image: "https://m.media-amazon.com/images/I/81XhUEwsrmL._SY466_.jpg",
    url: "https://www.amazon.com/dp/0345544145",
  },
  {
    title: "LEGO Jaws Shark Encounter Set",
    asin: "B0CYM1LLZQ",
    image: "https://m.media-amazon.com/images/I/61nYXlqtKHL._AC_SL1500_.jpg",
    url: "https://www.amazon.com/dp/B0CYM1LLZQ",
  },
  {
    title: "Jaws Amity Island Candy Tin",
    asin: "B098HPPDYK",
    image: "https://m.media-amazon.com/images/I/61rfBwkxm7S._SL1500_.jpg",
    url: "https://www.amazon.com/dp/B098HPPDYK",
  },
  {
    title: "Jaws Movie Poster Vintage Style",
    asin: "B08Z7LB009WEC0SK4WJP",
    image: "https://m.media-amazon.com/images/I/61pniSbf1FL._AC_SY300_SX300_QL70_FMwebp_.jpg",
    url: "https://www.amazon.com/dp/B009WEC0SK",
  },
  {
    title: "Jaws 50th T-Shirt",
    asin: "B0FM3V23T1",
    image: "https://m.media-amazon.com/images/I/B1pppR4gVKL._CLa%7C2140%2C2000%7CA1GJGLKardL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_AC_SX679_.png",
    url: "https://www.amazon.com/dp/B0FM3V23T1",
  },
  {
    title: "Jaws 50th Tumbler",
    asin: "B0F4LZX9ZD",
    image: "https://m.media-amazon.com/images/I/61rZQN2N1tL._AC_SL1500_.jpg",
    url: "https://www.amazon.com/dp/B0F4LZX9ZD",
  },
  {   
    title: "Jaws 4K Ultra HD + Blu-ray + Digital",
    asin: "B08F6RCC76",
    image: "https://m.media-amazon.com/images/I/41SXZw-4MAL._SY300_SX300_QL70_FMwebp_.jpg",
    url: "https://www.amazon.com/dp/B08F6RCC76",
  },
  {
    title: "Jaws Collector’s Edition SteelBook",
    asin: "B0FKWYZKL5",
    image: "https://m.media-amazon.com/images/I/719ljgDGQHL._SY445_.jpg",
    url: "https://www.amazon.com/dp/B0FKWYZKL5",
  },
  {
    title: "Jaws Amity Island T-Shirt",
    asin: "B0BHTVVX7L",
    image: "https://m.media-amazon.com/images/I/51XUr265pGL._AC_SX679_.jpg",
    url: "https://www.amazon.com/dp/B0BHTVVX7L",
  },
].map((item) => ({
  ...item,
  link: `https://www.amazon.com/dp/${item.asin}/?tag=${AMAZON_ASSOC_TAG}`, // 🔧 replace with your Amazon Associate tag
}));

// ✅ eBay fallback items (real eBay listing image URLs)
const ebayFallbackItems = [
  {
    id: "127341180897",
    title: "Jaws 50th Anniversary Plush Shark w/ Barrel Collectible",
    image: "https://i.ebayimg.com/images/g/cVEAAeSw7FRostXA/s-l500.jpg",
    url: "https://www.ebay.com/itm/127341180897",
  },
  {
    id: "336109578611",
    title: "Jaws 50th Anniversary Limited Edition 4K Steelbook NEW",
    image: "https://i.ebayimg.com/images/g/9GQAAeSwdk1oVc7P/s-l500.jpg",
    url: "https://www.ebay.com/itm/336109578611",
  },
  {
    id: "326633363105",
    title: "Jaws 50th Anniversary Cup 32oz Great White Shark",
    image: "https://i.ebayimg.com/images/g/D48AAeSw~kRoSgXf/s-l1600.webp",
    url: "https://www.ebay.com/itm/326633363105",
  },
  {
    id: "389030159954",
    title: "Jaws – 50th Anniversary 4K Ultra HD + Blu-ray",
    image: "https://i.ebayimg.com/images/g/nFoAAeSwidho73R3/s-l1600.webp",
    url: "https://www.ebay.com/itm/389030159954",
  },
  {
    id: "146685533772",
    title: "Jaws 50th Anniversary AMC Limited Edition Popcorn Bucket",
    image: "https://i.ebayimg.com/images/g/O64AAeSwo8RoZVn-/s-l1600.webp",
    url: "https://www.ebay.com/itm/146685533772",
  },
  {
    id: "187279378474",
    title: "Universal Studios Jaws 50th Anniversary Sipper Cup",
    image: "https://i.ebayimg.com/images/g/MDAAAOSwLNloPHZv/s-l1600.webp",
    url: "https://www.ebay.com/itm/187279378474",
  },
  {
    id: "406258842112",
    title: "NECA – Jaws – “The Game of Jaws” 50th Anniversary Edition",
    image: "https://i.ebayimg.com/images/g/uwMAAeSwfo5o3x3N/s-l300.jpg",
    url: "https://www.ebay.com/itm/406258842112",
  },
  {
    id: "136160109675",
    title: "Jaws 50th Anniversary Coin 1975-2025",
    image: "https://i.ebayimg.com/images/g/eOsAAOSwzw9oJUl6/s-l1600.webp",
    url: "https://www.ebay.com/itm/136160109675",
  },      
  {
    id: "167564807124",
    title: "Jaws 50th Anniversary Shark Movie Cup Rare New",
    image: "https://i.ebayimg.com/images/g/pJgAAeSwFy9oQEJk/s-l1600.webp",
    url: "https://www.ebay.com/itm/167564807124",
  },
  {
    id: "267121118086",
    title: "Jaws 50th Anniversary Movie Poster Men’s T-Shirt",
    image: "https://i.ebayimg.com/images/g/~ycAAOSwMvtniuk-/s-l1600.webp",
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
  