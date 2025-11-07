// src/components/ProductList.tsx
import React from "react";

export const ProductList = ({ items }: { items: any[] }) => {
  if (!items?.length) return <div>No items available.</div>;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        gap: "16px",
      }}
    >
      {items.map((item, i) => (
        <a
          key={i}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textDecoration: "none",
            background: "white",
            borderRadius: 12,
            padding: 12,
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            transition: "transform 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.03)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1.0)";
            e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
          }}
        >
          <img
            src={item.image}
            alt={item.title}
            style={{
              width: "100%",
              borderRadius: 8,
              objectFit: "contain",
              maxHeight: 200,
            }}
          />
          <div
            style={{
              marginTop: 8,
              fontWeight: 600,
              fontSize: 14,
              textAlign: "center",
              color: "#111",
            }}
          >
            {item.title}
          </div>
          <button
            style={{
              marginTop: 8,
              backgroundColor: "#2563eb",
              color: "white",
              border: "none",
              padding: "8px 12px",
              borderRadius: 8,
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            Shop Now →
          </button>
        </a>
      ))}
    </div>
  );
};
