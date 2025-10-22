import fetch from "node-fetch";

const EBAY_CLIENT_ID = process.env.EBAY_CLIENT_ID!;
const EBAY_CLIENT_SECRET = process.env.EBAY_CLIENT_SECRET!;
const EBAY_CAMPAIGN_ID = process.env.EBAY_CAMPAIGN_ID!;

async function getEbayAccessToken() {
  const tokenUrl = "https://api.ebay.com/identity/v1/oauth2/token";
  const params = new URLSearchParams();
  params.append("grant_type","client_credentials");
  params.append("scope","https://api.ebay.com/oauth/api_scope");
  const basic = Buffer.from(`${EBAY_CLIENT_ID}:${EBAY_CLIENT_SECRET}`).toString('base64');

  const res = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type":"application/x-www-form-urlencoded",
      "Authorization": `Basic ${basic}`
    },
    body: params
  });
  const data = await res.json();
  return data.access_token;
}

export async function searchEbay(keyword: string, limit = 10) {
  const token = await getEbayAccessToken();
  const url = `https://api.ebay.com/buy/browse/v1/item_summary/search?q=${encodeURIComponent(keyword)}&limit=${limit}`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` }});
  const data = await res.json();
  return mapEbayResponse(data);
}

function mapEbayResponse(data:any) {
  const items = (data.itemSummaries || []).map((it:any) => {
    const id = it.itemId || Math.random().toString(36).slice(2);
    const price = it.price?.value ? parseFloat(it.price.value) : null;
    const affiliate = it.itemWebUrl ? (it.itemWebUrl + (it.itemWebUrl.includes("?") ? "&" : "?") + `campid=${EBAY_CAMPAIGN_ID}`) : it.itemWebUrl;

    return {
      id: `ebay_${id}`,
      source: "ebay",
      title: it.title,
      image: it.thumbnail?.imageUrl,
      price,
      currency: it.price?.currency || "USD",
      popularityMetric: price || 0,
      affiliateLink: affiliate,
      detailUrl: it.itemWebUrl,
      raw: it
    };
  });
  return items;
}
