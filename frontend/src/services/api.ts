export async function fetchProducts(source: "amazon"|"ebay", query="jaws", limit=10) {
  const res = await fetch(`/api/search?source=${source}&query=${encodeURIComponent(query)}&limit=${limit}`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}
