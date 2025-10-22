import { AzureFunction, Context } from "@azure/functions";
import { getContainer } from "../../utils/db";
import { searchAmazon } from "../../utils/amazon";
import { searchEbay } from "../../utils/ebay";

const timerTrigger: AzureFunction = async function (context: Context, myTimer: any): Promise<void> {
  context.log('Timer trigger - refreshing JAWS products cache');
  const container = await getContainer();
  const queries = ["jaws", "jaws shirt", "jaws blu-ray", "jaws poster"];

  for (const q of queries) {
    try {
      const amazonItems = await searchAmazon(q, 50);
      const ebayItems = await searchEbay(q, 50);
      for (const it of [...amazonItems, ...ebayItems]) {
        await container.items.upsert({ ...it, query: q, lastUpdated: new Date().toISOString() });
      }
    } catch (err) {
      context.log.error("Error refreshing for query", q, err);
    }
  }
  context.log('Refresh complete.');
};

export default timerTrigger;
