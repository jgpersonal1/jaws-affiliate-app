// frontend/src/services/api.ts
import axios from "axios";

// ✅ Fallback lists (same items used in AmazonLinks.tsx and EbayLinks.tsx)


const amazonFallbackItems = [    
  {
    title: "Jaws Blu-ray (2012 Remaster)",
    asin: "B00UGQW8F2",
    image: "https://m.media-amazon.com/images/I/81kU9fNBYpL._AC_SL1500_.jpg",
  },
  {
    title: "Jaws (Novel by Peter Benchley)",
    asin: "B000FC2EGU",
    image: "https://m.media-amazon.com/images/I/71rO4vJZ8UL._AC_SL1500_.jpg",
  },
  {
    title: "LEGO Jaws Shark Encounter Set",
    asin: "B0D5TK9HZR",
    image: "https://m.media-amazon.com/images/I/81Up5rWmZFL._AC_SL1500_.jpg",
  },
  {
    title: "Jaws Amity Island Candy Tin",
    asin: "B098HPPDYK",
    image: "https://m.media-amazon.com/images/I/81W+9rEfMIL._AC_SL1500_.jpg",
  },
  {
    title: "Jaws Movie Poster Vintage Style",
    asin: "B08Z7L4WJP",
    image: "https://m.media-amazon.com/images/I/71k7R5uTytL._AC_SL1500_.jpg",
  },
  {
    title: "Jaws Amity Island T-Shirt",
    asin: "B0C5RNXW6T",
    image: "https://m.media-amazon.com/images/I/71kJQPNiU9L._AC_UL1500_.jpg",
  },
  {
    title: "Funko Pop! Movies: Jaws - Quint with Shark",
    asin: "B07RJWFXQD",
    image: "https://m.media-amazon.com/images/I/71YffBv5pkL._AC_SL1500_.jpg",
  },
  {
    title: "Jaws 4K Ultra HD + Blu-ray + Digital",
    asin: "B0C52RZ5HB",
    image: "https://m.media-amazon.com/images/I/91upZsIfLGL._AC_SL1500_.jpg",
  },
  {
    title: "Jaws Collector’s Edition SteelBook",
    asin: "B07TTTZVCM",
    image: "https://m.media-amazon.com/images/I/81yknYr2YVL._AC_SL1500_.jpg",
  },
  {
    title: "Jaws 19 Hat (Back to the Future Parody)",
    asin: "B01J3JGV6A",
    image: "https://m.media-amazon.com/images/I/71Jh1B4tFeL._AC_UL1500_.jpg",
  },
];


const ebayFallbackItems = [
  {
    id: "127341180897",
    title: "Jaws 50th Anniversary Plush Shark w/ 50 Barrel Collectible",
    image: "https://i.ebayimg.com/images/g/PlushShark50.jpg", // sample placeholder
  },
  {
    id: "336109578611",
    title: "Jaws 50th Anniversary Limited Edition 4K Steelbook NEW",
    image: "https://i.ebayimg.com/images/g/Steelbook50.jpg",
  },
  {
    id: "326633363105",
    title: "Jaws 50th Anniversary Cup 32oz Great White Shark",
    image: "https://i.ebayimg.com/images/g/Cup50.jpg",
  },
  {
    id: "389030159954",
    title: "Jaws – 50th Anniversary 4K Ultra HD + Blu-ray",
    image: "https://i.ebayimg.com/images/g/4kBluray50.jpg",
  },
  {
    id: "146685533772",
    title: "Jaws 50th Anniversary AMC Limited Edition Popcorn Bucket",
    image: "https://i.ebayimg.com/images/g/Popcorn50.jpg",
  },
  {
    id: "187279378474",
    title: "Universal Studios Orlando Jaws 50th Anniversary Sipper Cup",
    image: "https://i.ebayimg.com/images/g/SipperCup50.jpg",
  },
  {
    id: "406258842112",
    title: "NECA – Jaws – “The Game of Jaws” 50th Anniversary Edition",
    image: "https://i.ebayimg.com/images/g/Game50.jpg",
  },
  {
    id: "136160109675",
    title: "Jaws 50th Anniversary Coin 1975-2025",
    image: "https://i.ebayimg.com/images/g/Coin50.jpg",
  },
  {
    id: "167564807124",
    title: "Jaws 50th Anniversary Shark Movie Cup Rare New",
    image: "https://i.ebayimg.com/images/g/MovieCup50.jpg",
  },
  {
    id: "267121118086",
    title: "Jaws 50th Anniversary Movie Poster Men’s T-Shirt",
    image: "https://i.ebayimg.com/images/g/Tshirt50.jpg",
  },
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
