import { CosmosClient } from "@azure/cosmos";

const endpoint = process.env.COSMOS_ENDPOINT!;
const key = process.env.COSMOS_KEY!;
const client = new CosmosClient({ endpoint, key });

const dbId = process.env.COSMOS_DB || "jawsdb";
const containerId = process.env.COSMOS_CONTAINER || "products";

export async function getContainer() {
  const { database } = await client.databases.createIfNotExists({ id: dbId });
  const { container } = await database.containers.createIfNotExists({ id: containerId });
  return container;
}
