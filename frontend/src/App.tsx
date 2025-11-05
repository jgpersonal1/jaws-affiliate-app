import React, { useEffect, useState } from "react";
import { fetchProducts } from "./services/api";
import { ProductList } from "./components/ProductList";
import "./index.css"; // Ensure global styles are applied
import { NavbarOnly } from "./NavbarOnly";

function App() {
  const [amazonLimit, setAmazonLimit] = useState<number>(() => parseInt(localStorage.getItem("amazonLimit") || "8", 10));
  const [ebayLimit, setEbayLimit] = useState<number>(() => parseInt(localStorage.getItem("ebayLimit") || "8", 10));
  const [amazonItems, setAmazonItems] = useState<any[]>([]);
  const [ebayItems, setEbayItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    load();
  }, [amazonLimit, ebayLimit]);

  async function load() {
    setLoading(true); 
    try {
      const [a, e] = await Promise.all([
        fetchProducts("amazon", "jaws", amazonLimit),
        fetchProducts("ebay", "jaws", ebayLimit)
      ]);
      setAmazonItems(a);
      setEbayItems(e);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function saveSettings() {
    localStorage.setItem("amazonLimit", String(amazonLimit));
    localStorage.setItem("ebayLimit", String(ebayLimit));
    load();
  }

  return (
    <div style={{
      maxWidth: 1100,
      margin: "0 auto",
      padding: "16px",
    }}>
      <header style={{ textAlign: "center", marginBottom: "24px" }}>
        <img src="/images/jmovie_2012c.jpg" width="950" height="180" style={{ marginBottom: "24px" }}></img>
        <h1 style={{ fontSize: "1.8rem" }}>🦈 JAWSmovie.com Recommends</h1>
        <p style={{ color: "#555" }}>JAWS 50th Products on Amazon and eBay</p>
        <NavbarOnly />
      </header>

      <section style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        marginBottom: 24,
      }}>
        <h2 style={{ fontSize: "1.25rem" }}>Settings</h2>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
          alignItems: "center"
        }}>
          <label>
            Amazon listings:
            <input
              type="number"
              min={1}
              max={50}
              value={amazonLimit}
              onChange={e => setAmazonLimit(parseInt(e.target.value || "1", 10))}
              style={{ marginLeft: 6, padding: "4px", width: 70 }}
            />
          </label>
          <label>
            eBay listings:
            <input
              type="number"
              min={1}
              max={50}
              value={ebayLimit}
              onChange={e => setEbayLimit(parseInt(e.target.value || "1", 10))}
              style={{ marginLeft: 6, padding: "4px", width: 70 }}
            />
          </label>
          <button onClick={saveSettings}>Save</button>
        </div>
      </section>

      <section>
        <h2 style={{ fontSize: "1.25rem" }}>Amazon</h2>
        {loading ? <div>Loading…</div> : <ProductList items={amazonItems} />}
      </section>

      <section style={{ marginTop: 30 }}>
        <h2 style={{ fontSize: "1.25rem" }}>eBay</h2>
        {loading ? <div>Loading…</div> : <ProductList items={ebayItems} />}
      </section>

      <footer style={{
        marginTop: 30,
        fontSize: 12,
        textAlign: "center",
        color: "#666"
      }}>
        <br /><br />
        <a href="https://ebay.com/inf/jawsmovie-1975/collections/57258868747?mkcid=1&mkrid=711-53200-19255-0&siteid=0&campid=5339130190&toolid=80010&mkevt=1"
        target="_blank" rel="noopener noreferrer">
        View all eBay listings
        </a>
        <br /><br />
        We may earn a commission from links on this page.
      </footer>
    </div>
  );
}

export default App;
