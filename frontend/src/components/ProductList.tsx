import React from "react";
import "../App.css";

export const ProductList = ({ items }: { items: any[] }) => {
  if (!items?.length) return <div>No items available.</div>;

  return (
    <div className="product-grid">
      {items.map((item, i) => (
        <a
          key={i}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="product-card"
        >
          <img
            src={item.image}
            alt={item.title}
            className="product-image"
          />
          <div className="product-info">
            <div className="product-title">{item.title}</div>
            <button className="shop-button">Shop Now →</button>
          </div>
        </a>
      ))}
    </div>
  );
};
