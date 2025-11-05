import React, { useEffect, useState } from "react";

interface Product {
  title: string;
  asin: string;
  image?: string;
}

const AMAZON_TAG = "jawsmovie1975-20";

// Default fallback products (use real ASINs where possible)
const defaultProducts: Product[] = [    
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

export const AmazonLinks: React.FC<{ maxItems?: number }> = ({ maxItems = 10 }) => {
  const [products, setProducts] = useState<Product[]>(defaultProducts);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Example placeholder for Amazon API call
        // const res = await fetch("/api/amazon-products");
        // const data = await res.json();
        // if (data && data.length) setProducts(data);
        // else setProducts(defaultProducts);
        setProducts(defaultProducts); // fallback
      } catch {
        setProducts(defaultProducts);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-6">
      {products.slice(0, maxItems).map((p) => (
        <a
          key={p.asin}
          href={`https://www.amazon.com/dp/${p.asin}?tag=${AMAZON_TAG}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block border rounded-xl shadow-md hover:shadow-lg hover:bg-gray-50 transition"
        >
          {p.image && (
            <img
              src={p.image}
              alt={p.title}
              className="w-full h-64 object-cover rounded-t-xl"
            />
          )}
          <div className="p-4 text-center font-medium text-gray-800">
            {p.title}
          </div>
        </a>
      ))}
    </div>
  );
};

export default AmazonLinks;
