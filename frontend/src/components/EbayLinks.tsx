// frontend/src/components/EbayLinks.tsx
import React, { useEffect, useState } from "react";
import { fetchProducts } from "../services/api";

interface Product {
  id?: string;
  title: string;
  image: string;
  url: string;
}

export default function EbayLinks() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts("ebay", "jaws 50th anniversary", 8).then(setProducts);
  }, []);

  return (
    <section className="font-inter text-center p-4 bg-gray-50">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">eBay Finds</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((item) => (
          <a
            key={item.id || item.title}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white rounded-2xl shadow hover:shadow-xl transition-transform hover:-translate-y-1 overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-contain p-2"
              loading="lazy"
            />
            <div className="p-2">
              <p className="text-sm font-medium text-gray-700">{item.title}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
