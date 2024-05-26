import { openDB } from "./client";

export default async function get(store: string, key: string): Promise<any> {
  const idbClient = await openDB();
  const request = idbClient.transaction(store).objectStore(store).get(key);

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
