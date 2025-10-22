import React from "react";

type Product = {
  id: string;
  title: string;
  image?: string;
  price?: number;
  currency?: string;
  affiliateLink?: string;
};

export const ProductList: React.FC<{ items: Product[] }> = ({ items }) => {
  return (
    <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12}}>
      {items.map(it => (
        <div key={it.id} style={{ border: "1px solid #e6e6e6", borderRadius: 8, padding: 8 }}>
          <a href={it.affiliateLink || "#"} target="_blank" rel="noopener noreferrer" style={{textDecoration: "none", color: "inherit"}}>
            <div style={{height:160, display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden"}}>
              {it.image ? <img src={it.image} alt={it.title} style={{width:"100%", height:"100%", objectFit:"cover"}}/> : <div style={{color:"#999"}}>No image</div>}
            </div>
            <h3 style={{fontSize:14, margin:"8px 0"}}>{it.title}</h3>
            <div style={{fontWeight:700}}>{it.price ? `${it.currency || "USD"} ${it.price}` : "See details"}</div>
          </a>
        </div>
      ))}
    </div>
  );
};
