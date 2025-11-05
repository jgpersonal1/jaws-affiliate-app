// frontend/src/services/api.ts
import axios from "axios";

// ✅ Fallback lists (same items used in AmazonLinks.tsx and EbayLinks.tsx)

const amazonFallbackItems = [
  {
    asin: "B098HPPDYK",
    title: "Jaws Amity Island Sours Candy Tin",
    image: "https://m.media-amazon.com/images/I/81A7r9cKVEL._AC_SL1500_.jpg",
    url: "https://www.amazon.com/dp/B098HPPDYK/?tag=jawsmovie1975-20",
  },
  {
    asin: "B0D5CN8X7R",
    title: "Jaws 50th Anniversary 4K Ultra HD + Blu-ray + Digital",
    image: "https://m.media-amazon.com/images/I/71S3qf6Z45L._AC_SL1500_.jpg",
    url: "https://www.amazon.com/dp/B0D5CN8X7R/?tag=jawsmovie1975-20",
  },
  // ... (add the rest of your 10 Amazon items here)
];

const ebayFallbackItems = [
  {
    id: "127341180897",
    title: "Jaws 50th Anniversary Plush Shark w/ 50 Barrel Collectible",
    image: "https://i.ebayimg.com/images/g/PlushShark50.jpg",
    url: "https://www.ebay.com/itm/127341180897?campid=5339130190",
  },
  {
    id: "336109578611",
    title: "Jaws 50th Anniversary Limited Edition 4K Steelbook NEW",
    image: "https://i.ebayimg.com/images/g/Steelbook50.jpg",
    url: "https://www.ebay.com/itm/336109578611?campid=5339130190",
  },
  // ... (add the rest of your 10 eBay items here)
];

export async function fetchProducts(source: "amazon" | "ebay", query: string, limit: number) {
  try {
    // 👇 adjust URL if you have a backend API endpoint
    const response = await axios.get(`/api/search?source=${source}&q=${query}&limit=${limit}`);
    const data = response.data || [];

    if (Array.isArray(data) && data.length > 0) {
      return data.slice(0, limit);
    }

    // if empty, return fallback
    return source === "amazon"
      ? amazonFallbackItems.slice(0, limit)
      : ebayFallbackItems.slice(0, limit);
  } catch (error) {
    console.error(`Error fetching ${source} products:`, error);

    // On any failure, use fallback
    return source === "amazon"
      ? amazonFallbackItems.slice(0, limit)
      : ebayFallbackItems.slice(0, limit);
  }
}
