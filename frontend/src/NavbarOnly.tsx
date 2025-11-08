// src/NavbarOnly.tsx
import React, { useState } from "react";

export const NavbarOnly = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Amazon", href: "#amazon" },
    { label: "eBay", href: "#ebay" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav
      style={{
        width: "100%",
        backgroundColor: "#2563eb",
        color: "white",
        borderRadius: 8,
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        padding: "8px 16px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ fontWeight: 700, fontSize: "1.2rem" }}>JAWSmovie.com</div>

        {/* Hamburger button (mobile only) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: "none",
            border: "none",
            color: "white",
            fontSize: "1.5rem",
            cursor: "pointer",
            display: "none",
          }}
          className="hamburger-button"
        >
          ☰
        </button>

        {/* Desktop Nav */}
        <div className="desktop-nav" style={{ display: "flex", gap: "16px" }}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                color: "white",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className="mobile-menu"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            marginTop: "8px",
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                color: "white",
                textDecoration: "none",
                backgroundColor: "#1e40af",
                padding: "8px",
                borderRadius: 6,
              }}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};
