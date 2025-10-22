import fetch from "node-fetch";
import * as aws4 from "aws4";

const host = "webservices.amazon.com";
const PA_PATH = "/paapi5/searchitems";

export async function searchAmazon(keyword: string, limit = 10) {
  const body = {
    Keywords: keyword,
    SearchIndex: "All",
    ItemCount: limit,
    Resources: [
      "Images.Primary.Medium",
      "ItemInfo.Title",
      "Offers.Listings.Price",
      "ItemInfo.ProductInfo"
    ],
    PartnerType: "Associates",
    PartnerTag: process.env.AMAZON_ASSOC_TAG
  };

  const accessKey = process.env.AMAZON_ACCESS_KEY!;
  const secretKey = process.env.AMAZON_SECRET_KEY!;

  const opts: any = {
    host,
    path: PA_PATH,
    service: "ProductAdvertisingAPI",
    region: "us-east-1",
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      "Accept": "application/json"
    },
    body: JSON.stringify(body)
  };

  aws4.sign(opts, { accessKeyId: accessKey, secretAccessKey: secretKey });

  const url = `https://${host}${PA_PATH}`;
  const res = await fetch(url, {
    method: "POST",
    headers: opts.headers,
    body: opts.body
  });
  const data = await res.json();
  return mapAmazonResponse(data);
}

function mapAmazonResponse(data:any) {
  const items = (data.SearchResult?.Items || []).map((it:any) => {
    const id = it.ASIN || it.DetailPageURL || Math.random().toString(36).slice(2);
    const salesRank = it?.ItemInfo?.ProductInfo?.SalesRank?.DisplayValue;
    const popularity = salesRank ? (1 / Math.max(1, parseInt(String(salesRank).replace(/\D/g,'')))) : 0;
    const detail = it.DetailPageURL || "";
    const affiliate = detail.includes("tag=") ? detail : (detail + (detail.includes("?") ? "&" : "?") + `tag=${process.env.AMAZON_ASSOC_TAG}`);

    return {
      id: `amazon_${id}`,
      source: "amazon",
      title: it?.ItemInfo?.Title?.DisplayValue || it?.title || "Amazon item",
      image: it?.Images?.Primary?.Medium?.URL,
      price: it?.Offers?.Listings?.[0]?.Price?.Amount || null,
      currency: it?.Offers?.Listings?.[0]?.Price?.Currency || "USD",
      popularityMetric: popularity,
      affiliateLink: affiliate,
      detailUrl: detail,
      raw: it
    };
  });
  return items;
}
