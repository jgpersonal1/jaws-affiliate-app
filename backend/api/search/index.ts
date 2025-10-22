import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { getContainer } from "../../utils/db";
import { searchAmazon } from "../../utils/amazon";
import { searchEbay } from "../../utils/ebay";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const source = (req.query.source || req.body?.source || "amazon").toLowerCase();
  const query = req.query.query || req.body?.query || "jaws";
  const limit = parseInt(req.query.limit || (req.body && req.body.limit) || "10", 10);

  const container = await getContainer();
  const querySpec = {
    query: "SELECT * FROM c WHERE c.source=@source AND c.query=@query ORDER BY c.popularityMetric DESC",
    parameters: [
      { name: "@source", value: source },
      { name: "@query", value: query }
    ]
  };
  const { resources } = await container.items.query(querySpec).fetchAll();
  if (resources.length > 0) {
    context.res = { status: 200, body: resources.slice(0, limit) };
    return;
  }

  let items = [];
  if (source === "amazon") items = await searchAmazon(query, limit);
  else items = await searchEbay(query, limit);

  for (const it of items) {
    await container.items.upsert({ ...it, query, lastUpdated: new Date().toISOString() });
  }

  context.res = { status: 200, body: items };
};

export default httpTrigger;
