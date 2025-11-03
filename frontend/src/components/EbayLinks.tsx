// frontend/src/components/EbayLinks.tsx
import React from "react";

interface EbayItem {
  id: string;
  title: string;
  image: string;
}

const ebayPartnerId = "5339130190"; // your eBay Partner Network campaign ID

const ebayFallbackItems: EbayItem[] = [
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

const EbayLinks: React.FC = () => {
  return (
    <section className="p-6 bg-white rounded-2xl shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        🦈 JAWS 50th Anniversary eBay Finds
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {ebayFallbackItems.map((item) => (
          <a
            key={item.id}
            href={`https://www.ebay.com/itm/${item.id}?campid=${ebayPartnerId}&customid=jawsaffiliate`}
            target="_blank"
            rel="noopener noreferrer"
            className="border rounded-xl hover:shadow-lg transition transform hover:-translate-y-1"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover rounded-t-xl"
            />
            <div className="p-2 text-sm font-medium text-gray-700 text-center">
              {item.title}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default EbayLinks;
