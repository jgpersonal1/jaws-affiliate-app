import React, { useEffect, useState } from "react";
import { fetchProducts } from "./services/api";
import { ProductList } from "./components/ProductList";
import AmazonLinks from "./components/AmazonLinks";
import EbayLinks from "./components/EbayLinks";

function App() {
  const [amazonLimit, setAmazonLimit] = useState<number>(() => parseInt(localStorage.getItem("amazonLimit") || "8", 10));
  const [ebayLimit, setEbayLimit] = useState<number>(() => parseInt(localStorage.getItem("ebayLimit") || "8", 10));
  const [amazonItems, setAmazonItems] = useState<any[]>([]);
  const [ebayItems, setEbayItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    load();
    // eslint-disable-next-line
  }, [amazonLimit, ebayLimit]);

  async function load() {
    setLoading(true);
    try {
      const [a, e] = await Promise.all([
        fetchProducts("amazon","jaws",amazonLimit),
        fetchProducts("ebay","jaws",ebayLimit)
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
    <div style={{maxWidth:1100, margin:"20px auto", padding:12}}>
      <h1>JAWS Merchandise (Affiliate)</h1>

      <section style={{marginBottom:20}}>
        <h2>Settings</h2>
        <label>
          Amazon listings:
          <input type="number" min={1} max={50} value={amazonLimit} onChange={e=>setAmazonLimit(parseInt(e.target.value||"1",10))} />
        </label>
        <label style={{marginLeft:12}}>
          eBay listings:
          <input type="number" min={1} max={50} value={ebayLimit} onChange={e=>setEbayLimit(parseInt(e.target.value||"1",10))} />
        </label>
        <button onClick={saveSettings} style={{marginLeft:12}}>Save</button>
      </section>

     <section>
        <h2>Amazon — Most Popular</h2>
        {loading ? (
          <div>Loading…</div>
        ) : amazonItems.length > 0 ? (
          <ProductList items={amazonItems} />
        ) : (
          <AmazonLinks />
        )}
      </section>
      
      <section style={{ marginTop: 30 }}>
        <h2>eBay — Most Popular</h2>
        {loading ? (
          <div>Loading…</div>
        ) : ebayItems.length > 0 ? (
          <ProductList items={ebayItems} />
        ) : (
          <EbayLinks />
        )}
      </section>


      <footer style={{marginTop:20, fontSize:12, color:"#666"}}>
        We may earn a commission from links on this page.
      </footer>
    </div>
  );
}

export default App;
